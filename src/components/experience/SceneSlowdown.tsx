"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DATA ───

type ProblemId = "instagram" | "excel" | "inventory" | "whatsapp" | "tasks" | "reports" | "tickets";
export type { ProblemId };

interface Problem {
  id: ProblemId;
  label: string;
  title: string;
  before: string[];
  after: string[];
  stat: string;
}

const problems: Problem[] = [
  {
    id: "instagram",
    label: "Instagram",
    title: "Clientes que se pierden en redes",
    before: ["Publicaciones sin rumbo", "Respuestas manuales", "Leads que se enfrían", "Sin seguimiento"],
    after: ["Landing Page", "Formulario Inteligente", "CRM Automatizado", "Más clientes"],
    stat: "70%",
  },
  {
    id: "excel",
    label: "Excel",
    title: "El caos de las planillas",
    before: ["Fórmulas rotas", "Datos duplicados", "Versiones sin control", "Errores humanos"],
    after: ["Sistema Web", "Dashboard en vivo", "Alertas automáticas", "Datos en tiempo real"],
    stat: "3x",
  },
  {
    id: "inventory",
    label: "Inventario",
    title: "Stock que no ves",
    before: ["Stock ciego", "Productos perdidos", "Devoluciones sin registro", "Sin trazabilidad"],
    after: ["Control Digital", "Códigos y Tracking", "Alertas de stock", "Trazabilidad total"],
    stat: "85%",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    title: "Chats que no venden",
    before: ["Mensajes sueltos", "Clientes sin respuesta", "Ofertas perdidas", "Sin historial"],
    after: ["Chatbot Inteligente", "CRM integrado", "Respuestas automáticas", "Clientes felices"],
    stat: "2.5x",
  },
  {
    id: "tasks",
    label: "Tareas",
    title: "Horas en lo mismo",
    before: ["Mismo trabajo cada día", "Horas perdidas", "Errores por fatiga", "Desgaste del equipo"],
    after: ["Automatización", "Workflow inteligente", "Cero errores", "Escalar sin esfuerzo"],
    stat: "80%",
  },
  {
    id: "reports",
    label: "Reportes",
    title: "Decisiones a ciegas",
    before: ["Datos dispersos", "Informes manuales", "Decisiones lentas", "Sin visión clara"],
    after: ["Dashboard automático", "Reportes en vivo", "Decisiones rápidas", "Visión total del negocio"],
    stat: "60%",
  },
  {
    id: "tickets",
    label: "Soporte",
    title: "Soporte que no llega",
    before: ["Correr tras el informático", "Llamadas sin respuesta", "Problemas sin registro", "Cero histórico"],
    after: ["Ticket con foto y descripción", "Informático atiende directo", "Cierre con registro", "Estadísticas de incidencias"],
    stat: "100%",
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

function IconTickets() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 lg:w-10 lg:h-10">
      <rect x="8" y="8" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" />
      <line x1="12" y1="15" x2="28" y2="15" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="12" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="12" y1="25" x2="20" y2="25" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <circle cx="28" cy="27" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="28" cy="27" r="1.2" fill="currentColor" />
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
    case "tickets": return <IconTickets />;
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
          width: "clamp(60px,5vw,72px)", height: "clamp(60px,5vw,72px)",
          borderRadius: "50%",
          background: isActive
            ? "var(--active)"
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
        className="text-[clamp(12px,1.8vw,13px)] font-medium leading-tight text-center"
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

  // Build paths: only from active node to grid neighbors
  const paths: { d: string; from: number; to: number }[] = [];
  if (nodePositions.length >= 6) {
    const p = nodePositions;
    const ys = p.map((n) => n.y);
    const isSingleRow = Math.max(...ys) - Math.min(...ys) < 40;
    const neighbors: number[] = [];

    if (isSingleRow) {
      if (activeIndex > 0) neighbors.push(activeIndex - 1);
      if (activeIndex < p.length - 1) neighbors.push(activeIndex + 1);
    } else {
      const col = activeIndex % 3;
      const row = Math.floor(activeIndex / 3);
      if (col > 0) neighbors.push(activeIndex - 1);
      if (col < 2 && activeIndex + 1 < p.length) neighbors.push(activeIndex + 1);
      if (row > 0) neighbors.push(activeIndex - 3);
      if (row < 1) neighbors.push(activeIndex + 3);
    }

    const a = p[activeIndex];
    if (!a) return;
    neighbors.forEach((n) => {
      const b = p[n];
      if (!b) return;
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = `M${a.x},${a.y} Q${mx + dy * 0.18},${my - dx * 0.18} ${b.x},${b.y}`;
      paths.push({ d, from: activeIndex, to: n });
    });
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}>
      {paths.map((path, i) => (
        <g key={i}>
          <path d={path.d} stroke="var(--active)" strokeWidth="1.8" fill="none"
            strokeLinecap="round" opacity="0.2" />
          <path d={path.d} stroke="var(--active)" strokeWidth="1.8" fill="none"
            strokeLinecap="round" strokeDasharray="6 10" opacity="0.6"
            className="a-dash-fast" />
          <path d={path.d} stroke="var(--active)" strokeWidth="6" fill="none"
            opacity="0.04" />
        </g>
      ))}
    </svg>
  );
}

