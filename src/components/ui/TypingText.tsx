"use client";

import { useState, useEffect } from "react";

export function TypingText({
  text,
  speed = 40,
  className = "",
  delay = 0,
}: {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-blue-500 dark:bg-blue-400 ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
      )}
    </span>
  );
}
