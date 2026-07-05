"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DATA ───

type ProblemId = "instagram" | "excel" | "inventory" | "whatsapp" | "tasks" | "reports";
export type { ProblemId };

interface Problem {
  id: ProblemId;
  label: string;
  title: string;
  before: string[];
  after: string[];
}

const problems: Problem[] = [
  {
    id: "instagram",
    label: "Instagram",
    title: "Clientes que se pierden en redes",
    before: ["Publicaciones sin rumbo", "Respuestas manuales", "Leads que se enfrían", "Sin seguimiento"],
    after: ["Landing Page", "Formulario Inteligente", "CRM Automatizado", "Más clientes"],
  },
  {
    id: "excel",
    label: "Excel",
    title: "El caos de las planillas",
    before: ["Fórmulas rotas", "Datos duplicados", "Versiones sin control", "Errores humanos"],
    after: ["Sistema Web", "Dashboard en vivo", "Alertas automáticas", "Datos en tiempo real"],
  },
  {
    id: "inventory",
    label: "Inventario",
    title: "Stock que no ves",
    before: ["Stock ciego", "Productos perdidos", "Devoluciones sin registro", "Sin trazabilidad"],
    after: ["Control Digital", "Códigos y Tracking", "Alertas de stock", "Trazabilidad total"],
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    title: "Chats que no venden",
    before: ["Mensajes sueltos", "Clientes sin respuesta", "Ofertas perdidas", "Sin historial"],
    after: ["Chatbot Inteligente", "CRM integrado", "Respuestas automáticas", "Clientes felices"],
  },
  {
    id: "tasks",
    label: "Tareas",
    title: "Horas en lo mismo",
    before: ["Mismo trabajo cada día", "Horas perdidas", "Errores por fatiga", "Desgaste del equipo"],
    after: ["Automatización", "Workflow inteligente", "Cero errores", "Escalar sin esfuerzo"],
  },
  {
    id: "reports",
    label: "Reportes",
    title: "Decisiones a ciegas",
    before: ["Datos dispersos", "Informes manuales", "Decisiones lentas", "Sin visión clara"],
    after: ["Dashboard automático", "Reportes en vivo", "Decisiones rápidas", "Visión total del negocio"],
  },
];

// ─── MICRO ICONS ───

function IconInstagram() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 lg:w-10 lg:h-10">
      <rect x="12" y="6" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" className="a-shake" />
      <rect x="14.5" y="10.5" width="11" height="15" rx="1" fill="currentColor" opacity="0.08" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={20 + (i - 1) * 5} cy={29}
          r="1.2" fill="currentColor" className="a-float"
          style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
    </svg>
  );
}

function IconExcel() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 lg:w-10 lg:h-10">
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => {
          const idx = row * 3 + col;
          const isActive = (idx + row) % 2 === 0;
          return (
            <rect key={idx}
              x={8 + col * 9} y={8 + row * 8}
              width="7" height="6" rx="1"
              stroke="currentColor" strokeWidth="0.8"
              fill="currentColor" fillOpacity="0.06"
              className={isActive ? "a-pulse-ce" : undefined}
              style={{ animationDelay: `${(idx * 0.03).toFixed(2)}s` }} />
          );
        })
      )}
    </svg>
  );
}

function IconInventory() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 lg:w-10 lg:h-10">
      {[0, 1, 2].map((i) => (
        <rect key={i}
          x={10 + i * 7} y={12 + (i % 2) * 6}
          width="6" height="5" rx="1"
          stroke="currentColor" strokeWidth="1.2"
          fill="currentColor" fillOpacity="0.08"
          className="a-slide"
          style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 lg:w-10 lg:h-10">
      <g className="a-breathe">
        {[0, 1].map((i) => (
          <rect key={i}
            x={9 + i * 13} y={9 + i * 9}
            width="15" height="10" rx="4"
            stroke="currentColor" strokeWidth="1"
            fill="currentColor" fillOpacity="0.06"
            className="a-bob"
            style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </g>
      <path d="M18 27 Q20 31 25 29"
        stroke="currentColor" strokeWidth="1.2"
        fill="none" strokeLinecap="round"
        className="a-draw" />
    </svg>
  );
}

function IconTasks() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 lg:w-10 lg:h-10">
      <path d="M20 10 A10 10 0 1 1 19.9 10"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" fill="none"
        className="a-spin"
        style={{ transformOrigin: "20px 20px" }} />
      <path d="M14 20 L18 24 L26 16"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        fill="none"
        className="a-draw-check" />
    </svg>
  );
}

function IconReports() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 lg:w-10 lg:h-10">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i}
          x={7 + i * 8} y={20 - i * 3}
          width="5" height={8 + i * 4} rx="0.5"
          fill="currentColor" fillOpacity="0.12"
          stroke="currentColor" strokeWidth="0.6"
          className="a-bar-pulse"
          style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </svg>
  );
}

