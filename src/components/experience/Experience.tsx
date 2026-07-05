"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SceneIdea } from "./SceneIdea";
import { SceneSlowdown } from "./SceneSlowdown";
import type { ProblemId } from "./SceneSlowdown";
import { SceneLiveSystem } from "./SceneLiveSystem";
import { SceneProyectos } from "./SceneProyectos";
import { SceneContacto } from "./SceneContacto";
import { LoadingScreen } from "./LoadingScreen";

const scenes = ["Una idea.", "¿Qué está frenando tu negocio?", "Así funciona", "Proyectos", "Contacto"];
const totalScenes = 5;

export function Experience() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [active, setActive] = useState(0);
  const [activeProblem, setActiveProblem] = useState<ProblemId>("instagram");
  const ticking = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onLoadDone = useCallback(() => setLoaded(true), []);

  const goTo = useCallback((i: number) => {
    if (ticking.current) return;
    const next = Math.max(0, Math.min(i, totalScenes - 1));
    if (next === active) return;
    ticking.current = true;
    setActive(next);
    setTimeout(() => { ticking.current = false; }, 500);
  }, [active]);

  useEffect(() => {
    const el = document.getElementById("exp-container");
    if (!el) return;
    let touchY = 0;
    let wheelY = 0;

    const isLocked = (target: EventTarget | null) =>
      (target as HTMLElement)?.closest?.("[data-scene-lock]");

    const onWheel = (e: WheelEvent) => {
      if (isLocked(e.target)) return;
      e.preventDefault();
      wheelY += e.deltaY;
      if (Math.abs(wheelY) > 60) {
        goTo(active + (wheelY > 0 ? 1 : -1));
        wheelY = 0;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isLocked(e.target)) return;
      touchY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isLocked(e.target)) return;
      const dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dy) > 40) goTo(active + (dy < 0 ? 1 : -1));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [active, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector("[data-scene-lock]")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(active + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <>
      {!loaded && <LoadingScreen onDone={onLoadDone} />}

      <div id="exp-container" className="h-dvh overflow-hidden relative"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>

        {scenes.map((_, i) => {
          const isActive = i === active;
          const isPast = i < active;
          const dist = active - i;

          return (
            <motion.div
              key={i}
              className="absolute inset-0 overflow-hidden"
              style={{
                zIndex: isActive ? 10 : (isPast ? 10 - dist : 0),
                pointerEvents: isActive ? "auto" : "none",
                borderRadius: isPast || isActive ? 14 : 0,
              }}
              initial={false}
              animate={{
                scale: isActive ? 0.94 : isPast ? 0.94 - (dist * 0.04) : 0.9,
                opacity: isActive ? 1 : isPast ? Math.max(0.45 - (dist * 0.15), 0.08) : 0,
                x: isPast ? dist * 12 : 0,
                y: isPast ? dist * 16 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <div className="h-full w-full" style={{
                  boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)" : "none",
                  borderRadius: 14,
                }}>
                  {i === 0 && <SceneIdea />}
                  {i === 1 && <SceneSlowdown activeProblemId={activeProblem} onProblemSelect={setActiveProblem} />}
                  {i === 2 && <SceneLiveSystem />}
                  {i === 3 && <SceneProyectos />}
                  {i === 4 && <SceneContacto />}
                </div>
            </motion.div>
          );
        })}

        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            background: "color-mix(in srgb, var(--substrate) 75%, transparent)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid var(--boundary)",
          }}>
          {scenes.map((label, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="rounded-full transition-all duration-500 relative before:absolute before:inset-[-18px] before:content-['']"
              style={{
                width: i === active ? 24 : 7,
                height: 7,
                background: i === active ? "var(--active)" : "var(--measure-dim)",
                opacity: i === active ? 1 : 0.3,
              }}
              aria-label={label} />
          ))}
          <div className="w-[1px] h-6 mx-1" style={{ background: "var(--boundary)" }} />
          <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            className="text-[clamp(10px,1.5vw,13px)] select-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ color: "var(--measure-dim)" }}>
            {theme === "light" ? "☀" : "☾"}
          </button>
        </nav>
      </div>
    </>
  );
}
