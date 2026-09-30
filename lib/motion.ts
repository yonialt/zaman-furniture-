/**
 * Centralized, canonical Framer Motion transition/easing tokens.
 * One source of truth keeps the whole site's motion language consistent.
 */
import type { Transition } from "framer-motion";

/** Luxury easing curve — long, gentle, editorial. */
export const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const TRANSITION_LUXE: Transition = {
  duration: 0.7,
  ease: EASE_LUXE,
};

export const TRANSITION_MEGA: Transition = {
  duration: 0.35,
  ease: EASE_LUXE,
};

export const TRANSITION_MODAL: Transition = {
  duration: 0.4,
  ease: EASE_LUXE,
};

/** Standard whileInView animation used across all page sections. */
export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-72px" },
  transition: TRANSITION_LUXE,
};
