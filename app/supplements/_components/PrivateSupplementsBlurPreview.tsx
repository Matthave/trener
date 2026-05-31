import Link from "next/link";
import {
  simpleStackChartCategories,
  simpleStackChartStacks,
} from "../_data/simple-stacks-data";
import { SleepStackTableSection } from "./SleepStackTableSection";
import { SimpleStacksChart } from "./SimpleStacksChart";

interface MockStackItem {
  name: string;
  dosage: string;
}

interface MockStackSection {
  title: string;
  items: MockStackItem[];
  rating: {
    badgeLabel: string;
    cardTitle: string;
    color: string;
    ingredients: string[];
    scores: {
      label: string;
      value: number;
    }[];
  };
}

interface RealStackSection {
  title: string;
  items: MockStackItem[];
  rating: {
    badgeLabel: string;
    cardTitle: string;
    color: string;
    scores: {
      general: number;
      fallingAsleep: number;
      nightWakeups: number;
      antiStress: number;
      antiAnxiety: number;
      antiNightmare: number;
    };
  };
}

const realStackSection: RealStackSection = {
  title: "Ultimate sleep stack 1",
  items: [
    { name: "Glicyna", dosage: "5g przed spaniem" },
    { name: "GABA", dosage: "1000mg przed spaniem" },
    { name: "Glicynian Magnezu", dosage: "400mg przed spaniem" },
    { name: "Cynk", dosage: "15mg przed spaniem" },
    {
      name: "Ashwaganda",
      dosage: "200mg - 10% witanolidów przed spaniem",
    },
    { name: "Tryptofan", dosage: "1g przed spaniem" },
    { name: "Melatonina IR", dosage: "2mg 15-30 min przed spaniem" },
  ],
  rating: {
    badgeLabel: "Zasypianie + stres",
    cardTitle: "Stack 1 — Zasypianie + stres",
    color: "#9FC6FF",
    scores: {
      general: 7.5,
      fallingAsleep: 8.5,
      nightWakeups: 6.5,
      antiStress: 8.0,
      antiAnxiety: 7.8,
      antiNightmare: 4.5,
    },
  },
};

const mockStackSections: MockStackSection[] = [
  {
    title: "Targeted supplement stack - Anty-lęk",
    items: [
      { name: "Komponent alfa", dosage: "4g przed snem" },
      { name: "Formuła beta", dosage: "800mg wieczorem" },
      { name: "Minerał aktywny", dosage: "350mg przed snem" },
      { name: "Ekstrakt roślinny", dosage: "250mg wieczorem" },
      { name: "Aminokwas nocny", dosage: "1g przed snem" },
      { name: "Regulator rytmu", dosage: "2mg 20 min przed snem" },
    ],
    rating: {
      badgeLabel: "Anty-lęk",
      cardTitle: "Targeted Anty-lęk",
      color: "#BF4F2A",
      ingredients: ["Komponent alfa", "Formuła beta", "Minerał aktywny"],
      scores: [
        { label: "Zasypianie", value: 7.8 },
        { label: "Wybudzenia", value: 7.0 },
        { label: "Anty-stres", value: 8.0 },
        { label: "Anty-lęk", value: 7.9 },
        { label: "Anty-koszmar", value: 7.3 },
      ],
    },
  },
  {
    title: "Ultimate Sleep Stack - Wybudzenia",
    items: [
      { name: "Składnik wyciszający", dosage: "3g przed snem" },
      { name: "Chelat mineralny", dosage: "400mg wieczorem" },
      { name: "Ekstrakt owocowy", dosage: "200mg przed snem" },
      { name: "Fosfolipid nocny", dosage: "250mg wieczorem" },
      { name: "Wsparcie regeneracji", dosage: "2g przed snem" },
      { name: "Składnik wyciszający", dosage: "3g przed snem" },
    ],
    rating: {
      badgeLabel: "Wybudzenia/Utrzymanie snu",
      cardTitle: "Stack 2 — utrzymanie snu",
      color: "#2468A8",
      ingredients: ["Składnik wyciszający", "Chelat mineralny", "Ekstrakt"],
      scores: [
        { label: "Zasypianie", value: 7.0 },
        { label: "Wybudzenia", value: 9.3 },
        { label: "Anty-stres", value: 8.2 },
        { label: "Anty-lęk", value: 6.5 },
        { label: "Anty-koszmar", value: 5.2 },
      ],
    },
  },
];

