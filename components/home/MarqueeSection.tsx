import { MarqueeStrip } from "@/components/MarqueeStrip";

export function MarqueeSection() {
  return (
    <section className="py-6">
      <MarqueeStrip speed={50} className="bg-foreground/[0.0] py-12">
        <span className="fo-heading text-[clamp(2rem,45vw,55vh)] leading-none font-normal uppercase text-foreground pr-2">
          Push Limits
        </span>
        <span className="font-heading text-[clamp(2rem,45vw,45vh)] leading-none font-normal uppercase text-foreground pr-2">
          No Excuses
        </span>
        <span className="font-heading text-[clamp(2rem,45vw,45vh)] leading-none font-normal uppercase hero-text-outline pr-2">
          Train Hard
        </span>
      </MarqueeStrip>
    </section>
  );
}
