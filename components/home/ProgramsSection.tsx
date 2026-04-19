"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SlideUp } from "@/components/animations/SlideUp";
import { cn } from "@/lib/utils";
import { programs, type Program } from "./programs-data";

function ProgramRow({
  program,
  index,
  isOpen,
  isDimmed,
  onToggle,
  panelId,
  rowId,
}: {
  program: Program;
  index: number;
  isOpen: boolean;
  isDimmed: boolean;
  onToggle: () => void;
  panelId: string;
  rowId: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const panelBlocks =
    program.bundlePanels && program.bundlePanels.length > 0
      ? program.bundlePanels
      : [{ heading: "", sections: program.sections }];

  return (
    <SlideUp delay={0.1 * (index + 1)} triggerOnScroll>
      <div
        className={cn(
          "overflow-hidden rounded-lg border bg-foreground/[0.03] transition-[opacity,colors,border-color] duration-300",
          isOpen && "border-accent",
          !isOpen &&
            program.accentBundle &&
            "border-accent/80 hover:border-accent",
          !isOpen &&
            !program.accentBundle &&
            "border-foreground/10 hover:border-foreground/20",
          isDimmed && "opacity-80 hover:opacity-100",
        )}
      >
        <button
          type="button"
          id={rowId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "relative w-full cursor-pointer bg-transparent px-6 py-6 text-left transition-colors sm:px-8 sm:py-8 lg:px-10 lg:py-10",
            !isOpen && "group/pkg",
            "min-h-[7.5rem] sm:min-h-[8.5rem]",
            !isOpen &&
              "hover:bg-accent/[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            isOpen && "bg-foreground/[0.06] hover:bg-foreground/[0.06]",
          )}
        >
          <div className="flex min-h-[4.5rem] flex-col gap-4 sm:min-h-0 sm:flex-row sm:items-center sm:gap-6 lg:gap-10">
            <span
              className={cn(
                "font-heading text-xs tracking-[0.2em] text-accent transition-colors sm:text-sm",
                !isOpen && "group-hover/pkg:text-[#111]",
                isOpen && "text-accent",
              )}
            >
              {program.id}
            </span>

            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6",
                program.hideDescription && "sm:flex-1",
              )}
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <h3
                  className={cn(
                    "font-heading text-xl font-bold uppercase transition-colors sm:text-3xl lg:text-4xl xl:text-5xl",
                    isOpen && "text-[#fff]",
                    !isOpen && "text-foreground group-hover/pkg:text-[#111]",
                  )}
                >
                  {program.title}
                </h3>

                <span
                  aria-hidden
                  className={cn(
                    "ml-auto shrink-0 font-heading text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ease-out sm:ml-0",
                    "pointer-events-none translate-x-2 opacity-0",
                    "group-hover/pkg:translate-x-0 group-hover/pkg:opacity-100",
                    isOpen && "translate-x-0 opacity-100",
                    !isOpen && "text-accent group-hover/pkg:text-[#111]",
                    isOpen && "text-accent",
                  )}
                >
                  kliknij
                </span>
              </div>
            </div>

            {!program.hideDescription || isOpen || program.discountBadge ? (
              <div
                className={cn(
                  "flex flex-col items-end gap-1 font-heading transition-colors sm:ml-auto sm:max-w-xs sm:text-right lg:max-w-sm",
                  isOpen
                    ? "text-accent"
                    : program.hideDescription && program.discountBadge
                      ? "text-accent group-hover/pkg:text-[#111]"
                      : "text-[10px] uppercase leading-relaxed tracking-[0.12em] text-foreground/80 sm:text-[11px] group-hover/pkg:text-[#111]",
                )}
              >
                {isOpen ? (
                  <>
                    <p
                      className={cn(
                        "text-2xl font-bold tracking-tight transition-colors sm:text-3xl lg:text-4xl",
                        program.savingsNote && "leading-tight",
                      )}
                    >
                      {program.price}
                    </p>
                    {program.savingsNote ? (
                      <p className="max-w-xs text-[10px] font-medium uppercase leading-snug tracking-[0.12em] text-foreground/65 sm:text-[11px]">
                        {program.savingsNote}
                      </p>
                    ) : null}
                  </>
                ) : program.discountBadge && program.hideDescription ? (
                  <p
                    className={cn(
                      "text-2xl font-bold tracking-tight transition-colors sm:text-3xl lg:text-4xl",
                    )}
                  >
                    {program.discountBadge}
                  </p>
                ) : (
                  <p className="whitespace-pre-line">{program.description}</p>
                )}
              </div>
            ) : null}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={rowId}
              initial={
                shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
              }
              animate={{ height: "auto", opacity: 1 }}
              exit={
                shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.38,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="overflow-hidden bg-foreground/[0.06]"
            >
              <div className="flex flex-col gap-12 border-t border-foreground/10 px-6 py-8 sm:px-8 lg:px-10">
                {panelBlocks.map((block, blockIndex) => (
                  <div
                    key={`${program.id}-panel-${blockIndex}`}
                    className="flex flex-col gap-8"
                  >
                    {block.heading ? (
                      <h3 className="border-b border-foreground/10 pb-2 font-heading text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
                        {block.heading}
                      </h3>
                    ) : null}
                    {block.sections.map((section) => (
                      <div key={`${block.heading}-${section.title}`}>
                        <h4 className="mb-3 font-heading text-[10px] uppercase tracking-[0.15em] text-foreground/50 sm:text-[11px]">
                          {section.title}
                        </h4>
                        <ul className="list-outside list-disc space-y-2 pl-4 marker:text-accent/80">
                          {section.items.map((item, itemIndex) => (
                            <li
                              key={`${section.title}-${itemIndex}`}
                              className="font-heading text-sm leading-relaxed text-foreground/90 sm:text-base"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}

                <Link
                  href={program.panelCta.href}
                  className="inline-flex w-fit items-center justify-center border border-accent bg-transparent px-6 py-3 font-heading text-[10px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xs"
                >
                  {program.panelCta.label}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideUp>
  );
}

export function ProgramsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <section
      id="programs"
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-24 xl:py-32"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-heading text-3xl leading-[1.05] font-bold uppercase sm:text-7xl lg:text-8xl xl:text-9xl">
            Pakiety
          </h2>

          <p className="max-w-xs font-heading text-[10px] uppercase tracking-[0.15em] text-foreground/80 text-right sm:text-[11px] lg:max-w-sm">
            Trening, dieta i regeneracja w jednym systemie.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 lg:mt-16">
          {programs.map((program, i) => {
            const isOpen = expandedId === program.id;
            const isDimmed = expandedId !== null && !isOpen;
            const rowId = `${baseId}-row-${program.id}`;
            const panelId = `${baseId}-panel-${program.id}`;

            return (
              <ProgramRow
                key={program.id}
                program={program}
                index={i}
                isOpen={isOpen}
                isDimmed={isDimmed}
                rowId={rowId}
                panelId={panelId}
                onToggle={() =>
                  setExpandedId((current) =>
                    current === program.id ? null : program.id,
                  )
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
