"use client";

import { useCallback, useEffect, useState } from "react";

export const HOME_DOT_NAV_SECTIONS = [
  { id: "section-start", label: "Start" },
  { id: "section-proces", label: "Proces" },
  { id: "programs", label: "Pakiety" },
  { id: "section-opinie", label: "Opinie" },
  { id: "contact", label: "Kontakt" },
] as const;

const SECTION_IDS = HOME_DOT_NAV_SECTIONS.map((s) => s.id);

const IO_THRESHOLDS = [
  0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
  0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
];

function pickActiveSection(elements: HTMLElement[]) {
  const vh = window.innerHeight;
  const half = 0.5 * vh;
  type Cand = { id: string; visible: number };
  const qualified: Cand[] = [];

  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(vh, rect.bottom);
    const visible = Math.max(0, visibleBottom - visibleTop);
    if (visible >= half) {
      qualified.push({ id: el.id, visible });
    }
  }

  if (qualified.length > 0) {
    qualified.sort((a, b) => b.visible - a.visible);
    return qualified[0].id;
  }

  let best: Cand | null = null;
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(vh, rect.bottom);
    const visible = Math.max(0, visibleBottom - visibleTop);
    if (visible > 0) {
      if (!best || visible > best.visible) {
        best = { id: el.id, visible };
      }
    }
  }

  return best?.id ?? SECTION_IDS[0];
}

export function useHomeScrollSpy() {
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0]);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (elements.length === 0) {
      return;
    }

    const updateActive = () => {
      setActiveId(pickActiveSection(elements));
    };

    const observer = new IntersectionObserver(() => updateActive(), {
      threshold: IO_THRESHOLDS,
    });

    for (const el of elements) {
      observer.observe(el);
    }

    updateActive();

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return { activeId, scrollToSection };
}
