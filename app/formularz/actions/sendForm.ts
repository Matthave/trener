"use server";

import { Resend } from "resend";
import { z } from "zod";
import {
  isAllowedFile,
  MAX_FILE_BYTES,
  MAX_FILES,
  MAX_TOTAL_BYTES,
} from "@/lib/formularz/file-upload-config";
import type { FormularzData } from "@/lib/stores/formularz-store";
import { formatFormDataToHtml } from "./format-form-html";

type ActionResponse =
  | { success: true }
  | { success: false; error: string };

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  ADMIN_EMAIL: z.string().email(),
});

const formDataSchema = z.object({
  ankieta: z.object({
    imie: z.string().min(1, "Imię jest wymagane"),
    nazwisko: z.string().min(1, "Nazwisko jest wymagane"),
    email: z.string().email("Nieprawidłowy adres e-mail"),
    telefon: z.string().min(1, "Telefon jest wymagany"),
    wzrost: z.string(),
    waga: z.string(),
    obwodSzyi: z.string(),
    obwodTalii: z.string(),
  }),
  zywienie: z.object({}).passthrough(),
  treningowy: z.object({}).passthrough(),
  zdrowie: z.object({}).passthrough(),
  sen: z.object({}).passthrough(),
});

function validateFiles(files: File[]): string | null {
  if (files.length > MAX_FILES) {
    return `Możesz dodać maksymalnie ${MAX_FILES} plików.`;
  }

  let totalBytes = 0;

  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) {
      return "Nieprawidłowy plik w załącznikach.";
    }

    if (!isAllowedFile(file)) {
      return "Niedozwolony format pliku.";
    }

    if (file.size > MAX_FILE_BYTES) {
      return `Plik „${file.name}” przekracza dozwolony rozmiar.`;
    }

    totalBytes += file.size;
  }

  if (totalBytes > MAX_TOTAL_BYTES) {
    return "Łączny rozmiar załączników jest zbyt duży.";
  }

  return null;
}

export async function sendFormAction(
  formData: FormData,
): Promise<ActionResponse> {
  const envResult = envSchema.safeParse(process.env);
  if (!envResult.success) {
    return {
      success: false,
      error: "Błąd konfiguracji serwera. Spróbuj ponownie później.",
    };
  }

  const payloadRaw = formData.get("payload");
  if (typeof payloadRaw !== "string") {
    return { success: false, error: "Nieprawidłowe dane formularza." };
  }

  let data: FormularzData;
  try {
    data = JSON.parse(payloadRaw) as FormularzData;
  } catch {
    return { success: false, error: "Nieprawidłowe dane formularza." };
  }

  const parseResult = formDataSchema.safeParse(data);
  if (!parseResult.success) {
    const firstError =
      parseResult.error.issues[0]?.message ?? "Nieprawidłowe dane";
    return { success: false, error: firstError };
  }

  const files = formData.getAll("files").filter((entry): entry is File => {
    return entry instanceof File && entry.size > 0;
  });

  const filesError = validateFiles(files);
  if (filesError) {
    return { success: false, error: filesError };
  }

  const { RESEND_API_KEY, ADMIN_EMAIL } = envResult.data;
  const resend = new Resend(RESEND_API_KEY);

  const clientName = [data.ankieta.imie, data.ankieta.nazwisko]
    .filter(Boolean)
    .join(" ");

  const attachmentFileNames = files.map((file) => file.name);
  const html = formatFormDataToHtml(data, attachmentFileNames);

  const attachments =
    files.length > 0
      ? await Promise.all(
          files.map(async (file) => ({
            filename: file.name,
            content: Buffer.from(await file.arrayBuffer()),
            contentType: file.type || undefined,
          })),
        )
      : undefined;

  try {
    const { error } = await resend.emails.send({
      from: "Formularz startowy <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `Nowy formularz startowy — ${clientName || "Klient"}`,
      html,
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Nie udało się wysłać formularza. Spróbuj ponownie.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error sending form:", err);
    return {
      success: false,
      error: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
    };
  }
}
