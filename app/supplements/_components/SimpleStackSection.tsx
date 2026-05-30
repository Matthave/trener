import { SlideIn } from "@/components/animations/SlideIn";

import type {
  SimpleStack,
  SimpleStackChartCategoryKey,
  SimpleStackChartStack,
} from "../_data/simple-stacks-data";

interface SimpleStackSectionProps {
  stack: SimpleStack;
  rating?: SimpleStackChartStack;
  startIndex?: number;
}

const ratingRows: {
  key: Exclude<SimpleStackChartCategoryKey, "general">;
  label: string;
}[] = [
  { key: "fallingAsleep", label: "Zasypianie" },
  { key: "nightWakeups", label: "Wybudzenia" },
  { key: "antiStress", label: "Anty-stres" },
  { key: "antiAnxiety", label: "Anty-lęk" },
  { key: "antiNightmare", label: "Anty-koszmar" },
];

function formatScore(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function getProgressWidth(value: number) {
  return `${Math.min(100, Math.max(0, value * 10))}%`;
}

function withLowOpacity(color: string) {
  return color.startsWith("#") && color.length === 7 ? `${color}1F` : color;
}

function StackRatingCard({
  stack,
  rating,
}: {
  stack: SimpleStack;
  rating: SimpleStackChartStack;
}) {
  const ingredients = stack.items.map((item) => item.name);

  return (
    <div className="flex h-full flex-col rounded-xl border border-foreground/20 bg-background/70 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 font-body text-[10px] leading-none"
          style={{
            backgroundColor: withLowOpacity(rating.color),
            color: rating.color,
          }}
        >
          {rating.badgeLabel}
        </span>
        {rating.isNew && (
          <span className="rounded-full border border-accent/40 px-2.5 py-1 font-body text-[10px] leading-none text-accent">
            nowy
          </span>
        )}
      </div>

      <h3 className="font-heading text-[18px] leading-[1.25] text-foreground sm:text-[20px]">
        {rating.cardTitle}
      </h3>
      <p className="mt-2 font-body text-[12px] leading-[18px] text-foreground/60 sm:text-[13px] sm:leading-[20px]">
        {ingredients.join(" · ")}
      </p>

      <div className="mt-5">
        <p
          className="font-heading text-[34px] leading-none font-bold"
          style={{ color: rating.color }}
        >
          {formatScore(rating.scores.general)}/10
        </p>
        <p className="mt-1 font-body text-[11px] leading-none text-foreground/55">
          Ocena ogólna
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {ratingRows.map((row) => {
          const value = rating.scores[row.key];
          const barColor =
            row.key === "antiNightmare" && value < 5.5
              ? "#f87171"
              : rating.color;

          return (
            <div key={row.key} className="flex items-center gap-3">
              <span className="w-[92px] shrink-0 font-body text-[11px] leading-none text-foreground/60">
                {row.label}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/12">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: getProgressWidth(value),
                    backgroundColor: barColor,
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-mono text-[11px] leading-none text-foreground/80">
                {formatScore(value)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t border-foreground/10 pt-4">
        <p className="font-body text-[11px] leading-none text-foreground/55">
          Składniki
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-1 font-body text-[10px] leading-none text-foreground/70"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SimpleStackSection({
  stack,
  rating,
  startIndex = 0,
}: SimpleStackSectionProps) {
  return (
    <section className="mb-16 sm:mb-24">
      <div className="mb-8 sm:mb-12">
        <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
          {stack.title}
        </h2>
        <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
        {stack.items.map((item, index) => (
          <SlideIn
            key={`${stack.title}-${item.name}`}
            direction={(startIndex + index) % 2 === 0 ? "left" : "right"}
            delay={index * 0.05}
          >
            <div className="flex h-full flex-col rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6">
              <div className="flex justify-center items-center min-h-[57px]">
                <h3 className=" text-center font-heading text-[24px] leading-[1.2] text-foreground">
                  {item.name}
                </h3>
              </div>

              <div className="my-4 h-px w-full bg-foreground/20 sm:my-5" />

              <div className="flex flex-1 flex-col items-center text-center">
                <h4 className="font-heading text-[18px] leading-[1.3] text-accent">
                  Dawka
                </h4>
                <p className="mt-2 font-body text-[14px] leading-[22px] text-foreground/90">
                  {item.dosage}
                </p>
              </div>
            </div>
          </SlideIn>
        ))}

        {rating && (
          <SlideIn
            direction={
              (startIndex + stack.items.length) % 2 === 0 ? "left" : "right"
            }
            delay={stack.items.length * 0.05}
          >
            <StackRatingCard stack={stack} rating={rating} />
          </SlideIn>
        )}
      </div>
    </section>
  );
}
