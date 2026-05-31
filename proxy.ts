import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  SUPPLEMENTS_ACCESS_COOKIE_NAME,
  createSupplementsAccessCookieValue,
  getSupplementsAccessCookieOptions,
  isSupplementsAccessTokenValid,
} from "@/app/supplements/_lib/access";

export async function proxy(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get("access");

  if (!accessToken) {
    return NextResponse.next();
  }

  const redirectUrl = new URL("/supplements", request.url);
  const response = NextResponse.redirect(redirectUrl);
  const cookieOptions = getSupplementsAccessCookieOptions();

  if (isSupplementsAccessTokenValid(accessToken)) {
    const cookieValue = await createSupplementsAccessCookieValue(accessToken);

    if (cookieValue) {
      response.cookies.set({
        name: SUPPLEMENTS_ACCESS_COOKIE_NAME,
        value: cookieValue,
        ...cookieOptions,
      });
    }

    return response;
  }

  response.cookies.set({
    name: SUPPLEMENTS_ACCESS_COOKIE_NAME,
    value: "",
    ...cookieOptions,
    maxAge: 0,
  });

  return response;
}

export const config = {
  matcher: "/supplements",
};
