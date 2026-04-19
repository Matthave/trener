"use client";

import { cn } from "@/lib/utils";

interface SectionProgressBarProps {
  sections: { id: string; sectionLabel: string }[];
  currentSectionIndex: number;
  onSectionClick: (sectionIndex: number) => void;
}

export function SectionProgressBar({
  sections,
  currentSectionIndex,
  onSectionClick,
}: SectionProgressBarProps) {
  const total = sections.length;

  return (
    <div
      className="flex items-center w-full max-w-md mx-auto"
      role="navigation"
      aria-label="Nawigacja sekcji formularza"
    >
      {/* Leading decorative line */}
      <div
        className={cn(
          "h-[5px] flex-1 transition-colors duration-300 rounded-tl-lg rounded-bl-lg",
          currentSectionIndex >= 0 ? "bg-accent/100" : "bg-foreground/20",
        )}
      />

      {sections.map((section, index) => {
        const isActive = index <= currentSectionIndex;
        const isCurrent = index === currentSectionIndex;

        return (
          <div key={section.id} className="contents">
            <button
              type="button"
              onClick={() => onSectionClick(index)}
              aria-label={`${section.sectionLabel} — sekcja ${index + 1} z ${total}`}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "relative w-11 h-11 rounded-full flex items-center justify-center text-sm font-heading shrink-0 transition-all duration-300 cursor-pointer",
                isActive
                  ? "bg-accent/100 text-background border-3 border-#111 hover:border-accent/80"
                  : "bg-foreground/15 text-foreground/50 border-3 border-#111 hover:border-accent/50 hover:text-foreground/70",
              )}
            >
              {index + 1}
            </button>

            {index < total - 1 && (
              <div
                className={cn(
                  "h-[5px] flex-1 min-w-6 transition-colors duration-300",
                  index < currentSectionIndex
                    ? "bg-accent/80"
                    : "bg-foreground/20",
                )}
              />
            )}
          </div>
        );
      })}

      {/* Trailing decorative line */}
      <div
        className={cn(
          "h-[5px] flex-1 transition-colors duration-300 rounded-tr-lg rounded-br-lg",
          currentSectionIndex >= total - 1
            ? "bg-accent/80"
            : "bg-foreground/20",
        )}
      />
    </div>
  );
}
