"use client";

import { InsomniaDotNav } from "./InsomniaDotNav";
import { InsomniaDotNavMobile } from "./InsomniaDotNavMobile";
import { useInsomniaScrollSpy } from "./useInsomniaScrollSpy";

export function InsomniaDotNavMount() {
  const { activeId, scrollToSection } = useInsomniaScrollSpy();

  return (
    <>
      <InsomniaDotNav activeId={activeId} onNavigate={scrollToSection} />
      <InsomniaDotNavMobile activeId={activeId} onNavigate={scrollToSection} />
    </>
  );
}
