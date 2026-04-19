"use client";

import { cn } from "@/lib/utils";

interface WelcomeScreenProps {
  includeSleep: boolean;
  onIncludeSleepChange: (value: boolean) => void;
}

export function WelcomeScreen({
  includeSleep,
  onIncludeSleepChange,
}: WelcomeScreenProps) {
  return (
    <div>
      <h1 className="font-heading text-3xl md:text-5xl uppercase tracking-wider mb-6">
        Formularz startowy
      </h1>

      <p className="text-foreground/100 text-base md:text-lg mb-16 max-w-xl leading-relaxed">
        Wypełnienie tego formularza pozwoli mi lepiej poznać Twoje potrzeby i
        przygotować spersonalizowany plan działania.
      </p>

      <div>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Czy chcesz uzupełnić dodatkową sekcję dotyczącą snu?
          <span className="text-foreground/60 text-base ml-2">
            (opcjonalne)
          </span>
        </p>

        <div className="flex flex-col gap-4">
          <label
            className={cn(
              "flex items-center gap-4 cursor-pointer border px-6 py-4 transition-colors",
              includeSleep
                ? "border-accent text-accent"
                : "border-foreground/80 text-foreground/100 hover:border-foreground/40",
            )}
          >
            <input
              type="checkbox"
              checked={includeSleep}
              onChange={() => onIncludeSleepChange(true)}
              className="sr-only"
            />
            <span
              className={cn(
                "w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors",
                includeSleep
                  ? "border-accent bg-accent"
                  : "border-foreground/80",
              )}
            >
              {includeSleep && (
                <svg
                  viewBox="0 0 12 12"
                  className="w-3 h-3 text-background"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </span>
            <span className="text-base md:text-lg">
              Tak, chcę wypełnić sekcję o śnie
            </span>
          </label>

          <label
            className={cn(
              "flex items-center gap-4 cursor-pointer border px-6 py-4 transition-colors",
              !includeSleep
                ? "border-accent text-accent"
                : "border-foreground/80 text-foreground/100 hover:border-foreground/40",
            )}
          >
            <input
              type="checkbox"
              checked={!includeSleep}
              onChange={() => onIncludeSleepChange(false)}
              className="sr-only"
            />
            <span
              className={cn(
                "w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors",
                !includeSleep
                  ? "border-accent bg-accent"
                  : "border-foreground/80",
              )}
            >
              {!includeSleep && (
                <svg
                  viewBox="0 0 12 12"
                  className="w-3 h-3 text-background"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </span>
            <span className="text-base md:text-lg">Nie, pominę tę sekcję</span>
          </label>
        </div>
      </div>
    </div>
  );
}
