import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Imię i nazwisko musi mieć co najmniej 2 znaki"),
  email: z.string().email("Podaj prawidłowy adres e-mail"),
  currentState: z
    .string()
    .min(1, "Podaj wiek, wagę i wzrost"),
  primaryObjective: z
    .string()
    .min(1, "Wybierz główny cel treningowy"),
  briefHistory: z
    .string()
    .min(1, "Opisz swoje dotychczasowe doświadczenie"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