const mockChartCategories = [
  "Ogólna",
  "Zasypianie",
  "Wybudzenia",
  "Anty-stres",
  "Anty-lęk",
  "Anty-koszmar",
];

const mockChartStacks = [
  { name: "Stack 1", color: "#9FC6FF", value: 72 },
  { name: "Stack 2", color: "#0F5F50", value: 82 },
  { name: "Stack 3", color: "#A56A14", value: 66 },
  { name: "Stack 4", color: "#B53F69", value: 78 },
  { name: "Anty-Stress", color: "#7269BD", value: 88 },
  { name: "Anty-lęk", color: "#BF4F2A", value: 81 },
  { name: "Anty-koszmar", color: "#78766D", value: 74 },
  { name: "Wybudzenia", color: "#2468A8", value: 90 },
  { name: "Zasypianie", color: "#07884C", value: 84 },
];

const mockEffectCategories = [
  {
    category: "Poprawa jakości snu",
    items: [
      { supplement: "Komponent alfa", effect: "↑ 15 - 25%" },
      { supplement: "Formuła beta", effect: "↑ 10 - 20%" },
      { supplement: "Ekstrakt nocny", effect: "↑ 10 - 25%" },
      { supplement: "Ekstrakt nocny", effect: "↑ 5 - 15%" },
      { supplement: "Ekstrakt nocny", effect: "↑ 5 - 15%" },
      { supplement: "Ekstrakt nocny", effect: "↑ 5 - 10%" },
      { supplement: "Ekstrakt nocny", effect: "↑ 5 - 10%" },
      { supplement: "Ekstrakt nocny", effect: "↑ 5 - 10%" },
      { supplement: "Ekstrakt nocny", effect: "↑ 5 - 10%" },
      { supplement: "Ekstrakt nocny", effect: "↑ 5 - 10%" },
    ],
  },
  {
    category: "Wydłużenie czasu snu",
    items: [
      { supplement: "Minerał aktywny", effect: "↑ 5 - 15%" },
      { supplement: "Aminokwas nocny", effect: "↑ 5 - 15%" },
      { supplement: "Roślinny ekstrakt", effect: "↑ 5 - 10%" },
      { supplement: "Roślinny ekstrakt", effect: "↑ 5 - 10%" },
    ],
  },
];

