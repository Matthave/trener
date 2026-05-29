"use client";

import { FileUpload } from "../FileUpload";
import { useFormularzStore } from "@/lib/stores/formularz-store";

interface FieldDef {
  key:
    | "imie"
    | "nazwisko"
    | "email"
    | "telefon"
    | "wzrost"
    | "waga"
    | "obwodSzyi"
    | "obwodTalii";
  label: string;
  placeholder: string;
  inputType?: "text" | "number" | "tel";
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  const parts: string[] = [];
  
  for (let i = 0; i < digits.length; i += 3) {
    parts.push(digits.slice(i, i + 3));
  }
  
  return parts.join(" ");
}

const SUB_STEPS: FieldDef[][] = [
  [
    { key: "imie", label: "Imię", placeholder: "" },
    { key: "nazwisko", label: "Nazwisko", placeholder: "" },
    { key: "email", label: "Adres e-mail", placeholder: "np. jan@example.com" },
    {
      key: "telefon",
      label: "Numer telefonu",
      placeholder: "np. 600 123 456",
      inputType: "tel",
    },
  ],
  [
    {
      key: "wzrost",
      label: "Wzrost (cm)",
      placeholder: "",
      inputType: "number",
    },
    { key: "waga", label: "Waga (kg)", placeholder: "", inputType: "number" },
    {
      key: "obwodSzyi",
      label: "Obwód szyi (cm)",
      placeholder: "",
      inputType: "number",
    },
    {
      key: "obwodTalii",
      label: "Obwód talii (cm)",
      placeholder: "",
      inputType: "number",
    },
  ],
];

interface AnkietaStartowaProps {
  stepInSection: number;
}

export function AnkietaStartowa({ stepInSection }: AnkietaStartowaProps) {
  const fields = SUB_STEPS[stepInSection];
  const ankieta = useFormularzStore((s) => s.formData.ankieta);
  const updateAnkieta = useFormularzStore((s) => s.updateAnkieta);
  const isMeasurementsStep = stepInSection === 1;

  const handleChange = (fieldKey: FieldDef["key"], value: string) => {
    if (fieldKey === "telefon") {
      updateAnkieta({ [fieldKey]: formatPhoneNumber(value) });
    } else {
      updateAnkieta({ [fieldKey]: value });
    }
  };

  return (
    <div>
      {isMeasurementsStep && (
        <div className="mb-10">
          <FileUpload />
        </div>
      )}

      <div className="flex flex-col gap-8">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-2">
            <label className="text-sm uppercase tracking-widest text-foreground/80">
              {field.label}
            </label>
            <input
              type={field.inputType ?? "text"}
              placeholder={field.placeholder}
              autoComplete="off"
              value={ankieta[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
