"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { SceneIdea } from "./SceneIdea";
import dynamic from "next/dynamic";
import type { ProblemId } from "./SceneSlowdown";
import { LoadingScreen } from "./LoadingScreen";

const SceneSlowdown = dynamic(() => import("./SceneSlowdown").then(m => ({ default: m.SceneSlowdown })), { ssr: false });
const SceneLiveSystem = dynamic(() => import("./SceneLiveSystem").then(m => ({ default: m.SceneLiveSystem })), { ssr: false });
const SceneProyectos = dynamic(() => import("./SceneProyectos").then(m => ({ default: m.SceneProyectos })), { ssr: false });
const SceneContacto = dynamic(() => import("./SceneContacto").then(m => ({ default: m.SceneContacto })), { ssr: false });

const scenes = ["Una idea.", "¿Qué está frenando tu negocio?", "Así funciona", "Proyectos", "Contacto"];
const totalScenes = 5;

export function Experience() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
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
    const dir = next > active ? 1 : -1;
    setDirection(dir);
    setPrevActive(active);
    setActive(next);
    setTimeout(() => { setPrevActive(null); ticking.current = false; }, 300);
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

  function renderScene(idx: number, exiting = false) {
    const dx = direction * (exiting ? -200 : 280);
    const style: React.CSSProperties = {
      position: "absolute", inset: 0, overflow: "hidden",
      animation: exiting
        ? `scene-exit-${direction > 0 ? "right" : "left"} 0.3s cubic-bezier(0.16,1,0.3,1) both`
        : `scene-enter 0.3s cubic-bezier(0.16,1,0.3,1) both`,
    };
    return (
      <div key={idx} style={style}>
        <div className="h-full w-full pb-20">
          {idx === 0 && <SceneIdea />}
          {idx === 1 && <SceneSlowdown activeProblemId={activeProblem} onProblemSelect={setActiveProblem} />}
          {idx === 2 && <SceneLiveSystem />}
          {idx === 3 && <SceneProyectos />}
          {idx === 4 && <SceneContacto />}
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && <LoadingScreen onDone={onLoadDone} />}

      <div ref={containerRef} id="exp-container" className="h-dvh overflow-hidden relative"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>

        <div className="absolute inset-0">
          {renderScene(active)}
          {prevActive !== null && renderScene(prevActive, true)}
        </div>

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
