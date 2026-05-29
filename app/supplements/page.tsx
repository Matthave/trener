import type { Metadata } from "next";
import Link from "next/link";
import { SlideIn } from "@/components/animations/SlideIn";
import { EffectsText } from "./_components/EffectsText";
import { SimpleStackSection } from "./_components/SimpleStackSection";
import {
  supplements,
  effectCategories,
  bibliography,
} from "./_data/supplements-data";
import { simpleStacks } from "./_data/simple-stacks-data";
import { sleepStackItems } from "./_data/sleep-stack-data";

export const metadata: Metadata = {
  title: "Suplementacja snu | Trener Personalny",
  description:
    "Kompleksowy przewodnik po suplementach wspierających jakość snu, regenerację i redukcję stresu.",
};

export default function SupplementsPage() {
  return (
    <>
      <Link
        href="/"
        className="fixed top-6 left-6 z-30 border border-foreground/60 bg-background/60 px-5 py-2 font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-accent hover:text-accent sm:top-8 sm:left-8 sm:px-6 sm:py-3 sm:text-xs"
      >
        Powrót
      </Link>

      <main className="overflow-hidden px-6 py-20 sm:px-10 lg:px-16 xl:px-24 xl:py-28">
        <article className="mx-auto max-w-[1180px]">
          {/* Header */}
          <header className=" mb-10 max-w-[860px] scroll-mt-6 sm:mb-16">
            <p className="mb-5 font-heading text-[10px] uppercase tracking-[0.25em] text-accent sm:text-xs">
              Suplementacja
            </p>
            <h1 className="font-heading text-[26px] leading-[1.1] font-normal uppercase text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Ultimate Sleep 1.0
            </h1>
            <p className="mt-5 max-w-[680px] font-body text-[15px] leading-[26px] text-foreground/80 sm:mt-6 sm:text-[16px] sm:leading-[28px]">
              Kompleksowy przewodnik po suplementach wspierających jakość snu,
              regenerację i redukcję stresu. Opracowany na podstawie badań
              naukowych.
            </p>
          </header>

          {/* Ultimate Sleep Stack */}
          <section className="mb-16 sm:mb-24">
            <div className="mb-8 sm:mb-12">
              <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
                Ultimate Sleep Stack
              </h2>
              <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
              <p className="mt-4 font-body text-[14px] leading-[24px] text-foreground/70 sm:text-[15px] sm:leading-[26px]">
                Jeśli chcesz wypróbować kompleksową suplementację
              </p>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7">
              {supplements.map((supplement, index) => (
                <SlideIn
                  key={supplement.name}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 0.05}
                >
                  <div className="group h-full rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] transition-all duration-300 hover:border-accent/40 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading text-[16px] leading-[1.3] text-foreground sm:text-[18px]">
                          {supplement.name}
                        </h3>
                        {supplement.warning && (
                          <p className="mt-2 font-body text-[11px] leading-[18px] text-accent/80 sm:text-[12px]">
                            {supplement.warning}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0 rounded-[2px] bg-foreground/5 px-2.5 py-1 font-body text-[10px] leading-[1.4] text-foreground/100 sm:text-[11px]">
                        {supplement.dosage}
                      </div>
                    </div>
                    {supplement.url && (
                      <a
                        href={supplement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 font-body text-[12px] leading-[1.4] text-accent/70 transition-colors hover:text-accent sm:text-[13px]"
                      >
                        <span>Link do produktu</span>
                        <svg
                          className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </SlideIn>
              ))}
            </div>
          </section>

          {simpleStacks.map((stack, index) => (
            <SimpleStackSection
              key={stack.title}
              stack={stack}
              startIndex={index * stack.items.length}
            />
          ))}

          {/* Sleep-Stack Table Section */}
          <section className="mb-16 sm:mb-24">
            <div className="mb-8 sm:mb-12">
              <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
                Sleep-Stack: Tabelka dawek i efektów w badaniach
              </h2>
              <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
            </div>

            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:gap-7">
              {sleepStackItems.map((item, index) => (
                <SlideIn
                  key={item.name}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 0.03}
                >
                  <div className="flex h-full flex-col rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6">
                    <h3 className="font-heading text-[24px] leading-[1.2] text-foreground">
                      {item.name}
                    </h3>

                    <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
                      <div>
                        <h4 className="font-heading text-[18px] leading-[1.3] text-accent">
                          Dawka
                        </h4>
                        <p className="mt-1.5 font-body text-[14px] leading-[22px] text-foreground/90">
                          {item.dosage}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-heading text-[18px] leading-[1.3] text-accent">
                          Dawka stosowana w badaniach
                        </h4>
                        <p className="mt-1.5 font-body text-[14px] leading-[22px] text-foreground/90">
                          {item.studyDosage}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-heading text-[18px] leading-[1.3] text-accent">
                          Efekty według badań
                        </h4>
                        <div className="mt-1.5">
                          <EffectsText text={item.effects} />
                        </div>
                      </div>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </section>

          {/* Effects Section */}
          <section className="mb-16 sm:mb-24">
            <div className="mb-8 sm:mb-12">
              <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
                Toplista efektów
              </h2>
              <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
              <p className="mt-4 font-body text-[14px] leading-[24px] text-foreground/70 sm:text-[15px] sm:leading-[26px]">
                Ranking skuteczności suplementów w poszczególnych kategoriach na
                podstawie badań naukowych
              </p>
            </div>

            <div className="flex flex-col gap-8 sm:gap-10">
              {effectCategories.map((category, categoryIndex) => (
                <SlideIn
                  key={category.category}
                  direction={categoryIndex % 2 === 0 ? "left" : "right"}
                  delay={categoryIndex * 0.03}
                >
                  <div className="rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-7">
                    <h3 className="mb-4 font-heading text-[18px] leading-[1.5] text-accent sm:mb-5 sm:text-[18px]">
                      {category.category}
                    </h3>
                    <ol className="flex flex-col gap-2.5 sm:gap-3">
                      {category.items.map((item, index) => (
                        <li
                          key={`${item.supplement}-${index}`}
                          className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-2.5 font-body text-[16px] leading-[2] text-foreground/90 last:border-0 sm:text-[16px]"
                        >
                          <span className="flex-1">
                            <span className="mr-2 text-foreground/50">
                              {index + 1}.
                            </span>
                            {item.supplement}
                          </span>
                          <span className="flex-shrink-0 font-mono text-[16px] text-accent/80 sm:text-[16px]">
                            {item.effect}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </SlideIn>
              ))}
            </div>
          </section>

          {/* Bibliography */}
          <section className="mb-10">
            <div className="mb-6 sm:mb-8">
              <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
                Bibliografia
              </h2>
              <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
            </div>

            <div className="rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-7">
              <ol className="flex flex-col gap-4 sm:gap-5">
                {bibliography.map((ref, index) => (
                  <li
                    key={index}
                    className="flex gap-3 border-b border-foreground/10 pb-4 font-body text-[12px] leading-[20px] text-foreground/70 last:border-0 last:pb-0 sm:text-[13px] sm:leading-[22px]"
                  >
                    <span className="flex-shrink-0 font-mono text-accent/60">
                      [{index + 1}]
                    </span>
                    <span className="flex-1">{ref}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
