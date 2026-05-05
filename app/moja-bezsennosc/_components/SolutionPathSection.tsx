"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

const TILES = [
  {
    title: "Terapia CBT-I",
    paragraphs: [
      "Podjęcie terapii poznawczo-behawioralnej pozwoliło mi zamienić lęk na konkretne narzędzia i techniki pracy ze snem. Wprowadzenie dziennika snu oraz rygorystycznego okna czasowego pomogło odbudować mój naturalny rytm dobowy. Zastosowanie zasady wychodzenia z łóżka przerwało błędne koło frustracji i lęku przed czuwaniem w nocy. Zaufałem procesowi, który choć wymagał czasu i dyscypliny, przyniósł trwałą stabilizację.",
      ,
    ],
  },
  {
    title: "Zmiana perspektywy",
    paragraphs: [
      "Przełomem było uświadomienie sobie, że przyczyna moich problemów nie jest organiczna, lecz tkwi w przeciążonym układzie nerwowym. Dzięki edukacji i wartościowym materiałom, przestałem obsesyjnie szukać groźnych chorób w Google. Zrozumienie mechanizmów lęku pozwoliło mi przestać walczyć z własnym ciałem i zaakceptować proces leczenia. Odpuszczenie kontroli okazało się pierwszym krokiem do odzyskania spokoju.",
    ],
  },
  {
    title: "Higiena wyciszenia",
    paragraphs: [
      "Zbudowałem autorski rytuał wieczorny, który stał się moją bezpieczną przystanią i sygnałem dla organizmu, że czas na odpoczynek. Obejmuje on medytację, rezygnację z ekranów oraz czytanie książek przy przygaszonym, ciepłym świetle. Całość uzupełniłem celowaną suplementacją, m.in. magnezem i ziołowymi naparami, które wspierają naturalne wyciszenie. Dzięki tej systematyczności, do moich wieczorów wróciła dawno niewidziana, przyjemna senność.",
    ],
  },

  {
    title: "Wsparcie bliskich",
    paragraphs: [
      "Obecność partnerki i rozmowy z przyjaciółmi stały się filtrem, który oddzielał moje lękowe wizje od rzeczywistości. Dzielenie się swoimi obawami pozwoliło mi wyjść z izolacji i poczucia, że jestem w tej walce zupełnie sam. Bliscy pomagali mi racjonalizować czarne scenariusze i byli nieocenionym wsparciem w momentach największego kryzysu. To poczucie bezpieczeństwa w relacjach stało się kluczowym elementem mojej drogi do zdrowienia.",
    ],
  },
  {
    title: "Biohacking",
    paragraphs: [
      "Włączenie Oura Ring do rutyny pozwoliło mi na precyzyjne monitorowanie poziomu stresu i regeneracji. Dzięki twardym danym o momencie zasypiania i długości wybudzeń przestałem opierać się na domysłach, zyskując realną kontrolę nad przywróceniem snu.",
      "Moje HRV wzrosło z 40ms do 70ms (osiągając czasem nawet 120ms), a tętno w nocy spadło poniżej 50 bpm. Obserwowanie tych poprawiających się parametrów dawało mi ogromną satysfakcję i stanowiło silny bodziec motywujący do dalszej pracy nad sobą.",
    ],
  },
  {
    title: "Farmakoterapia",
    paragraphs: [
      "Zrozumiałem, że farmakoterapia wcale nie jest powodem do wstydu ani pójściem na skróty, o ile jest stosowana jako element przemyślanego planu. Leki stały się dla mnie pomostem, który pozwolił mi przetrwać najtrudniejszy etap, gdy lęk i wyczerpanie uniemożliwiały racjonalne działanie.",
      "Kupując mi cenny czas i odrobinę wytchnienia, umożliwiły spokojne wprowadzenie metod wymagających cierpliwości, takich jak terapia CBT-I czy zmiana nawyków. Dzięki nim ustabilizowałem układ nerwowy na tyle, by móc z czasem bezpiecznie odstawić wsparcie i wrócić do naturalnego rytmu.",
    ],
  },
];

