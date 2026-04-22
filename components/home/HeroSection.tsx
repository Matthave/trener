"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SlideUp } from "@/components/animations/SlideUp";

const BASE_DELAY = 0.1;
const STAGGER = 0.15;
const DURATION = 0.7;
const EASE = [0.4, 0, 0.2, 1] as const;

function stepDelay(step: number) {
  return BASE_DELAY + STAGGER * step;
}

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  const headingWord = (step: number) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: {
      duration: prefersReduced ? 0 : DURATION,
      delay: prefersReduced ? 0 : stepDelay(step),
      ease: EASE,
    },
  });

  return (
    <section
      id="section-start"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20"
    >
      <div className="flex max-w-4xl flex-col items-center gap-8 text-center">
        <SlideUp delay={stepDelay(0)} triggerOnScroll>
          <p className="font-heading text-[10px] uppercase tracking-[0.35em] text-foreground/80 sm:text-xs">
            Trening * Dieta * Sen
          </p>
        </SlideUp>

        <h1 className="flex flex-col font-heading text-4xl leading-[1.5] font-normal uppercase sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl xl:leading-[1.2]">
          <motion.span {...headingWord(1)} className="hero-text-outline block">
            Zdobądź
          </motion.span>
          <motion.span
            {...headingWord(2)}
            className="hero-text-gradient block sm:inline"
          >
            wyższy
          </motion.span>
          <motion.span
            {...headingWord(3)}
            className="hero-text-outline block sm:inline"
          >
            {" "}
            Poziom
          </motion.span>
          <motion.span
            {...headingWord(4)}
            className="hero-text-gradient block sm:inline"
          >
            formy
          </motion.span>
        </h1>

        <SlideUp delay={stepDelay(5)} triggerOnScroll>
          <p className="mx-auto max-w-lg font-body text-sm leading-relaxed text-foreground/70 sm:text-base">
            Spersonalizowane podejście treningowe stworzone z myślą o osobach,
            które stawiają na realne efekty i najwyższe standardy.
          </p>
        </SlideUp>

        <SlideUp delay={stepDelay(6)} triggerOnScroll>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
              >
                Zacznij już dziś
                <span aria-hidden="true">&raquo;</span>
              </a>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("programs")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center rounded-full border border-foreground/30 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/60"
              >
                Zobacz pakiety
              </a>
            </div>

            <div
              aria-hidden="true"
              className="h-[2px] w-32 rounded-full bg-gradient-to-r from-transparent via-amber-500/80 to-transparent"
            />
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
