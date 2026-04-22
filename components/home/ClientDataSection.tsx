"use client";

import { SlideUp } from "@/components/animations/SlideUp";

interface Stat {
  label: string;
  before: string;
  after: string;
  unit?: string;
}

interface ClientCase {
  subject: string;
  duration: string;
  stats: Stat[];
  quote: string;
}

const clients: ClientCase[] = [
  {
    subject: "Marcin",
    duration: "12 miesięcy",
    stats: [
      { label: "Waga", before: "140", after: "100", unit: "kg" },
      { label: "tkanka tłuszczowa", before: "45", after: "25", unit: "%" },
    ],
    quote:
      "Brutal but effective. The numbers don't lie. The approach is purely scientific.",
  },
  {
    subject: "Dominika",
    duration: "6 miesięcy",
    stats: [
      { label: "Waga", before: "55", after: "65", unit: "kg" },
      { label: "Hip Thrust", before: "40", after: "100", unit: "kg" },
    ],
    quote:
      "Complete paradigm shift in how I view training and nutrition. Zero wasted effort.",
  },
  {
    subject: "Dawid",
    duration: "6 miesięcy",
    stats: [
      { label: "Waga", before: "80", after: "70", unit: "kg" },
      { label: "Tkanka tłuszczowa", before: "30", after: "18", unit: "%" },
    ],
    quote: "The programming is meticulous. Every set and rep is accounted for.",
  },
  {
    subject: "Sylwester",
    duration: "8 miesięcy",
    stats: [
      { label: "Waga", before: "70", after: "83", unit: "kg" },
      { label: "Wyciskanie klatka", before: "40", after: "80", unit: "kg" },
    ],
    quote:
      "Brutal but effective. The numbers don't lie. The approach is purely scientific.",
  },
  {
    subject: "Robert",
    duration: "12 miesięcy",
    stats: [
      { label: "Waga", before: "68", after: "78", unit: "kg" },
      { label: "Obwód ramienia", before: "31", after: "38", unit: "cm" },
    ],
    quote:
      "Complete paradigm shift in how I view training and nutrition. Zero wasted effort.",
  },
  {
    subject: "Patrycja",
    duration: "6 miesięcy",
    stats: [
      { label: "Waga", before: "60", after: "53", unit: "kg" },
      { label: "Tkanka tłuszczowa", before: "28", after: "22", unit: "%" },
    ],
    quote: "The programming is meticulous. Every set and rep is accounted for.",
  },
];

export function ClientDataSection() {
  return (
    <section
      id="section-opinie"
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-24 xl:py-32"
    >
      <div className="mx-auto max-w-[1920px]">
        <h2 className="text-right font-heading text-4xl font-bold uppercase sm:text-6xl lg:text-7xl xl:text-9xl leading-[1.3]">
          Opinie <span className="block">klientów</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {clients.map((client, i) => (
            <SlideUp
              key={client.subject}
              delay={0.05 * (i + 1)}
              triggerOnScroll
            >
              <div className="relative overflow-hidden min-h-[236px] backdrop-blur-[2px] rounded-lg border border-foreground/10 bg-foreground/[0.03] p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-accent/15 sm:h-40 sm:w-40"
                />

                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
                  Oceniający: {client.subject} / {client.duration}
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  {client.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="font-heading text-[11px] uppercase tracking-[0.15em] text-foreground/70 sm:text-xs">
                        {stat.label}
                      </span>
                      <span className="font-heading text-sm text-foreground sm:text-base">
                        {stat.before}
                        <span className="mx-1.5 text-foreground/30">→</span>
                        {stat.after}
                        {stat.unit && (
                          <span className="ml-1 text-foreground/50">
                            {stat.unit}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 font-body text-xs italic leading-relaxed text-foreground/80 sm:text-sm">
                  &ldquo;{client.quote}&rdquo;
                </p>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