// ─── SOLUTION MOCKUP ───

function SolutionMockup({ type }: { type: ProblemId }) {
  const common = "w-full h-12 rounded-md overflow-hidden flex items-center justify-center";
  switch (type) {
    case "instagram":
      return (
        <div className={`${common}`} style={{ border: "1px solid var(--boundary)" }}>
          <svg viewBox="0 0 80 24" className="w-full h-full p-1" fill="none">
            <rect x="2" y="2" width="18" height="20" rx="2" stroke="var(--active)" strokeWidth="0.5" opacity="0.25" />
            <rect x="6" y="4" width="10" height="6" rx="0.5" fill="var(--active)" opacity="0.06" />
            <rect x="6" y="12" width="8" height="1.5" rx="0.3" fill="var(--active)" opacity="0.35" />
            <rect x="6" y="14.5" width="6" height="1.5" rx="0.3" fill="var(--active)" opacity="0.18" />
            <rect x="25" y="4" width="28" height="2" rx="0.5" fill="var(--active)" opacity="0.4" />
            <rect x="25" y="8" width="50" height="1.5" rx="0.3" fill="var(--measure-dim)" opacity="0.12" />
            <rect x="25" y="11" width="40" height="1.5" rx="0.3" fill="var(--measure-dim)" opacity="0.12" />
            <rect x="25" y="14" width="45" height="1.5" rx="0.3" fill="var(--measure-dim)" opacity="0.12" />
          </svg>
        </div>
      );
    case "excel":
      return (
        <div className={`${common}`} style={{ border: "1px solid var(--boundary)" }}>
          <svg viewBox="0 0 80 24" className="w-full h-full p-1" fill="none">
            {[0, 1, 2].map((row) => (
              <g key={row}>
                {[0, 1, 2, 3].map((col) => (
                  <rect key={col} x={4 + col * 18} y={3 + row * 7} width="15" height="5" rx="0.5"
                    fill={col === 0 ? "var(--active)" : "transparent"}
                    stroke="var(--measure-dim)" strokeWidth="0.4" opacity="0.25" />
                ))}
              </g>
            ))}
          </svg>
        </div>
      );
    case "inventory":
      return (
        <div className={`${common}`} style={{ border: "1px solid var(--boundary)" }}>
          <svg viewBox="0 0 80 24" className="w-full h-full p-1" fill="none">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={4 + i * 18} y={4 + (i % 2) * 4} width="14" height="10" rx="1"
                stroke="var(--active)" strokeWidth="0.5" opacity={0.3 - i * 0.05} />
            ))}
          </svg>
        </div>
      );
    case "whatsapp":
      return (
        <div className={`${common}`} style={{ border: "1px solid var(--boundary)" }}>
          <svg viewBox="0 0 80 24" className="w-full h-full p-1" fill="none">
            <rect x="4" y="10" width="26" height="10" rx="3" stroke="var(--active)" strokeWidth="0.5" opacity="0.35" />
            <rect x="40" y="4" width="28" height="10" rx="3" stroke="var(--active)" strokeWidth="0.5" opacity="0.25" />
            <rect x="8" y="13" width="14" height="1.5" rx="0.3" fill="var(--active)" opacity="0.3" />
            <rect x="44" y="7" width="16" height="1.5" rx="0.3" fill="var(--active)" opacity="0.2" />
          </svg>
        </div>
      );
    case "tasks":
      return (
        <div className={`${common}`} style={{ border: "1px solid var(--boundary)" }}>
          <svg viewBox="0 0 80 24" className="w-full h-full p-1" fill="none">
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={4} y={4 + i * 7} width="14" height="5" rx="1" stroke="var(--active)" strokeWidth="0.4" opacity="0.25" />
                <path d={`M7 ${6.5 + i * 7} L9 ${8.5 + i * 7} L13 ${4.5 + i * 7}`} stroke="var(--active)" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <rect x={22} y={5 + i * 7} width={40 - i * 8} height="2" rx="0.5" fill="var(--measure-dim)" opacity="0.1" />
              </g>
            ))}
          </svg>
        </div>
      );
    case "reports":
      return (
        <div className={`${common}`} style={{ border: "1px solid var(--boundary)" }}>
          <svg viewBox="0 0 80 24" className="w-full h-full p-1" fill="none">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={6 + i * 14} y={6 + (4 - i) * 2.5} width="10" height={(i + 1) * 2.5 + 2} rx="0.5"
                fill="var(--active)" opacity={0.06 + i * 0.03}
                stroke="var(--active)" strokeWidth="0.3" />
            ))}
          </svg>
        </div>
      );
    case "tickets":
      return (
        <div className={`${common}`} style={{ border: "1px solid var(--boundary)" }}>
          <svg viewBox="0 0 80 24" className="w-full h-full p-1" fill="none">
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={4} y={3 + i * 7} width="8" height="5" rx="1" stroke="var(--active)" strokeWidth="0.4" opacity="0.25" />
                <rect x={14} y={3 + i * 7} width="40" height="5" rx="0.5" fill="var(--active)" opacity="0.04" stroke="var(--active)" strokeWidth="0.3" />
                <circle cx={57} cy={5.5 + i * 7} r="2" fill="var(--active)" opacity="0.15" />
                <circle cx={57} cy={5.5 + i * 7} r="0.8" fill="var(--active)" opacity="0.4" />
              </g>
            ))}
          </svg>
        </div>
      );
  }
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
          background: isSolution ? "var(--active)" : "var(--measure-dim)",
        }}
      />
      <span
        className="text-[clamp(14px,1.6vw,15px)]"
        style={{
          color: isSolution ? "var(--measure)" : "var(--measure-secondary)",
          fontWeight: isSolution ? 400 : 400,
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
      <motion.h3 className="text-[clamp(15px,2.5vw,20px)] font-semibold text-center"
        style={{ color: "var(--pb-text)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
        {problem.title}
      </motion.h3>
      <div className="flex flex-col gap-2 flex-1 min-h-0" style={{ perspective: "800px" }}>
        {/* Header row */}
        <div className="flex items-stretch gap-2.5 shrink-0">
          <span className="flex-1 text-[clamp(10px,1.2vw,11px)] font-semibold uppercase tracking-wider text-left"
            style={{ color: "var(--measure-dim)" }}>
            Antes
          </span>
          <div className="shrink-0 w-5" />
          <span className="flex-1 text-[clamp(10px,1.2vw,11px)] font-semibold uppercase tracking-wider text-right"
            style={{ color: "var(--active)" }}>
            Después
          </span>
        </div>
        <div className="flex items-stretch gap-2.5 flex-1 min-h-0">
          <motion.div className="flex-1 rounded-xl p-[clamp(12px,1.5vw,18px)] flex flex-col gap-1.5"
            style={{
              background: "color-mix(in srgb, var(--pb-module) 50%, transparent)",
              border: "1px solid var(--boundary)",
            }}
            initial={{ opacity: 0, rotateY: -6, x: -8 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            {/* Stat */}
            <motion.div className="text-[clamp(28px,4vw,44px)] font-light tabular-nums leading-none text-center mb-1"
              style={{ color: "var(--measure-dim)" }}
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}>
              {problem.stat}
              <span className="text-[clamp(10px,1.2vw,14px)] font-mono ml-1" style={{ color: "var(--measure-dim)" }}>menos</span>
            </motion.div>
            <AnimatePresence mode="popLayout">
              <div className="flex flex-col gap-1.5">
                {problem.before.map((item, i) => (
                  <TransformItem key={problem.id + "-b-" + i}
                    idx={i} problemId={problem.id} side="before" text={item} isSolution={false} />
                ))}
              </div>
            </AnimatePresence>
          </motion.div>

          {/* Arrow */}
          <div className="flex items-center justify-center shrink-0">
            <motion.div
              key={problem.id + "-arr"}
              className="w-6 h-6 flex items-center justify-center rounded-full text-[clamp(12px,1.1vw,15px)]"
              style={{ background: "var(--active)", color: "#fff" }}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              →
            </motion.div>
          </div>

          <motion.div className="flex-1 rounded-xl p-[clamp(12px,1.5vw,18px)] flex flex-col gap-1.5 relative overflow-hidden"
            style={{
              background: "var(--substrate)",
              border: "1px solid var(--boundary)",
            }}
            initial={{ opacity: 0, rotateY: 6, x: 8 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "var(--active)" }} />
            <AnimatePresence mode="popLayout">
              <div className="flex flex-col gap-1">
                {problem.after.map((item, i) => (
                  <TransformItem key={problem.id + "-a-" + i}
                    idx={i} problemId={problem.id} side="after" text={item} isSolution={true} />
                ))}
              </div>
            </AnimatePresence>
          {/* Mockup */}
          <div className="mt-2">
            <SolutionMockup type={problem.id} />
          </div>
        </motion.div>
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
    <div className="h-full w-full flex flex-col overflow-hidden relative bg-warm-ambient">
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />

      {/* Top: header + nodes */}
      <div className="shrink-0 flex flex-col overflow-hidden relative z-10">
        <div className="shrink-0 text-center pt-[clamp(20px,3vh,32px)] pb-[clamp(10px,1.5vh,16px)] px-4 max-w-2xl lg:max-w-3xl mx-auto w-full">
          <h2 className="text-[clamp(20px,3vw,32px)] font-semibold tracking-tight"
            style={{ color: "var(--pb-text)" }}>
            ¿Qué está frenando tu negocio?
          </h2>
          <p className="text-[clamp(12px,1.5vw,15px)] mt-1"
            style={{ color: "var(--measure-dim)" }}>
            Toca un problema para ver su solución
          </p>
        </div>

        <div className="relative flex items-center justify-center px-4 pb-[clamp(12px,2vh,20px)]">
          <div className="relative w-full max-w-lg lg:max-w-2xl">
            <EnergyLines gridRef={gridRef} activeIndex={activeIndex} />
            <div ref={gridRef}
              className="grid grid-cols-3 lg:flex lg:justify-between gap-y-[clamp(14px,2.5vh,24px)] w-full relative z-10">
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
      <div className="flex-1 min-h-0 px-4 pb-[clamp(12px,2vh,16px)] max-w-2xl lg:max-w-3xl mx-auto w-full relative z-10">
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