function MicroIcon({ type }: { type: ProblemId }) {
  switch (type) {
    case "instagram": return <IconInstagram />;
    case "excel": return <IconExcel />;
    case "inventory": return <IconInventory />;
    case "whatsapp": return <IconWhatsApp />;
    case "tasks": return <IconTasks />;
    case "reports": return <IconReports />;
  }
}

// ─── PROBLEM NODE ───

function ProblemNode({
  problem,
  isActive,
  onTap,
  index,
}: {
  problem: Problem;
  isActive: boolean;
  onTap: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onTap}
      data-node-index={index}
      className="flex flex-col items-center gap-1.5 cursor-pointer select-none touch-manipulation"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: "clamp(52px,5vw,72px)", height: "clamp(52px,5vw,72px)",
          borderRadius: "50%",
          background: isActive
            ? "var(--pb-energy)"
            : "color-mix(in srgb, var(--substrate) 96%, var(--measure))",
          border: isActive ? "none" : "1px solid var(--boundary)",
          color: isActive ? "#fff" : "var(--measure-dim)",
          transition: "background 0.4s ease, color 0.4s ease, border 0.4s ease",
        }}
        animate={{
          scale: isActive ? 1.08 : 1,
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <MicroIcon type={problem.id} />
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={false}
            animate={{
              boxShadow: [
                "0 0 8px var(--pb-glow)",
                "0 0 22px var(--pb-glow)",
                "0 0 8px var(--pb-glow)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
      <span
        className="text-[clamp(9px,1.8vw,13px)] font-medium leading-tight text-center"
        style={{
          color: isActive ? "var(--measure)" : "var(--measure-dim)",
          transition: "color 0.4s ease",
        }}
      >
        {problem.label}
      </span>
    </button>
  );
}

// ─── ENERGY LINES ───

function EnergyLines({ gridRef, activeIndex }: { gridRef: React.RefObject<HTMLDivElement | null>; activeIndex: number }) {
  const [nodePositions, setNodePositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const measure = () => {
      const grid = gridRef.current;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const els = grid.querySelectorAll<HTMLElement>("[data-node-index]");
      const positions: { x: number; y: number }[] = [];
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        positions.push({
          x: r.left + r.width / 2 - rect.left,
          y: r.top + r.height / 2 - rect.top,
        });
      });
      setNodePositions(positions);
    };

    measure();
    const ro = new ResizeObserver(measure);
    const grid = gridRef.current;
    if (grid) ro.observe(grid);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [gridRef]);

  // Build paths: connect nodes based on proximity (grid neighbors)
  const paths: { d: string; from: number; to: number }[] = [];
  if (nodePositions.length >= 6) {
    const sorted = [...nodePositions];
    // Determine if desktop (1 column) or mobile (3 columns) by checking x spread
    const xs = sorted.map((p) => p.x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const isSingleColumn = maxX - minX < 100;

    if (isSingleColumn) {
      // Vertical chain
      for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i];
        const b = sorted[i + 1];
        const mx = (a.x + b.x) / 2 + 8;
        const my = (a.y + b.y) / 2;
        paths.push({ d: `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`, from: i, to: i + 1 });
      }
    } else {
      const cols = 3;
      const rows = 2;
      // Horizontal
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const i = row * cols + col;
          const j = row * cols + col + 1;
          if (i < sorted.length && j < sorted.length) {
            const a = sorted[i];
            const b = sorted[j];
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 4;
            paths.push({ d: `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`, from: i, to: j });
          }
        }
      }
      // Vertical
      for (let col = 0; col < cols; col++) {
        const top = col;
        const bottom = col + cols;
        if (top < sorted.length && bottom < sorted.length) {
          const a = sorted[top];
          const b = sorted[bottom];
          const mx = (a.x + b.x) / 2 + 4;
          const my = (a.y + b.y) / 2;
          paths.push({ d: `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`, from: top, to: bottom });
        }
      }
    }
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}>
      {paths.map((p, i) => {
        const isConnected =
          p.from === activeIndex || p.to === activeIndex;
        return (
          <g key={i}>
            <path d={p.d} stroke="var(--boundary)" strokeWidth="1"
              fill="none" opacity="0.35" />
            <path d={p.d}
              stroke={isConnected ? "var(--pb-energy)" : "var(--pb-solution)"}
              strokeWidth="1.5" fill="none" strokeLinecap="round"
              strokeDasharray="4 14"
              opacity={isConnected ? 0.7 : 0.2}
              className="a-dash"
              style={{ animationDelay: `${i * 0.15}s` }} />
            <path d={p.d}
              stroke={isConnected ? "var(--pb-energy)" : "var(--pb-solution)"}
              strokeWidth="5" fill="none" opacity="0.06"
            />
          </g>
        );
      })}
    </svg>
  );
}

// ─── TRANSFORMATION LIST ITEM ───

