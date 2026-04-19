"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface StepWrapperProps {
  children: React.ReactNode;
  stepKey: string | number;
}

export function StepWrapper({ children, stepKey }: StepWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -40 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
