"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const DISPLAY = "font-medium tracking-[-0.035em]";
export const ACCENT = "font-[family-name:var(--font-serif)] font-normal italic tracking-[-0.01em]";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const still = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
