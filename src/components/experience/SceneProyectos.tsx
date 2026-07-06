"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── PROJECT DATA ───

interface Project {
  id: string; category: string; title: string;
  problem: string; solution: string; howItWorks: string[];
  tech: string[]; results: string[]; url: string;
  icon: string; resultHighlight: string;
}

const projects: Project[] = [
  {
    id: "fabiancuts",
    category: "Landing Page",
    title: "FabianCuts",
    problem: "Una barbería premium en Mafil no tenía presencia digital. Perdían clientes porque no aparecían en Google ni podían mostrar su trabajo. El agendamiento era solo por llamada, con cancelaciones frecuentes y sin recordatorios.",
    solution: "Landing page profesional con galería visual de cortes, carta de servicios con precios, mapa interactivo y agendamiento directo por WhatsApp. SEO local optimizado.",
    howItWorks: ["El cliente descubre el sitio desde Google o redes sociales", "Navega la galería de trabajos y revisa la carta de servicios", "Agenda su hora directamente por WhatsApp con un clic", "El barbero recibe la notificación al instante y confirma"],
    tech: ["Next.js", "Tailwind CSS"],
    results: [
      "Presencia digital activa 24/7",
      "Agendamiento sin intervención del barbero",
      "SEO local posicionado en Mafil",
      "Reducción de cancelaciones por recordatorio automático",
    ],
    url: "https://fabiancuts.pages.dev",
    icon: "landing",
    resultHighlight: "24/7",
  },
  {
    id: "kunstmann",
    category: "Sistema de Asistencia",
    title: "Kunstmann",
    problem: "Cervecería Kunstmann gestionaba las asistencias con planillas Excel. Retrasos en reportes, errores de carga manual y falta de visibilidad en tiempo real generaban desorden administrativo.",
    solution: "Sistema web de control de asistencia con registro digital, reportes automáticos por período, gestión de reemplazos, notificaciones a supervisores y dashboard en vivo.",
    howItWorks: ["Cada colaborador registra entrada/salida desde cualquier dispositivo", "Los supervisores ven el estado de su equipo en tiempo real", "El sistema genera reportes automáticos al cierre del período", "Alertas de ausencias y reemplazos sin intervención manual"],
    tech: ["PHP", "Python"],
    results: [
      "Fin de las planillas Excel",
      "Reportes generados automáticamente",
      "Visibilidad en tiempo real para supervisores",
      "Reducción de errores administrativos",
    ],
    url: "",
    icon: "clock",
    resultHighlight: "0 planillas",
  },
  {
    id: "municipal",
    category: "Gestión Municipal",
    title: "Sistema de Tickets",
    problem: "Una municipalidad gestionaba requerimientos internos sin un sistema centralizado. Los tickets se perdían entre correos y llamadas, no había trazabilidad y los tiempos de respuesta eran imposibles de medir.",
    solution: "Sistema interno de tickets con asignación automática por área, prioridades configurables, escalamiento y panel de reportes con indicadores SLA.",
    howItWorks: ["Cada funcionario crea un ticket desde el panel interno", "El sistema lo asigna automáticamente al área correspondiente", "Cada ticket tiene seguimiento, tiempos SLA y escalamiento", "Los reportes muestran métricas de gestión por área"],
    tech: ["PHP"],
    results: [
      "Centralización de todos los requerimientos internos",
      "Trazabilidad completa de cada ticket",
      "Reducción significativa de tiempos de respuesta",
      "Métricas SLA para gestión de áreas",
    ],
    url: "",
    icon: "ticket",
    resultHighlight: "100% centralizado",
  },
  {
    id: "gestion-clubes",
    category: "Plataforma Web",
    title: "Club Deportivo",
    problem: "Dirigir un club deportivo implica coordinar plantel, finanzas, tienda, auspiciadores y socios, todo por separado. Sin un sistema centralizado, los informes se hacen a mano, las cuentas se pierden y no hay forma de tener una página web actualizada en tiempo real.",
    solution: "Plataforma integral que unifica la gestión del club: cuentas del plantel, tienda online, módulo de auspiciadores, registro de socios y sitio web dinámico que se actualiza automáticamente. Con botón de venta exprés para días de partido, múltiples cuentas por rol e informes en tiempo real.",
    howItWorks: ["El club se registra y configura sus módulos: plantel, tienda, auspiciadores, socios", "Cada área tiene su propia cuenta con permisos según corresponda", "Los días de partido se activa el botón de venta en tiempo real", "El sitio web del club se genera automáticamente con toda la información actualizada", "Los informes financieros y de gestión se producen al instante"],
    tech: ["Next.js", "Tailwind CSS", "Node.js"],
    results: [
      "Club completamente ordenado en una sola plataforma",
      "Sitio web profesional actualizado en tiempo real",
      "Ventas exprés en días de partido sin intervención",
      "Informes financieros automáticos sin planillas",
      "Múltiples roles y cuentas según correspondencia",
    ],
    url: "",
    icon: "shield",
    resultHighlight: "Todo en uno",
  },
];

