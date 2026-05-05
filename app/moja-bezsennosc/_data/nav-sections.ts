import { insomniaStory } from "./story-content";

function slugifyTitle(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const INSOMNIA_DOT_NAV_SECTIONS = [
  { id: "insomnia-start", label: "Początek" },
  ...insomniaStory.blocks
    .filter((block) => block.type === "tile")
    .map((block) => ({
      id: `insomnia-${slugifyTitle(block.title)}`,
      label: block.title,
    })),
  { id: "insomnia-mapa-sukcesu", label: "Mapa sukcesu" },
  { id: "why-section", label: "Dlaczego?" },
] as const;
