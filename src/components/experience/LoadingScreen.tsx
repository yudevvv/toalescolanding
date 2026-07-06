"use client";

import { useEffect, useState, useRef } from "react";

const letters = "TOALESCO".split("");

interface Props {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<"letters" | "converge">("letters");
  const [shown, setShown] = useState(0);
  const [exiting, setExiting] = useState(false);
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
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(onDone, 400);
      }, remaining);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div className={"fixed inset-0 z-[9999] flex items-center justify-center" + (exiting ? " a-fo" : "")}
      style={{ background: exiting ? "var(--substrate)" : "var(--substrate)", animation: exiting ? "fade-out 0.4s ease both" : undefined }}>
      <div className="flex items-center gap-[0.15em]">
        {letters.map((letter, i) => (
          <span key={`${letter}-${i}`}
            className="text-[clamp(36px,10vw,96px)] font-light tracking-[0.08em] select-none"
            style={{
              color: "var(--measure)",
              transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              opacity: i < shown ? 1 : 0,
              transform: i < shown ? (phase === "converge" ? "scale(0.7)" : "scale(1)") : "scale(0.5)",
            }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