// ─── PROJECT ICONS ───

function ProjectIcon({ type }: { type: string }) {
  const base = { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none", className: "shrink-0" };
  switch (type) {
    case "landing":
      return (
        <svg {...base}>
          <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <line x1="4" y1="11" x2="24" y2="11" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="14" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M13 16 L11 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "clock":
      return (
        <svg {...base}>
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.2" />
          <polyline points="14,8 14,14 18,16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="14" r="2" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...base}>
          <path d="M5 10 L23 10 L23 18 L5 18 Z" stroke="currentColor" strokeWidth="1.2" rx="1" />
          <circle cx="14" cy="14" r="2" stroke="currentColor" strokeWidth="1.2" />
          <line x1="9" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="17" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...base}>
          <path d="M14 4 L24 9 L24 16 C24 21 14 26 14 26 C14 26 4 21 4 16 L4 9 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <polyline points="10,14 13,17 18,11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default: return null;
  }
}

// ─── EXPANDED VIEW — CÓMO FUNCIONA ───

function HowItWorksSection({ steps }: { steps: string | string[] }) {
  const items = Array.isArray(steps) ? steps : [steps];
  return (
    <div className="mb-6">
      <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest mb-3"
        style={{ fontFamily: "ui-monospace,monospace", color: "var(--measure-dim)" }}>
        CÓMO FUNCIONA
      </p>
          <div className="flex flex-col gap-2">
            {items.map((step, i) => (
              <div key={i} className="flex items-start gap-2.5 a-step-item"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium"
                  style={{ background: "var(--active-dim)", color: "var(--active)" }}>
                  {i + 1}
                </span>
                <span className="text-[clamp(13px,2vw,16px)] font-light leading-relaxed"
                  style={{ color: "var(--measure)" }}>
                  {step}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}

// ─── MAIN ───

export function SceneProyectos() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const openCase = (id: string) => {
    setIsClosing(false);
    setExpandedId(id);
  };

  const closeCase = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setExpandedId(null);
      setIsClosing(false);
    }, 300);
  }, []);

  return (
    <section className="h-dvh overflow-hidden relative" style={{ background: "var(--substrate)" }}>
      {/* Background — minimal dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" style={{ maskImage: "linear-gradient(180deg,transparent,black 25%,black 75%,transparent)" }}>
          <defs>
            <pattern id="pdots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.8" fill="var(--measure)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pdots)" />
        </svg>
      </div>

      <div
        ref={listRef}
        className="h-full overflow-y-auto px-6 py-12 transition-all duration-400 ease-out relative z-[1]"
        style={{
          width: isDesktop && expandedId && !isClosing ? "35%" : "100%",
          borderRight: isDesktop && expandedId && !isClosing ? "1px solid var(--boundary)" : "none",
        }}>
        <div className={isDesktop && expandedId && !isClosing ? "" : "max-w-2xl mx-auto"}>
          <p className="text-[clamp(9px,1.3vw,11px)] tracking-[0.2em] mb-1 a-fu"
            style={{ fontFamily: "ui-monospace,monospace", color: "var(--active)" }}>
            PROYECTOS
          </p>
          <p className="text-[clamp(20px,4vw,36px)] font-light tracking-tight mb-6 a-fu a-d1"
            style={{ color: "var(--measure)" }}>
            Lo que <span style={{ color: "var(--active)" }}>hemos construido</span>
          </p>

          <div className="space-y-2 relative">
            {projects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => openCase(p.id)}
                className="rounded-[10px] cursor-pointer select-none px-4 py-3.5 flex items-start gap-3 relative overflow-hidden group a-card-item"
                style={{
                  border: "1px solid var(--boundary)",
                  background: "var(--substrate)",
                  animationDelay: `${idx * 0.1}s`,
                  transition: "scale 0.2s cubic-bezier(0.16,1,0.3,1), border-color 0.2s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.scale = "1.015"; e.currentTarget.style.borderColor = "var(--active)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.scale = "1"; e.currentTarget.style.borderColor = "var(--boundary)"; }}>
                {/* Accent dot */}
                <div className="shrink-0 w-1 self-stretch rounded-full" style={{ background: "var(--active)", opacity: 0.4 }} />
                <ProjectIcon type={p.icon} />
                <div className="min-w-0 flex-1">
                  <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest mb-0.5"
                    style={{ fontFamily: "ui-monospace,monospace", color: "var(--active)" }}>
                    {p.category}
                  </p>
                  <p className="text-[clamp(14px,2.2vw,18px)] font-light"
                    style={{ color: "var(--measure)" }}>
                    {p.title}
                  </p>
                  {/* Mini result */}
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] font-medium tabular-nums a-fi" style={{ color: "var(--active)", animationDelay: `${0.15 + idx * 0.1}s` }}>
                      {p.resultHighlight}
                    </span>
                    <span className="text-[9px]" style={{ color: "var(--measure-dim)" }}>· {p.results[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <p className="text-center text-[10px] mt-6 tracking-wider a-fi"
            style={{ color: "var(--measure-dim)", animationDelay: "0.5s" }}>
            Toca cada proyecto para ver el detalle
          </p>
        </div>
      </div>

      {expandedId && (() => {
        const p = projects.find((x) => x.id === expandedId);
        if (!p) return null;

        return (
          <div
            key={p.id}
            className={"fixed right-0 bottom-0 top-0 overflow-y-auto " + (isClosing ? "a-panel-exit" : "a-panel-enter")}
            data-scene-lock=""
            style={{
              background: "var(--substrate)",
              width: isDesktop ? "65%" : "100%",
              zIndex: isDesktop ? 1 : 50,
              borderLeft: isDesktop ? "1px solid var(--boundary)" : "none",
            }}>
            <div className="min-h-dvh max-w-2xl mx-auto px-6 py-10">
              <button
                onClick={closeCase}
                className="mb-6 text-[clamp(12px,1.6vw,14px)] select-none flex items-center gap-1"
                style={{ color: "var(--measure-dim)" }}>
                ← Volver
              </button>

              {/* Header with icon */}
              <div className="flex items-start gap-3 mb-8">
                <ProjectIcon type={p.icon} />
                <div>
                  <p className="text-[clamp(9px,1.3vw,11px)] tracking-[0.2em] mb-1"
                    style={{ fontFamily: "ui-monospace,monospace", color: "var(--active)" }}>
                    {p.category}
                  </p>
                  <h2 className="text-[clamp(28px,5vw,48px)] font-light tracking-tight"
                    style={{ color: "var(--measure)" }}>
                    {p.title}
                  </h2>
                </div>
              </div>

              <Section label="PROBLEMA">
                {p.problem}
              </Section>
              <Section label="SOLUCIÓN">
                {p.solution}
              </Section>

              <HowItWorksSection steps={p.howItWorks} />

              <div className="mb-6">
                <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest mb-2"
                  style={{ fontFamily: "ui-monospace,monospace", color: "var(--measure-dim)" }}>
                  TECNOLOGÍAS
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[clamp(11px,1.6vw,13px)] px-2.5 py-1 rounded-[4px]"
                      style={{ border: "1px solid var(--boundary)", color: "var(--measure-dim)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8 p-4 rounded-[8px]"
                style={{ background: "var(--active-dim)", border: "1px solid var(--boundary)" }}>
                <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest mb-3"
                  style={{ fontFamily: "ui-monospace,monospace", color: "var(--measure-dim)" }}>
                  RESULTADOS
                </p>
                <ul className="space-y-2">
                  {p.results.map((r) => (
                    <li key={r} className="text-[clamp(13px,2vw,15px)] flex items-start gap-2"
                      style={{ color: "var(--measure)" }}>
                      <span style={{ color: "var(--active)" }}>→</span> {r}
                    </li>
                  ))}
                </ul>
              </div>

              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="inline-block text-[clamp(11px,1.5vw,13px)] px-4 py-2 rounded-[6px] transition-all duration-200"
                  style={{ border: "1px solid var(--active)", color: "var(--active)" }}>
                  Ver proyecto live →
                </a>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
}

function Section({ label, children }: { label: string; children: string }) {
  return (
    <div className="mb-5">
      <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest mb-2"
        style={{ fontFamily: "ui-monospace,monospace", color: "var(--measure-dim)" }}>
        {label}
      </p>
      <p className="text-[clamp(13px,2vw,16px)] font-light leading-relaxed"
        style={{ color: "var(--measure)" }}>
        {children}
      </p>
    </div>
  );
}
