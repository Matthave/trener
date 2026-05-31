export const SUPPLEMENTS_ACCESS_COOKIE_NAME = "supplements_access";
export const SUPPLEMENTS_ACCESS_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SUPPLEMENTS_ACCESS_COOKIE_PATH = "/supplements";

const COOKIE_VERSION = "supplements-access:v2";
const TOKEN_FINGERPRINT_PREFIX = "supplements-access-token:";

function getAccessTokens() {
  return (process.env.SUPPLEMENTS_ACCESS_TOKENS ?? "")
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
}

function getCookieSecret() {
  return process.env.SUPPLEMENTS_ACCESS_COOKIE_SECRET?.trim() ?? "";
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

async function createSignature(payload: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createTokenFingerprint(token: string, secret: string) {
  return createSignature(`${TOKEN_FINGERPRINT_PREFIX}${token}`, secret);
}

async function isTokenFingerprintAllowed(
  fingerprint: string,
  secret: string,
) {
  const allowedTokens = getAccessTokens();

  for (const token of allowedTokens) {
    const expectedFingerprint = await createTokenFingerprint(token, secret);

    if (constantTimeEqual(fingerprint, expectedFingerprint)) {
      return true;
    }
  }

  return false;
}

export function isSupplementsAccessTokenValid(token: string | null) {
  if (!token) {
    return false;
  }

  return getAccessTokens().some((allowedToken) =>
    constantTimeEqual(token, allowedToken),
  );
}

export async function createSupplementsAccessCookieValue(token: string) {
  const secret = getCookieSecret();

  if (!secret) {
    return null;
  }

  const fingerprint = await createTokenFingerprint(token, secret);
  const payload = `${COOKIE_VERSION}.${fingerprint}`;
  const signature = await createSignature(payload, secret);

  return `${payload}.${signature}`;
}

export async function isSupplementsAccessCookieValid(cookieValue?: string) {
  const secret = getCookieSecret();

  if (!secret || !cookieValue) {
    return false;
  }

  const parts = cookieValue.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [version, fingerprint, signature] = parts;

  if (version !== COOKIE_VERSION || !fingerprint || !signature) {
    return false;
  }

  const payload = `${version}.${fingerprint}`;
  const expectedSignature = await createSignature(payload, secret);

  if (!constantTimeEqual(signature, expectedSignature)) {
    return false;
  }

  return isTokenFingerprintAllowed(fingerprint, secret);
}

export function getSupplementsAccessCookieOptions() {
  return {
    httpOnly: true,
    maxAge: SUPPLEMENTS_ACCESS_COOKIE_MAX_AGE,
    path: SUPPLEMENTS_ACCESS_COOKIE_PATH,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}
