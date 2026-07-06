"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const letters = "TOALESCO".split("");

interface Props {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<"letters" | "converge" | "done">("letters");
  const [shown, setShown] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (shown < letters.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 160);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("converge"), 400);
      return () => clearTimeout(t);
    }
  }, [shown]);

  useEffect(() => {
    if (phase === "converge") {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(200, 2500 - elapsed);
      const t = setTimeout(() => { setPhase("done"); onDone(); }, remaining);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "var(--substrate)" }}>
          <div className="flex items-center gap-[0.15em]">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ opacity: 0, y: 24, scale: 0.5 }}
                animate={
                  i < shown
                    ? { opacity: 1, y: phase === "converge" ? 0 : 0, scale: phase === "converge" ? 0.7 : 1 }
                    : { opacity: 0, y: 24, scale: 0.5 }
                }
                transition={{
                  duration: phase === "converge" ? 0.4 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[clamp(36px,10vw,96px)] font-light tracking-[0.08em] select-none"
                style={{ color: "var(--measure)" }}>
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
