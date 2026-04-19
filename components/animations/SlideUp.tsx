"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnScroll?: boolean;
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.5,
  className,
  triggerOnScroll = false,
}: SlideUpProps) {
  const shouldReduceMotion = useReducedMotion();

  const animationProps = {
    opacity: 1,
    y: 0,
  };

  const initialProps = {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 40,
  };

  const transitionProps = {
    duration: shouldReduceMotion ? 0 : duration,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  return (
    <motion.div
      initial={initialProps}
      {...(triggerOnScroll
        ? {
            whileInView: animationProps,
            viewport: { once: true, amount: 0.3 },
          }
        : { animate: animationProps })}
      transition={transitionProps}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
