import { SlideIn } from "@/components/animations/SlideIn";

import { sleepStackItems } from "../_data/sleep-stack-data";
import { EffectsText } from "./EffectsText";

export function SleepStackTableSection() {
  return (
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
  );
}
