"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [[active, direction], setPage] = useState([0, 0]);
  const [activeProblem, setActiveProblem] = useState<ProblemId>("instagram");
  const ticking = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onLoadDone = useCallback(() => setLoaded(true), []);

  const goTo = useCallback((i: number) => {
    if (ticking.current) return;
    const next = Math.max(0, Math.min(i, totalScenes - 1));
    if (next === active) return;
    ticking.current = true;
    setPage([next, next > active ? 1 : -1]);
    setTimeout(() => { ticking.current = false; }, 500);
  }, [active]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let touchX = 0;
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
      touchX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isLocked(e.target)) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) goTo(active + (dx < 0 ? 1 : -1));
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

      <div ref={containerRef} id="exp-container" className="h-dvh overflow-hidden relative"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={active} className="absolute inset-0 overflow-hidden"
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir * 280, opacity: 0, scale: 0.85 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (dir: number) => ({ x: dir * -200, opacity: 0, scale: 0.9 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
            <div className="h-full w-full pb-20">
              {active === 0 && <SceneIdea />}
              {active === 1 && <SceneSlowdown activeProblemId={activeProblem} onProblemSelect={setActiveProblem} />}
              {active === 2 && <SceneLiveSystem />}
              {active === 3 && <SceneProyectos />}
              {active === 4 && <SceneContacto />}
            </div>
          </motion.div>
        </AnimatePresence>

        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-3 py-1.5 rounded-full"
          style={{
            background: "color-mix(in srgb, var(--substrate) 60%, transparent)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--boundary)",
          }}>
          {scenes.map((label, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="rounded-full transition-all duration-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{
                width: i === active ? 20 : 5,
                height: 5,
                background: i === active ? "var(--active)" : "var(--measure-dim)",
                opacity: i === active ? 1 : 0.25,
              }}
              aria-label={label} />
          ))}
          <div className="w-px h-4 mx-0.5" style={{ background: "var(--boundary)" }} />
          <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            className="text-sm select-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ color: "var(--measure-dim)" }}>
            {theme === "light" ? "☀" : "☾"}
          </button>
        </nav>
      </div>
    </>
  );
}
