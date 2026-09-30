"use client";

/**
 * Reveal — scroll-triggered entrance used across every section.
 * Delays are staggered per-child via the `delay` prop.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_LUXE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Slide direction; defaults to a subtle rise. */
  from?: "up" | "left" | "right" | "none";
}

const OFFSETS = {
  up: { y: 28 },
  left: { x: -36 },
  right: { x: 36 },
  none: {},
} as const;

export default function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...OFFSETS[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.7, ease: EASE_LUXE, delay }}
    >
      {children}
    </motion.div>
  );
}
