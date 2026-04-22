"use client";

import Link from "next/link";
import { SlideUp } from "@/components/animations/SlideUp";

interface StatTile {
  type: "stat";
  id: string;
  label: string;
  value: string;
  description: string;
}

interface CtaTile {
  type: "cta";
  id: string;
  href: string;
  text: string;
}

type Tile = StatTile | CtaTile;

const tiles: Tile[] = [
  {
    type: "stat",
    id: "01",
    label: "Analiza",
    value: "CEL",
    description: "Analiza celu, sylwetki i nawyków",
  },
  {
    type: "stat",
    id: "02",
    label: "Trening",
    value: "PLAN",
    description: "Programowanie pod konkretny efekt",
  },
  {
    type: "stat",
    id: "03",
    label: "Żywienie",
    value: "DIETA",
    description: "Kalorie, makro i dobór produktów",
  },
  {
    type: "stat",
    id: "04",
    label: "Regeneracja",
    value: "SEN",
    description: "Dziennik snu, CBT-I i suplementacja",
  },
  {
    type: "stat",
    id: "05",
    label: "Prowadzenie",
    value: "WYNIKI",
    description: "Stała kontrola i indywidualne korekty",
  },
  {
    type: "cta",
    id: "cta",
    href: "/formularz",
    text: "Zacznij teraz",
  },
];

const steps = [
  "Rozpoznanie potrzeb, możliwości i priorytetów",
  "Przygotowanie planu treningowego",
  "Kalibracja żywienia",
  "Wzmocnienie regeneracji i jakości snu",
  "Monitorowanie efektów i bieżąca optymalizacja",
] as const;

export function MethodSection() {
  return (
    <section
      id="section-proces"
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-24 xl:py-42"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="grid grid-cols-1 items-center gap-16 2xl:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="flex flex-col gap-10">
            <h2 className="font-heading text-5xl leading-[1.05] font-normal uppercase sm:text-7xl lg:text-8xl">
              <span className="block">Proces</span>
            </h2>

            <ul className="flex flex-col gap-3 font-heading text-[11px] uppercase tracking-[0.2em] text-foreground/80 sm:text-xs">
              {steps.map((step, i) => (
                <li key={i}>{`// 0${i + 1}. ${step}`}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tiles.map((tile, i) => (
              <SlideUp key={tile.id} delay={0.15 * i} triggerOnScroll>
                {tile.type === "stat" ? (
                  <div className="group min-w-[274px] rounded-lg border border-foreground/10 backdrop-blur-[2px] bg-foreground/[0.03] p-6 transition-colors lg:hover:border-foreground/20 sm:p-8">
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
                      {tile.id} / {tile.label}
                    </p>
                    <p className="py-6 font-heading text-5xl font-normal text-foreground transition-colors lg:group-hover:text-accent sm:text-6xl">
                      {tile.value}
                    </p>
                    <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-foreground/70 sm:text-xs">
                      {tile.description}
                    </p>
                  </div>
                ) : (
                  <Link
                    href={tile.href}
                    className="group flex h-full min-h-[180px] flex-col items-center justify-center gap-3 rounded-lg bg-accent p-6 transition-opacity lg:hover:opacity-90 sm:p-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-background"
                      aria-hidden="true"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span className="font-heading text-sm uppercase text-center tracking-[0.2em] text-background">
                      {tile.text}
                    </span>
                  </Link>
                )}
              </SlideUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
