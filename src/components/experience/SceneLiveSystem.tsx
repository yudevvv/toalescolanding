"use client";

import { useState, useEffect } from "react";

// ─── ECOSYSTEM (keep as decorative background) ───

const nodes = [
  { x: 12, y: 22 }, { x: 78, y: 18 }, { x: 52, y: 32 },
  { x: 18, y: 58 }, { x: 82, y: 48 }, { x: 48, y: 68 },
  { x: 68, y: 72 }, { x: 28, y: 78 },
];

const connections = [[0,1],[0,2],[1,2],[2,3],[2,4],[3,5],[4,5],[5,6],[6,7],[3,7],[1,4],[0,3]];

function Ecosystem() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" style={{ opacity: "var(--eco-opacity, 0.08)" }}>
        {connections.map(([a, b], i) => (
          <g key={i}>
            <line x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`} x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
              stroke="var(--active)" strokeWidth="0.4" opacity="0.15" />
            <line x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`} x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
              stroke="var(--active)" strokeWidth="0.8" strokeDasharray="3 10" opacity="0.15"
              className="a-dash-slow"
              style={{ animationDelay: `${i * 0.12}s` }} />
          </g>
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={`${n.x}%`} cy={`${n.y}%`} r="2" fill="var(--active)" opacity="0.12"
            className="a-pulse-node"
            style={{ animationDuration: `${3 + i * 0.3}s` }} />
        ))}
      </svg>
    </div>
  );
}

// ─── STEPS ───

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Analizamos tus procesos actuales y detectamos qué se puede automatizar para ahorrarte tiempo y dinero.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="var(--active)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Propuesta",
    desc: "Diseñamos una solución a tu medida con presupuesto claro y sin sorpresas. Tú decides qué implementar.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="var(--active)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Desarrollo",
    desc: "Construimos tu sistema, lo integramos con tus herramientas actuales y lo probamos hasta que funcione solo.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="var(--active)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Entrega",
    desc: "Implementamos, te capacitamos y nos aseguramos de que todo funcione. Soporte continuo incluido.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="var(--active)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

function StepCard({ step, idx }: { step: Step; idx: number }) {
  const delay = idx * 0.12;
  return (
    <div className={"flex flex-col items-center text-center gap-2 p-[clamp(12px,1.5vw,20px)] rounded-xl flex-1 min-w-0 a-fu"}
      style={{ background: "var(--pb-module)", border: "1px solid var(--boundary)", animationDelay: delay + "s" }}>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono tracking-widest" style={{ color: "var(--measure-dim)" }}>{step.num}</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "color-mix(in srgb, var(--active) 10%, transparent)" }}>
          {step.icon}
        </div>
      </div>
      <h3 className="text-[clamp(13px,1.4vw,15px)] font-semibold" style={{ color: "var(--measure)" }}>
        {step.title}
      </h3>
      <p className="text-[clamp(11px,1.1vw,13px)] leading-relaxed" style={{ color: "var(--measure-secondary)" }}>
        {step.desc}
      </p>
    </div>
  );
}

// ─── TYPEWRITER ───

const missionMessages = [
  "Tu negocio funciona solo · incluso mientras duermes",
  "Capta más clientes sin estar pegado al teléfono",
  "Olvídate del papeleo · nosotros lo hacemos por ti",
  "Menos tiempo en pantalla · más tiempo en lo tuyo",
  "Resultados reales sin complicaciones técnicas",
  "Tu emprendimiento merece crecer sin dolores de cabeza",
];

function Typewriter() {
  const [typing, setTyping] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "paused" | "transition">("typing");

  useEffect(() => {
    if (phase === "transition") {
      const target = lineIdx === 2 ? 3 : 0;
      const t = setTimeout(() => {
        setTyping("");
        setCharIdx(0);
        setLineIdx(target);
        setPhase("typing");
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [phase, lineIdx]);

  useEffect(() => {
    if (phase === "paused") {
      const isSetEnd = lineIdx === 2 || lineIdx === 5;
      const delay = isSetEnd ? 500 : 2000;
      const t = setTimeout(() => {
        if (isSetEnd) {
          setPhase("transition");
        } else {
          setTyping("");
          setCharIdx(0);
          setLineIdx((i) => i + 1);
          setPhase("typing");
        }
      }, delay);
      return () => clearTimeout(t);
    }
  }, [phase, lineIdx]);

  useEffect(() => {
    if (phase !== "typing") return;
    const msg = missionMessages[lineIdx];
    if (!msg) return;
    if (charIdx < msg.length) {
      const delay = 12 + Math.random() * 16;
      const t = setTimeout(() => {
        setTyping(msg.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("paused"), 1800);
      return () => clearTimeout(t);
    }
  }, [phase, lineIdx, charIdx]);

  return (
    <div className="px-4 relative z-10 h-[44px] flex items-center justify-center">
      <div className="text-center max-w-xs mx-auto">
        {phase === "transition" ? (
          <div className="flex gap-2 items-center justify-center a-fi"
            style={{ animationDuration: "0.4s" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--active)" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--active)" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--active)" }} />
          </div>
        ) : (
          <div key={lineIdx} className="text-[clamp(12px,1.4vw,14px)] font-medium leading-relaxed a-fu"
            style={{ color: "var(--measure-secondary)", animationDuration: "0.25s" }}>
            {typing}<span className="a-blink" style={{ color: "var(--active)" }}>|</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN ───

export function SceneLiveSystem() {
  return (
    <div className="h-full w-full overflow-hidden relative flex flex-col select-none bg-cool-ambient"
      style={{ WebkitTapHighlightColor: "transparent" }}>
      {/* Ambient orbs */}
      <div className="ambient-orb" style={{ width: "min(50vw,500px)", height: "min(50vw,500px)", top: "-15%", right: "-10%", background: "var(--active)", filter: "blur(80px)", opacity: "var(--orb-opacity, 0.08)" }} />
      <div className="ambient-orb" style={{ width: "min(35vw,350px)", height: "min(35vw,350px)", bottom: "-10%", left: "-5%", background: "var(--active)", filter: "blur(70px)", opacity: "var(--orb-opacity, 0.06)" }} />

      <Ecosystem />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-6 relative z-10 min-h-0">
        <div className="w-full max-w-3xl flex flex-col items-center gap-6">

          {/* Title */}
          <div className="text-center a-fu">
            <h2 className="text-[clamp(22px,4vw,40px)] font-light tracking-tight" style={{ color: "var(--measure)" }}>
              Cómo trabajamos
            </h2>
            <p className="text-[clamp(12px,1.4vw,15px)] font-light mt-1" style={{ color: "var(--measure-dim)" }}>
              De la idea al sistema funcionando · sin complicaciones
            </p>
          </div>

          {/* Steps */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} idx={i} />
            ))}
          </div>
      </div>

      {/* Typewriter */}
      </div>

      {/* Typewriter */}
      <Typewriter />
    </div>
  );
}
