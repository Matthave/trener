export const FORM_PAKIET_QUERY = "pakiet" as const;

export type FormPakietPreset =
  | "trening"
  | "dieta"
  | "sen"
  | "trening-dieta"
  | "trening-dieta-sen";

export function parseFormPakietParam(
  value: string | null,
): FormPakietPreset | null {
  if (
    value === "trening" ||
    value === "dieta" ||
    value === "sen" ||
    value === "trening-dieta" ||
    value === "trening-dieta-sen"
  ) {
    return value;
  }
  return null;
}

export function formularzHrefWithPakiet(preset: FormPakietPreset): string {
  return `/formularz?${FORM_PAKIET_QUERY}=${preset}`;
}
