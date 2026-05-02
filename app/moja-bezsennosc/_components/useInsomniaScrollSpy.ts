"use client";

import { useCallback, useEffect, useState } from "react";

import { INSOMNIA_DOT_NAV_SECTIONS } from "../_data/nav-sections";

const SECTION_IDS = INSOMNIA_DOT_NAV_SECTIONS.map((section) => section.id);
const ACTIVE_LINE_RATIO = 0.45;

function pickActiveSection(elements: HTMLElement[]) {
  const activeLine = window.innerHeight * ACTIVE_LINE_RATIO;
  let activeId = elements[0]?.id ?? SECTION_IDS[0];

  for (const el of elements) {
    const rect = el.getBoundingClientRect();

    if (rect.top <= activeLine) {
      activeId = el.id;
      continue;
    }

    break;
  }

  return activeId;
}

export function useInsomniaScrollSpy() {
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

    updateActive();

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return { activeId, scrollToSection };
}
