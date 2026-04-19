"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  parseFormPakietParam,
  type FormPakietPreset,
} from "@/lib/formularz/form-pakiet";

interface SectionDef {
  id: string;
  sectionLabel: string;
  totalSubSteps: number;
}

export interface FlatStep {
  sectionId: string;
  sectionIndex: number;
  sectionLabel: string;
  stepInSection: number;
  totalStepsInSection: number;
}

const BASE_SECTIONS: SectionDef[] = [
  { id: "ankieta-startowa", sectionLabel: "Ankieta startowa", totalSubSteps: 2 },
  { id: "wywiad-zywieniowy", sectionLabel: "Wywiad żywieniowy", totalSubSteps: 4 },
  { id: "wywiad-treningowy", sectionLabel: "Wywiad treningowy", totalSubSteps: 2 },
  { id: "zdrowie", sectionLabel: "Zdrowie", totalSubSteps: 4 },
];

const SLEEP_SECTION: SectionDef = {
  id: "sen",
  sectionLabel: "Sen",
  totalSubSteps: 4,
};

const SECTION_BY_ID = new Map(
  [...BASE_SECTIONS, SLEEP_SECTION].map((s) => [s.id, s]),
);

function pickSections(ids: readonly string[]): SectionDef[] {
  return ids.map((id) => {
    const s = SECTION_BY_ID.get(id);
    if (!s) throw new Error(`Unknown section id: ${id}`);
    return s;
  });
}

function buildSections(
  pakietPreset: FormPakietPreset | null,
  includeSleep: boolean,
): SectionDef[] {
  if (pakietPreset === "trening") {
    return pickSections(["ankieta-startowa", "wywiad-treningowy", "zdrowie"]);
  }
  if (pakietPreset === "dieta") {
    return pickSections(["ankieta-startowa", "wywiad-zywieniowy", "zdrowie"]);
  }
  if (pakietPreset === "sen") {
    return pickSections(["ankieta-startowa", "zdrowie", "sen"]);
  }
  if (pakietPreset === "trening-dieta") {
    return pickSections([
      "ankieta-startowa",
      "wywiad-treningowy",
      "wywiad-zywieniowy",
      "zdrowie",
    ]);
  }
  if (pakietPreset === "trening-dieta-sen") {
    return pickSections([
      "ankieta-startowa",
      "wywiad-treningowy",
      "wywiad-zywieniowy",
      "zdrowie",
      "sen",
    ]);
  }
  const s = [...BASE_SECTIONS];
  if (includeSleep) {
    s.push(SLEEP_SECTION);
  }
  return s;
}

function buildFlatSteps(sections: SectionDef[]): FlatStep[] {
  const flat: FlatStep[] = [];
  sections.forEach((section, sectionIndex) => {
    for (let step = 0; step < section.totalSubSteps; step++) {
      flat.push({
        sectionId: section.id,
        sectionIndex,
        sectionLabel: section.sectionLabel,
        stepInSection: step,
        totalStepsInSection: section.totalSubSteps,
      });
    }
  });
  return flat;
}

export function useMultiStepForm() {
  const searchParams = useSearchParams();
  const pakietPreset = useMemo(
    () => parseFormPakietParam(searchParams.get("pakiet")),
    [searchParams],
  );

  const hasWelcome = pakietPreset === null;

  const [currentStep, setCurrentStep] = useState(0);
  const [includeSleep, setIncludeSleep] = useState(false);

  const sections = useMemo(
    () => buildSections(pakietPreset, includeSleep),
    [pakietPreset, includeSleep],
  );

  const flatSteps = useMemo(() => buildFlatSteps(sections), [sections]);

  useEffect(() => {
    setCurrentStep(0);
  }, [pakietPreset]);

  const isWelcomeStep = hasWelcome && currentStep === 0;

  const currentFlatIndex = isWelcomeStep
    ? -1
    : hasWelcome
      ? currentStep - 1
      : currentStep;

  const currentFlatStep =
    currentFlatIndex >= 0 ? flatSteps[currentFlatIndex] ?? null : null;

  const isLastStep =
    currentFlatIndex >= 0 &&
    currentFlatIndex === flatSteps.length - 1;

  /** Welcome albo pierwszy krok trybu ?pakiet= — lewy przycisk = Powrót na "/" */
  const showPowrotToHome =
    isWelcomeStep || (!hasWelcome && currentFlatIndex === 0);

  const totalSections = sections.length;
  const totalFlatSteps = flatSteps.length;

  const next = useCallback(() => {
    setCurrentStep((prev) => {
      if (hasWelcome && prev === 0) {
        return 1;
      }
      const maxStep = hasWelcome ? flatSteps.length : flatSteps.length - 1;
      return Math.min(prev + 1, maxStep);
    });
  }, [flatSteps.length, hasWelcome]);

  const back = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const goToSection = useCallback(
    (sectionIndex: number) => {
      const firstFlatIndex = flatSteps.findIndex(
        (s) => s.sectionIndex === sectionIndex,
      );
      if (firstFlatIndex !== -1) {
        setCurrentStep(hasWelcome ? firstFlatIndex + 1 : firstFlatIndex);
      }
    },
    [flatSteps, hasWelcome],
  );

  return {
    currentStep,
    currentFlatStep,
    currentFlatIndex,
    isWelcomeStep,
    showPowrotToHome,
    isLastStep,
    totalSections,
    totalFlatSteps,
    flatSteps,
    sections,
    includeSleep,
    setIncludeSleep,
    next,
    back,
    goToStep,
    goToSection,
  };
}
