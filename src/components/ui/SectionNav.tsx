"use client";

import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "clubes", label: "Clubes" },
  { id: "projects", label: "Qué hacemos" },
  { id: "cta", label: "Contacto" },
];

export function SectionNav({ active }: { active: string }) {
  const current = sections.findIndex((s) => s.id === active);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-4 sm:right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 motion-reduce:hidden lg:flex">
      <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500">
        {String(current + 1).padStart(2, "0")}
        <span className="text-slate-300 dark:text-slate-600">/{String(sections.length).padStart(2, "0")}</span>
      </span>

      <div className="flex flex-col items-center gap-2.5">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group relative flex items-center justify-center"
            aria-label={s.label}
          >
            <motion.span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 shadow-sm shadow-blue-500/50"
                  : "w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              layoutId="dot"
            />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:border-white/10 dark:bg-slate-950 dark:text-slate-400">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
