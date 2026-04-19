"use client";

import { DotNav } from "@/components/home/DotNav";
import { DotNavMobile } from "@/components/home/DotNavMobile";
import { useHomeScrollSpy } from "@/components/home/useHomeScrollSpy";

/** Single scroll spy for desktop + mobile nav (one IntersectionObserver). */
export function HomeDotNavMount() {
  const { activeId, scrollToSection } = useHomeScrollSpy();

  return (
    <>
      <DotNav activeId={activeId} onNavigate={scrollToSection} />
      <DotNavMobile activeId={activeId} onNavigate={scrollToSection} />
    </>
  );
}
