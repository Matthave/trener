import { SlideIn } from "@/components/animations/SlideIn";

import type { SimpleStack } from "../_data/simple-stacks-data";

interface SimpleStackSectionProps {
  stack: SimpleStack;
  startIndex?: number;
}

export function SimpleStackSection({
  stack,
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
              <h3 className="text-center font-heading text-[24px] leading-[1.2] text-foreground">
                {item.name}
              </h3>

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
      </div>
    </section>
  );
}
