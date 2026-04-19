"use server";

import { Resend } from "resend";
import { z } from "zod";
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

export async function sendFormAction(
  data: FormularzData,
): Promise<ActionResponse> {
  const envResult = envSchema.safeParse(process.env);
  if (!envResult.success) {
    return {
      success: false,
      error: "Błąd konfiguracji serwera. Spróbuj ponownie później.",
    };
  }

  const parseResult = formDataSchema.safeParse(data);
  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0]?.message ?? "Nieprawidłowe dane";
    return { success: false, error: firstError };
  }

  const { RESEND_API_KEY, ADMIN_EMAIL } = envResult.data;
  const resend = new Resend(RESEND_API_KEY);

  const clientName = [data.ankieta.imie, data.ankieta.nazwisko]
    .filter(Boolean)
    .join(" ");

  const html = formatFormDataToHtml(data);

  try {
    const { error } = await resend.emails.send({
      from: "Formularz startowy <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `Nowy formularz startowy — ${clientName || "Klient"}`,
      html,
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
