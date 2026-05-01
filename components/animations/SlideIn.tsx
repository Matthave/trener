"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SlideInProps {
  children: React.ReactNode;
  direction: "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction,
  delay = 0,
  duration = 0.6,
  className,
}: SlideInProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = direction === "left" ? -72 : 72;

  return (
    <motion.div
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : offset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
