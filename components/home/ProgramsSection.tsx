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
  // const tileDescription = program.hideDescription
  //   ? `Pakiet łączony w cenie ${program.price}${
  //       program.savingsNote ? `, ${program.savingsNote.toLowerCase()}` : ""
  //     }.`
  //   : program.description;

  const tileDescription = program.description;

  return (
    <SlideUp delay={0.1 * (index + 1)} triggerOnScroll>
      <div
        className={cn(
          "overflow-hidden rounded-lg border bg-foreground/[0.05] backdrop-blur-[2px] transition-[opacity,colors,border-color] duration-300",
          !isOpen &&
            program.accentBundle &&
            "border-accent/80 lg:hover:border-accent",
          !isOpen &&
            !program.accentBundle &&
            "border-foreground/10 lg:hover:border-foreground/20",
          isDimmed && "opacity-80 lg:hover:opacity-100",
        )}
      >
        <button
          type="button"
          id={rowId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "group/pkg relative w-full cursor-pointer bg-transparent px-6 py-6 text-left transition-colors duration-200 ease-out sm:px-8 sm:py-8 lg:px-10 lg:py-10",
            "min-h-[7.5rem] sm:min-h-[8.5rem]",
            !isOpen &&
              "lg:hover:bg-accent/[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            isOpen && "bg-foreground/[0.06] lg:hover:bg-foreground/[0.06]",
          )}
        >
          <div className="flex min-h-[4.5rem] flex-col gap-5">
            <span
              className={cn(
                "font-heading text-xs tracking-[0.2em] text-accent transition-colors duration-200 ease-out sm:text-sm",
                !isOpen && "lg:group-hover/pkg:text-[#111]",
                isOpen && "text-accent",
              )}
            >
              {program.id}
            </span>

            <div className={cn("flex min-w-0 items-center gap-4")}>
              <h3
                className={cn(
                  "min-w-0 flex-1 font-heading text-xl font-bold uppercase transition-colors duration-200 ease-out sm:text-3xl lg:text-4xl xl:text-5xl",
                  isOpen && "text-[#fff]",
                  !isOpen && "text-foreground lg:group-hover/pkg:text-[#111]",
                )}
              >
                {program.title}
              </h3>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 text-[20px] leading-none text-accent/70 transition-[opacity,transform,color] duration-200 ease-out",
                  "opacity-70 lg:group-hover/pkg:translate-x-[3px] lg:group-hover/pkg:opacity-100",
                  !isOpen && "lg:group-hover/pkg:text-[#111]",
                  isOpen && "opacity-100 text-accent",
                )}
              >
                ›
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <p
                className={cn(
                  "font-heading text-[10px] uppercase leading-relaxed tracking-[0.12em] text-foreground/90 transition-colors duration-200 ease-out sm:text-[11px]",
                  !isOpen && "lg:group-hover/pkg:text-[#111]",
                  isOpen && "text-foreground",
                )}
              >
                {tileDescription}
              </p>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={cn(
                    "h-px flex-1 bg-gradient-to-r transition-opacity duration-200 ease-out",
                    isOpen
                      ? "from-accent to-transparent opacity-60"
                      : "from-accent to-transparent opacity-35 lg:from-[#111] lg:group-hover/pkg:opacity-55",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-[0.2em] transition-[opacity,color] duration-200 ease-out lg:text-[11px]",
                    isOpen
                      ? "text-accent opacity-90"
                      : "text-accent opacity-65 lg:text-[#111] lg:group-hover/pkg:opacity-85",
                  )}
                >
                  SZCZEGÓŁY
                </span>
              </div>
            </div>
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
                  className="inline-flex w-fit items-center justify-center border border-accent bg-transparent px-6 py-3 font-heading text-[10px] uppercase tracking-[0.2em] text-accent transition-colors lg:hover:bg-accent lg:hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xs"
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
