"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AuroraBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        style={{ y }}
      >
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-blue-400/15 dark:bg-blue-500/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-blue-300/10 dark:bg-blue-400/8 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-indigo-400/10 dark:bg-indigo-500/8 blur-[90px]" />
      </motion.div>
    </div>
  );
}