function TransformItem({
  idx,
  problemId,
  side,
  text,
  isSolution,
}: {
  idx: number;
  problemId: string;
  side: "before" | "after";
  text: string;
  isSolution: boolean;
}) {
  return (
    <motion.div
      key={problemId + "-" + side + "-" + idx}
      className="flex items-center gap-1.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{
          width: isSolution ? 5 : 4,
          height: isSolution ? 5 : 4,
          background: isSolution ? "var(--pb-solution)" : "var(--measure-dim)",
        }}
      />
      <span
        className="text-[clamp(10px,1.6vw,15px)]"
        style={{
          color: isSolution ? "var(--pb-text)" : "var(--measure-secondary)",
          fontWeight: isSolution ? 500 : 400,
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

// ─── TRANSFORMATION PANEL ───

function TransformationPanel({ problem }: { problem: Problem }) {
  return (
    <div className="w-full flex flex-col min-h-0 gap-2">
      <motion.h3
        key={problem.id + "-t"}
        className="text-[clamp(12px,2.2vw,20px)] font-semibold text-center"
        style={{ color: "var(--pb-text)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {problem.title}
      </motion.h3>

      <div className="flex gap-2.5 flex-1 min-h-0">
        <div className="flex-1 rounded-xl p-[clamp(8px,1.5vw,18px)] flex flex-col gap-1.5"
          style={{
            background: "color-mix(in srgb, var(--pb-module) 50%, transparent)",
            border: "1px solid var(--boundary)",
          }}>
          <span className="text-[clamp(7px,1.2vw,11px)] font-semibold uppercase tracking-wider"
            style={{ color: "var(--measure-dim)" }}>
            Antes
          </span>
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-1">
              {problem.before.map((item, i) => (
                <TransformItem key={problem.id + "-b-" + i}
                  idx={i} problemId={problem.id} side="before" text={item} isSolution={false} />
              ))}
            </div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center shrink-0">
          <motion.div
            key={problem.id + "-a"}
            className="w-6 h-6 flex items-center justify-center rounded-full text-[clamp(10px,1.3vw,16px)]"
            style={{ background: "var(--pb-energy)", color: "#fff" }}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            →
          </motion.div>
        </div>

        <div className="flex-1 rounded-xl p-[clamp(8px,1.5vw,18px)] flex flex-col gap-1.5"
          style={{
            background: "color-mix(in srgb, var(--pb-solution) 7%, transparent)",
            border: "1px solid",
            borderColor: "color-mix(in srgb, var(--pb-solution) 18%, transparent)",
          }}>
          <span className="text-[clamp(7px,1.2vw,11px)] font-semibold uppercase tracking-wider"
            style={{ color: "var(--pb-solution)" }}>
            Después
          </span>
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-1">
              {problem.after.map((item, i) => (
                <TransformItem key={problem.id + "-a-" + i}
                  idx={i} problemId={problem.id} side="after" text={item} isSolution={true} />
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ───

export function SceneSlowdown({
  activeProblemId,
  onProblemSelect,
}: {
  activeProblemId: ProblemId;
  onProblemSelect: (id: ProblemId) => void;
}) {
  const activeProblem = problems.find((p) => p.id === activeProblemId)!;
  const activeIndex = problems.findIndex((p) => p.id === activeProblemId);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden"
      style={{ background: "var(--pb-bg)" }}>
      {/* Top: header + nodes */}
      <div className="shrink-0 flex flex-col overflow-hidden">
        <div className="shrink-0 text-center pt-[clamp(10px,2.5vh,24px)] pb-[clamp(4px,1vh,10px)] px-4 max-w-lg lg:max-w-xl mx-auto w-full">
          <h2 className="text-[clamp(14px,2.8vw,28px)] font-semibold tracking-tight"
            style={{ color: "var(--pb-text)" }}>
            ¿Qué está frenando tu negocio?
          </h2>
          <p className="text-[clamp(8px,1.4vw,14px)] mt-0.5"
            style={{ color: "var(--measure-dim)" }}>
            Toca un problema para ver su solución
          </p>
        </div>

        <div className="relative flex items-center justify-center px-4 pb-[clamp(6px,1.5vh,14px)]">
          <div className="relative w-full max-w-sm lg:max-w-md">
            <EnergyLines gridRef={gridRef} activeIndex={activeIndex} />
            <div ref={gridRef}
              className="grid grid-cols-3 gap-y-[clamp(10px,2vh,18px)] w-full relative z-10">
              {problems.map((p, i) => (
                <div key={p.id} className="flex justify-center">
                  <ProblemNode
                    problem={p}
                    isActive={p.id === activeProblemId}
                    onTap={() => onProblemSelect(p.id)}
                    index={i}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: transformation panel */}
      <div className="flex-1 min-h-0 px-4 pb-[clamp(8px,2vh,16px)] max-w-lg lg:max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProblemId}
            className="h-full w-full flex flex-col"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <TransformationPanel problem={activeProblem} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
