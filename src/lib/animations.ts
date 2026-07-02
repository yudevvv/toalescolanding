import type { Variants } from "framer-motion";

const spring = (stiffness: number, damping: number, mass?: number) =>
  ({ type: "spring" as const, stiffness, damping, ...(mass !== undefined ? { mass } : {}) });

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring(100, 20, 0.8),
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring(120, 16),
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: spring(80, 18),
  },
};

export const cardHover = {
  scale: 1.02,
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

export const buttonTap = { scale: 0.97 };

export const blurInLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};
