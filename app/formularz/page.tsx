"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useMultiStepForm } from "./_hooks/useMultiStepForm";
import { StepWrapper } from "./_components/StepWrapper";
import { SectionProgressBar } from "./_components/SectionProgressBar";
import { WelcomeScreen } from "./_components/WelcomeScreen";
import { AnkietaStartowa } from "./_components/sections/AnkietaStartowa";
import { WywiadZywieniowy } from "./_components/sections/WywiadZywieniowy";
import { WywiadTreningowy } from "./_components/sections/WywiadTreningowy";
import { Zdrowie } from "./_components/sections/Zdrowie";
import { Sen } from "./_components/sections/Sen";
import { useFormularzStore } from "@/lib/stores/formularz-store";
import { sendFormAction } from "./actions/sendForm";

interface SectionComponentProps {
  stepInSection: number;
}

const SECTION_COMPONENTS: Record<
  string,
  React.ComponentType<SectionComponentProps>
> = {
  "ankieta-startowa": AnkietaStartowa,
  "wywiad-zywieniowy": WywiadZywieniowy,
  "wywiad-treningowy": WywiadTreningowy,
  zdrowie: Zdrowie,
  sen: Sen,
};

function ThankYouScreen({ clientName }: { clientName: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-3xl uppercase tracking-wider md:text-5xl">
          Dziękujemy!
        </h2>
        <p className="text-lg text-foreground/70">
          {clientName
            ? `${clientName}, Twój formularz został wysłany.`
            : "Twój formularz został wysłany."}
        </p>
        <p className="text-sm text-foreground/50">
          Odpowiemy najszybciej jak to możliwe.
        </p>
      </div>
      <Link
        href="/"
        className="border border-accent px-8 py-3 text-sm uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-background"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}

function FormularzPageContent() {
  const {
    currentStep,
    currentFlatStep,
    isWelcomeStep,
    showPowrotToHome,
    isLastStep,
    includeSleep,
    setIncludeSleep,
    sections,
    next,
    back,
    goToSection,
  } = useMultiStepForm();

  const formData = useFormularzStore((s) => s.formData);
  const resetStore = useFormularzStore((s) => s.resetStore);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await sendFormAction(formData);

    setIsSubmitting(false);

    if (result.success) {
      const name = [formData.ankieta.imie, formData.ankieta.nazwisko]
        .filter(Boolean)
        .join(" ");
      setSubmittedName(name);
      resetStore();
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      next();
    }
  };

  if (isSubmitted) {
    return <ThankYouScreen clientName={submittedName} />;
  }

  const renderCurrentStep = () => {
    if (isWelcomeStep) {
      return (
        <WelcomeScreen
          includeSleep={includeSleep}
          onIncludeSleepChange={setIncludeSleep}
        />
      );
    }

    if (currentFlatStep) {
      const SectionComponent = SECTION_COMPONENTS[currentFlatStep.sectionId];
      if (SectionComponent) {
        return (
          <SectionComponent stepInSection={currentFlatStep.stepInSection} />
        );
      }
    }

    return null;
  };

  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl overflow-x-hidden px-6 pt-16 pb-28 lg:h-full lg:pb-16">
        {!isWelcomeStep && currentFlatStep && (
          <div className="mb-12">
            <h2 className="mb-6 text-center font-heading text-2xl uppercase tracking-wider md:text-4xl">
              {currentFlatStep.sectionLabel}{" "}
              <span className="mt-2 block text-xl text-foreground/40 md:text-3xl">
                ({currentFlatStep.stepInSection + 1}/
                {currentFlatStep.totalStepsInSection})
              </span>
            </h2>
            <SectionProgressBar
              sections={sections}
              currentSectionIndex={currentFlatStep.sectionIndex}
              onSectionClick={goToSection}
            />
          </div>
        )}

        <StepWrapper stepKey={currentStep}>{renderCurrentStep()}</StepWrapper>

        {submitError && (
          <div className="mt-6 border border-red-500/40 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
            {submitError}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-foreground/10 bg-background/95 px-6 py-5 backdrop-blur-sm lg:pointer-events-none lg:fixed lg:top-1/2 lg:bottom-auto lg:left-0 lg:right-0 lg:-translate-y-1/2 lg:border-t-0 lg:bg-transparent lg:backdrop-blur-none lg:px-4 lg:py-0 xl:px-32">
        {showPowrotToHome ? (
          <Link
            href="/"
            className="border border-foreground/60 px-8 py-3 text-sm uppercase tracking-widest text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground lg:pointer-events-auto"
          >
            Powrót
          </Link>
        ) : (
          <button
            type="button"
            onClick={back}
            disabled={isSubmitting}
            className="cursor-pointer border border-foreground/60 px-8 py-3 text-sm uppercase tracking-widest text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 lg:pointer-events-auto"
          >
            Wstecz
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="cursor-pointer border border-accent px-8 py-3 text-sm uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-background disabled:cursor-not-allowed disabled:opacity-40 lg:pointer-events-auto"
        >
          {isSubmitting
            ? "Wysyłanie…"
            : isLastStep
              ? "Wyślij formularz"
              : "Dalej"}
        </button>
      </div>
    </div>
  );
}

export default function FormularzPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center px-6 font-heading text-sm uppercase tracking-widest text-foreground/60">
          Ładowanie formularza…
        </div>
      }
    >
      <FormularzPageContent />
    </Suspense>
  );
}