const mockBibliography = [
  "Autor A., Autor B. Randomizowane badanie kontrolowane dotyczące jakości snu i markerów regeneracji. Journal of Sleep Review, 2022.",
  "Autor C., Autor D. Przegląd systematyczny interwencji wspierających rytm dobowy i długość snu. Clinical Recovery Reports, 2021.",
  "Autor E., Autor F. Analiza wpływu strategii wieczornych na subiektywną jakość wypoczynku. Nutrition and Rest, 2020.",
  "Autor G., Autor H. Metaanaliza badań nad snem, stresem oraz regeneracją nocną u dorosłych. Sleep Science Notes, 2019.",
  "Autor A., Autor B. Randomizowane badanie kontrolowane dotyczące jakości snu i markerów regeneracji. Journal of Sleep Review, 2022.",
  "Autor C., Autor D. Przegląd systematyczny interwencji wspierających rytm dobowy i długość snu. Clinical Recovery Reports, 2021.",
  "Autor E., Autor F. Analiza wpływu strategii wieczornych na subiektywną jakość wypoczynku. Nutrition and Rest, 2020.",
  "Autor G., Autor H. Metaanaliza badań nad snem, stresem oraz regeneracją nocną u dorosłych. Sleep Science Notes, 2019.",
  "Autor A., Autor B. Randomizowane badanie kontrolowane dotyczące jakości snu i markerów regeneracji. Journal of Sleep Review, 2022.",
  "Autor G., Autor H. Metaanaliza badań nad snem, stresem oraz regeneracją nocną u dorosłych. Sleep Science Notes, 2019.",
  "Autor A., Autor B. Randomizowane badanie kontrolowane dotyczące jakości snu i markerów regeneracji. Journal of Sleep Review, 2022.",
  "Autor C., Autor D. Przegląd systematyczny interwencji wspierających rytm dobowy i długość snu. Clinical Recovery Reports, 2021.",
  "Autor E., Autor F. Analiza wpływu strategii wieczornych na subiektywną jakość wypoczynku. Nutrition and Rest, 2020.",
  "Autor A., Autor B. Randomizowane badanie kontrolowane dotyczące jakości snu i markerów regeneracji. Journal of Sleep Review, 2022.",
  "Autor C., Autor D. Przegląd systematyczny interwencji wspierających rytm dobowy i długość snu. Clinical Recovery Reports, 2021.",
  "Autor E., Autor F. Analiza wpływu strategii wieczornych na subiektywną jakość wypoczynku. Nutrition and Rest, 2020.",
  "Autor G., Autor H. Metaanaliza badań nad snem, stresem oraz regeneracją nocną u dorosłych. Sleep Science Notes, 2019.",
  "Autor E., Autor F. Analiza wpływu strategii wieczornych na subiektywną jakość wypoczynku. Nutrition and Rest, 2020.",
  "Autor G., Autor H. Metaanaliza badań nad snem, stresem oraz regeneracją nocną u dorosłych. Sleep Science Notes, 2019.",
  "Autor C., Autor D. Przegląd systematyczny interwencji wspierających rytm dobowy i długość snu. Clinical Recovery Reports, 2021.",
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

function BlurShell({
  children,
  blur = 2,
}: {
  children: React.ReactNode;
  blur?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none select-none p-2"
        style={{ filter: `blur(${blur}px)` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
    </div>
  );
}

function AccessCta({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/#contact"
      className={`absolute z-10 inline-flex rounded-[4px] border border-accent bg-accent/85 px-5 py-3 text-center font-heading text-[10px] uppercase tracking-[0.18em] text-[#111] shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:bg-[#111]/75 hover:text-accent sm:px-6 sm:text-xs ${className}`}
    >
      {children}
    </Link>
  );
}

function MockStackRatingCard({ section }: { section: MockStackSection }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-foreground/20 bg-background/70 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 font-body text-[10px] leading-none"
          style={{
            backgroundColor: withLowOpacity(section.rating.color),
            color: section.rating.color,
          }}
        >
          {section.rating.badgeLabel}
        </span>
      </div>

      <h3 className="font-heading text-[18px] leading-[1.25] text-foreground sm:text-[20px]">
        {section.rating.cardTitle}
      </h3>
      <BlurShell blur={3}>
        <p className="mt-2 font-body text-[12px] leading-[18px] text-foreground/60 sm:text-[13px] sm:leading-[20px]">
          {section.rating.ingredients.join(" · ")}
        </p>
      </BlurShell>
      <div className="mt-5">
        <p
          className="font-heading text-[34px] leading-none font-bold"
          style={{ color: section.rating.color }}
        >
          {formatScore(8.2)}/10
        </p>
        <p className="mt-1 font-body text-[11px] leading-none text-foreground/55">
          Ocena ogólna
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {section.rating.scores.map((score) => (
          <div key={score.label} className="flex items-center gap-3">
            <span className="w-[92px] shrink-0 font-body text-[11px] leading-none text-foreground/60">
              {score.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/12">
              <div
                className="h-full rounded-full"
                style={{
                  width: getProgressWidth(score.value),
                  backgroundColor: section.rating.color,
                }}
              />
            </div>
            <span className="w-8 shrink-0 text-right font-mono text-[11px] leading-none text-foreground/80">
              {formatScore(score.value)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-foreground/10 pt-4">
        <p className="font-body text-[11px] leading-none text-foreground/55">
          Składniki
        </p>
        <BlurShell blur={3}>
          <div className="mt-3 flex flex-wrap gap-2">
            {section.rating.ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-1 font-body text-[10px] leading-none text-foreground/70"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </BlurShell>
      </div>
    </div>
  );
}

function RealStackRatingCard({ section }: { section: RealStackSection }) {
  const ingredients = section.items.map((item) => item.name);
  const scoreRows = [
    { label: "Zasypianie", value: section.rating.scores.fallingAsleep },
    { label: "Wybudzenia", value: section.rating.scores.nightWakeups },
    { label: "Anty-stres", value: section.rating.scores.antiStress },
    { label: "Anty-lęk", value: section.rating.scores.antiAnxiety },
    { label: "Anty-koszmar", value: section.rating.scores.antiNightmare },
  ];

  return (
    <div className="flex h-full flex-col rounded-xl border border-foreground/20 bg-background/70 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 font-body text-[10px] leading-none"
          style={{
            backgroundColor: withLowOpacity(section.rating.color),
            color: section.rating.color,
          }}
        >
          {section.rating.badgeLabel}
        </span>
      </div>

      <h3 className="font-heading text-[18px] leading-[1.25] text-foreground sm:text-[20px]">
        {section.rating.cardTitle}
      </h3>
      <p className="mt-2 font-body text-[12px] leading-[18px] text-foreground/60 sm:text-[13px] sm:leading-[20px]">
        {ingredients.join(" · ")}
      </p>

      <div className="mt-5">
        <p
          className="font-heading text-[34px] leading-none font-bold"
          style={{ color: section.rating.color }}
        >
          {formatScore(section.rating.scores.general)}/10
        </p>
        <p className="mt-1 font-body text-[11px] leading-none text-foreground/55">
          Ocena ogólna
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {scoreRows.map((score) => (
          <div key={score.label} className="flex items-center gap-3">
            <span className="w-[92px] shrink-0 font-body text-[11px] leading-none text-foreground/60">
              {score.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/12">
              <div
                className="h-full rounded-full"
                style={{
                  width: getProgressWidth(score.value),
                  backgroundColor:
                    score.label === "Anty-koszmar" && score.value < 5.5
                      ? "#f87171"
                      : section.rating.color,
                }}
              />
            </div>
            <span className="w-8 shrink-0 text-right font-mono text-[11px] leading-none text-foreground/80">
              {formatScore(score.value)}
            </span>
          </div>
        ))}
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

function RealStackSection({ section }: { section: RealStackSection }) {
  return (
    <section className="mb-16 sm:mb-24">
      <div className="mb-8 sm:mb-12">
        <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
          {section.title}
        </h2>
        <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
        {section.items.map((item) => (
          <div
            key={`${section.title}-${item.name}`}
            className="flex h-full flex-col rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6"
          >
            <div className="flex min-h-[57px] items-center justify-center">
              <h3 className="text-center font-heading text-[24px] leading-[1.2] text-foreground">
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
        ))}

        <RealStackRatingCard section={section} />
      </div>
    </section>
  );
}

function MockStackSection({ section }: { section: MockStackSection }) {
  return (
    <section className="mb-16 sm:mb-24">
      <div className="mb-8 sm:mb-12">
        <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
          {section.title}
        </h2>
        <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
        {section.items.map((item) => (
          <div
            key={`${section.title}-${item.name}`}
            className="flex h-full flex-col rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6"
          >
            <div className="flex min-h-[57px] items-center justify-center">
              <BlurShell blur={5}>
                <h3 className="text-center font-heading text-[24px] leading-[1.2] text-foreground">
                  {item.name}
                </h3>
              </BlurShell>
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
        ))}

        <MockStackRatingCard section={section} />
      </div>
    </section>
  );
}

function MockStacksChart() {
  return (
    <section className="mb-16 sm:mb-24">
      <div className="rounded-[4px] border border-foreground/20 bg-background/60 p-4 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6 lg:p-7">
        <div className="mb-5 flex flex-col gap-2 sm:mb-6">
          <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-accent sm:text-xs">
            Porównanie
          </p>
          <h2 className="font-heading text-[18px] leading-[1.3] font-normal text-foreground sm:text-[24px] md:text-[28px]">
            Porównanie ze wszystkimi stackami
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {mockChartCategories.map((category, index) => (
            <span
              key={category}
              className={`rounded-[4px] border px-3 py-2 font-heading text-[9px] uppercase tracking-[0.12em] sm:px-4 sm:text-[10px] ${
                index === 0
                  ? "border-accent/70 bg-foreground/12 text-foreground"
                  : "border-foreground/20 bg-transparent text-foreground/75"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 sm:mt-6">
          {mockChartStacks.map((stack) => (
            <div
              key={stack.name}
              className="flex items-center gap-2 font-body text-[11px] leading-none text-foreground/75 sm:text-[12px]"
            >
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: stack.color }}
                aria-hidden="true"
              />
              <span>{stack.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex h-[340px] w-full items-end gap-3 border-b border-l border-foreground/10 px-4 pb-[72px] sm:h-[460px] sm:px-7">
          {mockChartStacks.map((stack) => (
            <div
              key={`bar-${stack.name}`}
              className="flex h-full flex-1 items-end justify-center"
            >
              <div
                className="w-full max-w-[48px] rounded-t-[4px]"
                style={{
                  height: `${stack.value}%`,
                  backgroundColor: stack.color,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MockEffectsRanking() {
  return (
    <section className="mb-16 sm:mb-24">
      <div className="mb-8 sm:mb-12">
        <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
          Ranking efektów
        </h2>
        <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
        <p className="mt-4 font-body text-[14px] leading-[24px] text-foreground/70 sm:text-[15px] sm:leading-[26px]">
          Zestawienie skuteczności składników w wybranych kategoriach na
          podstawie materiałów badawczych
        </p>
      </div>

      <div className="flex flex-col gap-8 sm:gap-10">
        {mockEffectCategories.map((category) => (
          <div
            key={category.category}
            className="rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-7"
          >
            <h3 className="mb-4 font-heading text-[18px] leading-[1.5] text-accent sm:mb-5 sm:text-[18px]">
              {category.category}
            </h3>
            <ol className="flex flex-col gap-2.5 sm:gap-3">
              {category.items.map((item, index) => (
                <li
                  key={`${category.category}-${item.supplement}`}
                  className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-2.5 font-body text-[16px] leading-[2] text-foreground/90 last:border-0 sm:text-[16px]"
                >
                  <BlurShell blur={3}>
                    <span className="flex-1">
                      <span className="mr-2 text-foreground/50">
                        {index + 1}.
                      </span>
                      {item.supplement}
                    </span>
                  </BlurShell>
                  <span className="flex-shrink-0 font-mono text-[16px] text-accent/80 sm:text-[16px]">
                    {item.effect}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

function MockBibliography() {
  return (
    <section className="mb-10">
      <div className="mb-6 sm:mb-8">
        <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
          Materiały źródłowe
        </h2>
        <div className="mt-3 h-px w-full max-w-[300px] bg-accent sm:mt-4" />
      </div>

      <div className="rounded-[4px] border border-foreground/20 bg-background/60 p-5 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-7">
        <ol className="flex flex-col gap-4 sm:gap-5">
          {mockBibliography.map((ref, index) => (
            <li
              key={ref}
              className="flex gap-3 border-b border-foreground/10 pb-4 font-body text-[12px] leading-[20px] text-foreground/70 last:border-0 last:pb-0 sm:text-[13px] sm:leading-[22px]"
            >
              <BlurShell blur={3}>
                <span className="flex-shrink-0 font-mono text-accent/60">
                  [{index + 1}]
                </span>
                <span className="flex-1 ml-2">{ref}</span>
              </BlurShell>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function HiddenStacksInfoCard() {
  return (
    <section className="mb-16 sm:mb-24">
      <div className="relative min-h-[220px] overflow-hidden rounded-[4px] border border-foreground/20 bg-background/60 p-6 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:min-h-[240px] sm:p-8 lg:p-9">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,179,224,0.16),transparent_38%)]"
        />

        <div className="relative max-w-[720px] pb-20 sm:pb-0">
          <p className="mb-4 font-heading text-[10px] uppercase tracking-[0.25em] text-accent sm:text-xs">
            Pełna baza stacków
          </p>
          <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
            Dalej czeka 9 gotowych stacków suplementacyjnych
          </h2>
          <p className="mt-4 max-w-[560px] font-body text-[14px] leading-[24px] text-foreground/70 sm:text-[15px] sm:leading-[26px]">
            Zobacz pełne porównanie, warianty zastosowania i dobór stacków pod
            konkretny problem ze snem.
          </p>
        </div>

        <AccessCta className="right-6 bottom-6 left-6 justify-center sm:left-auto sm:right-8 sm:bottom-8">
          Odkryj pozostałe stacki
        </AccessCta>
      </div>
    </section>
  );
}

function HiddenEffectsRankingInfoCard() {
  return (
    <section className="mb-16 sm:mb-24">
      <div className="relative min-h-[220px] overflow-hidden rounded-[4px] border border-foreground/20 bg-background/60 p-6 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:min-h-[240px] sm:p-8 lg:p-9">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,179,224,0.16),transparent_38%)]"
        />

        <div className="relative max-w-[720px] pb-20 sm:pb-0">
          <p className="mb-4 font-heading text-[10px] uppercase tracking-[0.25em] text-accent sm:text-xs">
            Pełny ranking efektów
          </p>
          <h2 className="font-heading text-[22px] leading-[1.2] font-normal text-foreground sm:text-[28px] md:text-[34px]">
            Dalej czeka ranking efektów składników w wybranych kategoriach
          </h2>
          <p className="mt-4 max-w-[560px] font-body text-[14px] leading-[24px] text-foreground/70 sm:text-[15px] sm:leading-[26px]">
            Zobacz pełne porównanie skuteczności składników w wybranych
            kategoriach na podstawie materiałów badawczych.
          </p>
        </div>

        <AccessCta className="right-6 bottom-6 left-6 justify-center sm:left-auto sm:right-8 sm:bottom-8">
          Odkryj pozostałe stacki
        </AccessCta>
      </div>
    </section>
  );
}

export function PrivateSupplementsBlurPreview() {
  return (
    <div aria-label="Podglad zablokowanych sekcji suplementacji">
      <p className="sr-only">
        Zablokowany podglad prywatnych sekcji. Widoczne elementy sa makietami z
        przykladowymi danymi.
      </p>

      <RealStackSection section={realStackSection} />

      {mockStackSections.map((section) => (
        <div key={section.title} className="relative">
          <MockStackSection section={section} />
          <AccessCta className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Zapytaj o dostęp
          </AccessCta>
        </div>
      ))}

      <HiddenStacksInfoCard />

      <SimpleStacksChart
        categories={simpleStackChartCategories}
        eyebrow="Porównanie"
        stacks={simpleStackChartStacks}
        title="Porównanie ze wszystkimi stackami"
      />

      <div className="relative">
        <BlurShell>
          <MockEffectsRanking />
        </BlurShell>
        <AccessCta className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Zapytaj o dostęp
        </AccessCta>
      </div>

      <HiddenEffectsRankingInfoCard />

      <SleepStackTableSection />

      <BlurShell>
        <MockBibliography />
      </BlurShell>
    </div>
  );
}
