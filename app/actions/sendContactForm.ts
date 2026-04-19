"use server";

import { Resend } from "resend";
import { z } from "zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact-form";
import { getContactObjectiveLabel } from "@/lib/contact-form-objectives";

type ActionResponse =
  | { success: true }
  | { success: false; error: string };

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  ADMIN_EMAIL: z.string().email(),
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatContactFormToHtml(data: ContactFormData): string {
  const rows = [
    { label: "Imię i nazwisko", value: data.fullName },
    { label: "Adres e-mail", value: data.email },
    { label: "Aktualny stan (wiek / waga / wzrost)", value: data.currentState },
    {
      label: "Główny cel",
      value: getContactObjectiveLabel(data.primaryObjective),
    },
    {
      label: "Dotychczasowe doświadczenie treningowe",
      value: data.briefHistory,
    },
  ]
    .map(
      (row) =>
        `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;vertical-align:top;width:40%;color:#333;">${escapeHtml(row.label)}</td>
          <td style="padding:8px 12px;border:1px solid #ddd;color:#555;white-space:pre-wrap;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join("\n");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:700px;margin:0 auto;color:#333;">
      <h1 style="font-size:22px;color:#111;border-bottom:2px solid #9FC6FF;padding-bottom:8px;">
        Nowe zgłoszenie z formularza kontaktowego
      </h1>
      <p style="color:#666;font-size:14px;">
        Wysłano: ${new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" })}
      </p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${rows}
      </table>
    </div>
  `;
}

export async function sendContactFormAction(
  data: ContactFormData,
): Promise<ActionResponse> {
  const envResult = envSchema.safeParse(process.env);
  if (!envResult.success) {
    return {
      success: false,
      error: "Błąd konfiguracji serwera. Spróbuj ponownie później.",
    };
  }

  const parseResult = contactFormSchema.safeParse(data);
  if (!parseResult.success) {
    const first =
      parseResult.error.issues[0]?.message ?? "Nieprawidłowe dane";
    return { success: false, error: first };
  }

  const valid = parseResult.data;
  const { RESEND_API_KEY, ADMIN_EMAIL } = envResult.data;
  const resend = new Resend(RESEND_API_KEY);
  const html = formatContactFormToHtml(valid);

  try {
    const { error } = await resend.emails.send({
      from: "Formularz kontaktowy <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      replyTo: valid.email,
      subject: `Nowe zgłoszenie — ${valid.fullName}`,
      html,
    });

    if (error) {
      console.error("Resend error (contact):", error);
      return {
        success: false,
        error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error sending contact form:", err);
    return {
      success: false,
      error: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
    };
  }
}