const CORNER_RADIUS = 60;
const ACCENT = "#9FC6FF";
const DIM_ACCENT = "rgba(159, 198, 255, 0.12)";
const DOT_R = 15;
const STROKE_W = 4;

interface DotPos {
  x: number;
  y: number;
}

function piecewiseLerp(
  value: number,
  input: number[],
  output: number[],
): number {
  if (input.length < 2) return value;
  if (value <= input[0]) return output[0];
  if (value >= input[input.length - 1]) return output[output.length - 1];
  for (let i = 0; i < input.length - 1; i++) {
    if (value <= input[i + 1]) {
      const t = (value - input[i]) / (input[i + 1] - input[i]);
      return output[i] + t * (output[i + 1] - output[i]);
    }
  }
  return output[output.length - 1];
}

function PathDot({
  cx,
  cy,
  progress,
  threshold,
  reducedMotion,
}: {
  cx: number;
  cy: number;
  progress: MotionValue<number>;
  threshold: number;
  reducedMotion: boolean | null;
}) {
  const fadeStart = Math.max(0, threshold - 0.05);
  const fadeEnd = Math.max(fadeStart + 0.01, threshold);

  const opacity = useTransform(
    progress,
    [fadeStart, fadeEnd],
    reducedMotion ? [1, 1] : [0, 1],
  );
  const glowOpacity = useTransform(opacity, (v) => v * 0.25);
  const highlightOpacity = useTransform(opacity, (v) => v * 0.5);

  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={DOT_R + 6}
        fill={ACCENT}
        style={{ opacity: glowOpacity }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={DOT_R}
        fill={ACCENT}
        style={{ opacity }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={3.5}
        fill="#fff"
        style={{ opacity: highlightOpacity }}
      />
    </g>
  );
}

function buildPath(dots: DotPos[]): string {
  if (dots.length < 2) return "";

  let d = `M ${dots[0].x} ${dots[0].y}`;

  for (let i = 0; i < dots.length - 1; i++) {
    const curr = dots[i];
    const next = dots[i + 1];
    const dx = next.x - curr.x;

    if (Math.abs(dx) < 1) {
      d += ` L ${next.x} ${next.y}`;
      continue;
    }

    const midY = (curr.y + next.y) / 2;
    const dir = dx > 0 ? 1 : -1;
    const r = Math.min(CORNER_RADIUS, Math.abs(dx) / 2, (next.y - curr.y) / 4);

    d += ` L ${curr.x} ${midY - r}`;
    d += ` Q ${curr.x} ${midY} ${curr.x + dir * r} ${midY}`;
    d += ` L ${next.x - dir * r} ${midY}`;
    d += ` Q ${next.x} ${midY} ${next.x} ${midY + r}`;
    d += ` L ${next.x} ${next.y}`;
  }

  return d;
}

export function SolutionPathSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [pathD, setPathD] = useState("");
  const [dots, setDots] = useState<DotPos[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [pathFractions, setPathFractions] = useState<number[]>([]);

  const reducedMotion = useReducedMotion();
  const mappingRef = useRef({ inputs: [0, 1], outputs: [0, 1] });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const draw = useTransform(scrollYProgress, (val) =>
    reducedMotion
      ? 1
      : piecewiseLerp(
          val,
          mappingRef.current.inputs,
          mappingRef.current.outputs,
        ),
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const cr = container.getBoundingClientRect();
    const sr = section.getBoundingClientRect();
    const positions: DotPos[] = [];

    for (const marker of markerRefs.current) {
      if (!marker) continue;
      const mr = marker.getBoundingClientRect();
      positions.push({
        x: mr.left - cr.left + mr.width / 2,
        y: mr.top - cr.top + mr.height / 2,
      });
    }

    if (positions.length < 2) return;

    setSize({ w: cr.width, h: cr.height });
    setDots(positions);
    setPathD(buildPath(positions));

    const segLengths: number[] = [];
    for (let i = 0; i < positions.length - 1; i++) {
      segLengths.push(
        Math.abs(positions[i + 1].y - positions[i].y) +
          Math.abs(positions[i + 1].x - positions[i].x),
      );
    }
    const totalLen = segLengths.reduce((a, b) => a + b, 0);

    const fractions = [0];
    let cum = 0;
    for (const len of segLengths) {
      cum += len;
      fractions.push(cum / totalLen);
    }
    setPathFractions(fractions);

    const containerOffset = cr.top - sr.top;
    const sectionH = sr.height;
    const vh = window.innerHeight;

    const scrollInputs = positions.map((pos) =>
      Math.max(
        0,
        Math.min(
          1,
          (containerOffset + pos.y + 0.3 * vh) / (sectionH + 0.6 * vh),
        ),
      ),
    );

    mappingRef.current = { inputs: scrollInputs, outputs: fractions };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(measure);

    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure]);

  return (
    <section
      id="insomnia-mapa-sukcesu"
      ref={sectionRef}
      className="mx-auto max-w-[1180px] scroll-mt-6 pb-20 sm:pb-42"
    >
      <h2 className="font-heading text-[26px] leading-[1.1] font-normal uppercase text-foreground py-16 sm:py-20 sm:text-5xl md:text-6xl lg:text-7xl">
        Co było rozwiązaniem?
      </h2>

      <div ref={containerRef} className="relative">
        {pathD && size.w > 0 && (
          <svg
            className="pointer-events-none absolute inset-0 z-0 overflow-visible"
            width={size.w}
            height={size.h}
            fill="none"
            aria-hidden="true"
          >
            <path
              d={pathD}
              stroke={DIM_ACCENT}
              strokeWidth={STROKE_W}
              strokeLinecap="round"
            />

            <motion.path
              d={pathD}
              stroke={ACCENT}
              strokeWidth={STROKE_W}
              strokeLinecap="round"
              style={{ pathLength: draw }}
            />

            {dots.map((dot, i) => (
              <PathDot
                key={i}
                cx={dot.x}
                cy={dot.y}
                progress={draw}
                threshold={pathFractions[i] ?? 0}
                reducedMotion={reducedMotion}
              />
            ))}
          </svg>
        )}

        <div className="relative z-10 flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {TILES.map((tile, i) => {
            const isRight = i % 2 !== 0;

            return (
              <div
                key={i}
                className={cn(
                  "flex w-full",
                  isRight ? "justify-end" : "justify-start",
                )}
              >
                <div className="relative w-[85%] sm:w-[75%] md:w-[65%] lg:w-[58%]">
                  <div
                    ref={(el) => {
                      markerRefs.current[i] = el;
                    }}
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2",
                      isRight ? "left-[-34px]" : "right-[-34px]",
                    )}
                    style={{ width: 1, height: 1 }}
                  />

                  <aside
                    className={cn(
                      "rounded-[4px] border border-foreground/20 bg-background/95 px-6 py-7 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] bg-opacity-50 sm:px-10 sm:py-8",
                      isRight ? "text-right" : "text-left",
                    )}
                  >
                    <h3 className="font-heading text-[20px] leading-[1.2] font-normal text-foreground sm:text-[26px] md:text-[32px]">
                      {tile.title}
                    </h3>
                    <div
                      className={cn(
                        "mt-2 h-px w-full max-w-[200px] bg-accent sm:mt-3 sm:max-w-[300px] lg:max-w-[420px]",
                        isRight ? "ml-auto" : "mr-auto",
                      )}
                    />
                    <div className="mt-5 flex flex-col gap-4 font-heading text-[14px] leading-[22px] text-foreground sm:mt-7 sm:gap-5 sm:text-[16px] sm:leading-[25px]">
                      {tile.paragraphs.map((p) => (
                        <p className="font-body" key={p}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
