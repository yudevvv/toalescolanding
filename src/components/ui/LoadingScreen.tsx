"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "SYSTEM INITIALIZING...",
  "CHECKING DEPENDENCIES...",
  "LOADING MODULES...",
  "ESTABLISHING CONNECTION...",
  "READY.",
];

export function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 100);
        const lineIdx = Math.floor((next / 100) * lines.length);
        if (lineIdx !== currentLine) setCurrentLine(Math.min(lineIdx, lines.length - 1));
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShow(false);
            setTimeout(onFinish, 400);
          }, 400);
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentLine, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white font-mono"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="max-w-sm w-full px-6">
            <p className="text-[10px] text-blue-400 mb-6 tracking-[0.2em]">
              $ ./boot --target toalesco
            </p>

            <div className="space-y-1 mb-6">
              {lines.map((line, i) => (
                <p
                  key={line}
                  className={`text-[10px] transition-all duration-300 ${
                    i < currentLine
                      ? "text-orange-400"
                      : i === currentLine
                      ? "text-blue-400"
                      : "text-slate-700"
                  }`}
                >
                  {i < currentLine ? "✓" : i === currentLine ? "▸" : " "} {line}
                </p>
              ))}
            </div>

            <div className="relative h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-orange-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>{Math.round(progress)}%</span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-3 bg-blue-400 animate-[blink_1s_step-end_infinite]" />
                LOADING
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
