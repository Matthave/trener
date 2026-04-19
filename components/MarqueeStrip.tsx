"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  children: React.ReactNode[];
  separator?: React.ReactNode;
  /** Full cycle duration in seconds */
  speed?: number;
  className?: string;
}

export function MarqueeStrip({
  children,
  separator = (
    <span
      className="font-heading text-[clamp(6rem,6vw,75vh)] leading-none font-normal uppercase text-accent md:text-[clamp(12rem,6vw,75vh)] xl:text-[clamp(16rem,6vw,75vh)]"
      aria-hidden="true"
    >
      *
    </span>
  ),
  speed = 25,
  className,
}: MarqueeStripProps) {
  const shouldReduceMotion = useReducedMotion();

  const items = React.Children.toArray(children);

  const renderSequence = (keyPrefix: string) =>
    items.map((child, i) => (
      <React.Fragment key={`${keyPrefix}-${i}`}>
        <span className="mx-[4em] xl:mx-[6em] xl:mt-[3em] shrink-0 self-center">
          {separator}
        </span>
        <span className="shrink-0">{child}</span>
      </React.Fragment>
    ));

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        animate={shouldReduceMotion ? {} : { x: "-50%" }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                x: {
                  duration: speed,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }
        }
      >
        {renderSequence("a")}
        {renderSequence("b")}
      </motion.div>
    </div>
  );
}
