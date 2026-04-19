export const CONTACT_FORM_OBJECTIVES = [
  { value: "fat-loss", label: "Redukcja tkanki tłuszczowej" },
  { value: "muscle-gain", label: "Budowa masy mięśniowej" },
  { value: "strength", label: "Trening siłowy" },
  { value: "general-fitness", label: "Ogólna sprawność" },
  { value: "self-improvement", label: "Poprawa regeneracji i snu" },
  { value: "rehabilitation", label: "Rehabilitacja" },
] as const;

export function getContactObjectiveLabel(value: string): string {
  const found = CONTACT_FORM_OBJECTIVES.find((o) => o.value === value);
  return found?.label ?? value;
}
