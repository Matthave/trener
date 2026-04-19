"use client";

import { useFormularzStore } from "@/lib/stores/formularz-store";

interface FieldDef {
  key: "imie" | "nazwisko" | "email" | "telefon" | "wzrost" | "waga" | "obwodSzyi" | "obwodTalii";
  label: string;
  placeholder: string;
}

const SUB_STEPS: FieldDef[][] = [
  [
    { key: "imie", label: "Imię", placeholder: "" },
    { key: "nazwisko", label: "Nazwisko", placeholder: "" },
    { key: "email", label: "Adres e-mail", placeholder: "np. jan@example.com" },
    { key: "telefon", label: "Numer telefonu", placeholder: "np. 600 123 456" },
  ],
  [
    { key: "wzrost", label: "Wzrost (cm)", placeholder: "" },
    { key: "waga", label: "Waga (kg)", placeholder: "" },
    { key: "obwodSzyi", label: "Obwód szyi (cm)", placeholder: "" },
    { key: "obwodTalii", label: "Obwód talii (cm)", placeholder: "" },
  ],
];

interface AnkietaStartowaProps {
  stepInSection: number;
}

export function AnkietaStartowa({ stepInSection }: AnkietaStartowaProps) {
  const fields = SUB_STEPS[stepInSection];
  const ankieta = useFormularzStore((s) => s.formData.ankieta);
  const updateAnkieta = useFormularzStore((s) => s.updateAnkieta);

  return (
    <div>
      <div className="flex flex-col gap-8">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-2">
            <label className="text-sm uppercase tracking-widest text-foreground/80">
              {field.label}
            </label>
            <input
              type="text"
              placeholder={field.placeholder}
              autoComplete="off"
              value={ankieta[field.key]}
              onChange={(e) => updateAnkieta({ [field.key]: e.target.value })}
              className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
