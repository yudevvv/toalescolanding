"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxDotPattern({
  className = "",
  speed = 0.3,
  variant = "default",
}: {
  className?: string;
  speed?: number;
  variant?: "default" | "orange" | "white";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const dotClass = {
    default: "bg-dot-pattern",
    orange: "bg-dot-pattern-orange",
    white: "bg-dot-pattern-white",
  }[variant];

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className={`absolute inset-0 ${dotClass}`}
        style={{ y, scale: 1 + speed * 0.2 }}
      />
    </div>
  );
}
