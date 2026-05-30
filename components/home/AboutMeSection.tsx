"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Apple, Dumbbell, Moon } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { SlideUp } from "@/components/animations/SlideUp";

const pillars = [
  {
    title: "Trener personalny",
    description: "Plany treningowe dopasowane do Twojego celu i możliwości.",
    Icon: Dumbbell,
  },
  {
    title: "Dietetyka sportowa",
    description: "Odżywianie jako punkt wyjścia do lepszego funkcjonowania.",
    Icon: Apple,
  },
  {
    title: "Sen i regeneracja",
    description:
      "Wsparcie dla naszego układu nerwowego i przywrócenie naturalnego rytmu.",
    Icon: Moon,
  },
] as const;

const stats = [
  {
    value: "75%",
    description:
      "Fizjologii, anatomii, biomechaniki, badań naukowych i wiedzy popartej jasnymi, niepodważalnymi dowodami.",
  },
  {
    value: "25%",
    description:
      "Doświadczenia i własnej filozofii treningu opartego na mocnej podstawie naukowej.",
  },
  {
    value: "0%",
    description: '"wydaje mi się", "uważam", "na mnie działa"...',
  },
] as const;

function AnimatedPercentage({
  shouldAnimate,
  value,
}: {
  shouldAnimate: boolean;
  value: string;
}) {
  const targetValue = Number.parseInt(value, 10);
  const suffix = value.replace(`${targetValue}`, "");
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const valueToRender =
    targetValue === 0 || (prefersReducedMotion && shouldAnimate)
      ? targetValue
      : displayValue;

  useEffect(() => {
    if (targetValue === 0 || !shouldAnimate || prefersReducedMotion) {
      return;
    }

    let animationFrame = 0;
    const duration = 3000;
    const startTime = performance.now();

    const updateValue = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setDisplayValue(Math.round(targetValue * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };

    animationFrame = requestAnimationFrame(updateValue);

    return () => cancelAnimationFrame(animationFrame);
  }, [prefersReducedMotion, shouldAnimate, targetValue]);

  return (
    <>
      {valueToRender}
      {suffix}
    </>
  );
}

export function AboutMeSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { amount: 0.35, once: true });

  return (
    <section id="about-me" className="  px-6 py-24 sm:px-10 xl:pr-42 xl:py-32">
      <div className="mx-auto max-w-[1920px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 xl:gap-12">
          <SlideUp delay={0.1} triggerOnScroll className="flex justify-center">
            <div className="relative mx-auto w-full max-w-[520px] lg:mx-0">
              <div className="relative rounded-lg bg-foreground/[0.03] backdrop-blur-[2px]">
                <div className=" relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                  <Image
                    src="/images/mateusz_ratynski.png"
                    alt="Mateusz Ratyński"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-top mx-auto"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
                </div>

                {/* <div className="absolute left-3 bottom-5 z-10 flex flex-col items-start gap-2 sm:-left-4 sm:bottom-8">
                  {["Trening", "Dieta", "Sen"].map((item, index) => (
                    <div
                      key={item}
                      className={`min-w-36 border px-4 py-3 text-center font-heading text-[9px] uppercase tracking-[0.18em] shadow-lg shadow-background/20 sm:min-w-44 sm:text-[10px] ${
                        index === 0
                          ? "border-accent bg-accent text-background"
                          : "border-accent/50 bg-background/70 text-accent"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </SlideUp>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-5xl leading-[1.05] font-normal uppercase text-white sm:text-7xl lg:text-8xl xl:text-9xl">
                O mnie
              </h2>

              <div className="max-w-3xl">
                <p className="font-heading text-2xl leading-[calc(1.1em+20px)] font-bold uppercase text-foreground sm:text-5xl lg:text-3xl">
                  Kompleksowe podejście do Twojego{" "}
                  <span className="text-accent">zdrowia</span>
                </p>
                <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-foreground/75 sm:text-base">
                  Łączę trening, odżywianie i regenerację w jeden spójny system,
                  który pozwoli Ci poczuć się dobrze i mieć energię na każdy
                  dzień.
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit max-w-full items-center gap-3 border border-foreground/15 bg-foreground/[0.03] px-5 py-3 font-heading text-[10px] uppercase tracking-[0.18em] text-accent sm:text-xs">
              <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="min-w-0 leading-relaxed">
                Trener personalny, specjalista ds. żywienia i zdrowego trybu
                życia
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {pillars.map(({ title, description, Icon }, index) => (
                <SlideUp key={title} delay={0.1 * (index + 2)} triggerOnScroll>
                  <div className="group flex items-start gap-4 rounded-lg border border-foreground/10 bg-foreground/[0.03] p-5 backdrop-blur-[2px] transition-colors lg:hover:border-foreground/20">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-accent/12 text-accent transition-colors lg:group-hover:bg-accent lg:group-hover:text-background">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold uppercase text-foreground sm:text-base">
                        {title}
                      </h3>
                      <p className="mt-1 font-body text-xs leading-relaxed text-foreground/70 sm:text-sm">
                        {description}
                      </p>
                    </div>
                  </div>
                </SlideUp>
              ))}
            </div>

            <p className="max-w-2xl font-body text-sm leading-[1.9] text-foreground/78 sm:text-base">
              Wierzę, że{" "}
              <strong className="text-foreground">
                ciało działa jako całość
              </strong>
              : trening bez dobrego snu i odżywiania szybko trafia na ścianę.
              Przez lata pracy z podopiecznymi wypracowałem metodę, która łączy
              wszystkie trzy filary w{" "}
              <strong className="text-foreground">jeden skuteczny plan </strong>
              skrojony pod konkretną osobę.
            </p>

            <div
              ref={statsRef}
              className="grid w-full max-w-4xl grid-cols-1 gap-4 pt-18 sm:grid-cols-3"
            >
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="relative flex min-h-[210px] flex-col items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.03] px-5 pb-8 pt-14 text-center backdrop-blur-[2px] sm:min-h-[245px] lg:px-4 xl:px-6"
                >
                  <div className="absolute left-1/2 top-0 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent [clip-path:polygon(50%_0,100%_20%,94%_70%,50%_100%,6%_70%,0_20%)] sm:h-29 sm:w-29">
                    <span className="font-heading text-xl font-bold text-background lg:text-[22px]">
                      <AnimatedPercentage
                        shouldAnimate={statsInView}
                        value={stat.value}
                      />
                    </span>
                  </div>

                  <p className="font-body text-sm leading-relaxed text-foreground/85 sm:text-[13px] lg:text-sm">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
