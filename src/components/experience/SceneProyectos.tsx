"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string; category: string; title: string;
  problem: string; solution: string; howItWorks: string;
  tech: string[]; results: string[]; url: string;
}

const projects: Project[] = [
  {
    id: "fabiancuts",
    category: "Landing Page",
    title: "FabianCuts",
    problem: "Una barbería premium en Mafil no tenía presencia digital. Perdían clientes porque no aparecían en Google ni podían mostrar su trabajo. El agendamiento era solo por llamada, con cancelaciones frecuentes y sin recordatorios.",
    solution: "Landing page profesional con galería visual de cortes, carta de servicios con precios, mapa interactivo y agendamiento directo por WhatsApp. SEO local optimizado.",
    howItWorks: "El cliente llega al sitio, navega la galería de trabajos, revisa la carta de servicios y agenda directamente por WhatsApp con un clic. El barbero recibe la notificación al instante.",
    tech: ["Next.js", "Tailwind CSS"],
    results: [
      "Presencia digital activa 24/7",
      "Agendamiento sin intervención del barbero",
      "SEO local posicionado en Mafil",
      "Reducción de cancelaciones por recordatorio automático",
    ],
    url: "https://fabiancuts.pages.dev",
  },
  {
    id: "kunstmann",
    category: "Sistema de Asistencia",
    title: "Kunstmann",
    problem: "Cervecería Kunstmann gestionaba las asistencias con planillas Excel. Retrasos en reportes, errores de carga manual y falta de visibilidad en tiempo real generaban desorden administrativo.",
    solution: "Sistema web de control de asistencia con registro digital, reportes automáticos por período, gestión de reemplazos, notificaciones a supervisores y dashboard en vivo.",
    howItWorks: "Cada colaborador registra su entrada/salida desde cualquier dispositivo. Los supervisores ven el estado en tiempo real. Los reportes se generan automáticamente al cierre del período sin intervención manual.",
    tech: ["PHP", "Python"],
    results: [
      "Fin de las planillas Excel",
      "Reportes generados automáticamente",
      "Visibilidad en tiempo real para supervisores",
      "Reducción de errores administrativos",
    ],
    url: "",
  },
  {
    id: "municipal",
    category: "Gestión Municipal",
    title: "Sistema de Tickets",
    problem: "Una municipalidad gestionaba requerimientos internos sin un sistema centralizado. Los tickets se perdían entre correos y llamadas, no había trazabilidad y los tiempos de respuesta eran imposibles de medir.",
    solution: "Sistema interno de tickets con asignación automática por área, prioridades configurables, escalamiento y panel de reportes con indicadores SLA.",
    howItWorks: "Cada funcionario crea un ticket desde el panel interno. El sistema lo asigna automáticamente al área correspondiente. Cada ticket tiene seguimiento, tiempos SLA y escalamiento si no se resuelve a tiempo.",
    tech: ["PHP"],
    results: [
      "Centralización de todos los requerimientos internos",
      "Trazabilidad completa de cada ticket",
      "Reducción significativa de tiempos de respuesta",
      "Métricas SLA para gestión de áreas",
    ],
    url: "",
  },
];

export function SceneProyectos() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<{ top: number; height: number } | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const openCase = (id: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setOrigin({ top: rect.top, height: rect.height });
    setExpandedId(id);
  };

  const closeCase = () => {
    setExpandedId(null);
  };

  return (
    <section className="h-dvh overflow-hidden" style={{ background: "var(--substrate)" }}>
      <div
        ref={listRef}
        className="h-full overflow-y-auto px-6 py-12 transition-all duration-400 ease-out"
        style={{
          width: isDesktop && expandedId ? "35%" : "100%",
          borderRight: isDesktop && expandedId ? "1px solid var(--boundary)" : "none",
        }}>
        <div className={isDesktop && expandedId ? "" : "max-w-2xl mx-auto"}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(9px,1.3vw,11px)] tracking-[0.2em] mb-1"
            style={{ fontFamily: "ui-monospace,monospace", color: "var(--active)" }}>
            PROYECTOS
          </motion.p>
          <p className="text-[clamp(20px,4vw,36px)] font-light tracking-tight mb-8"
            style={{ color: "var(--measure)" }}>
            Casos de ingeniería
          </p>

          <div className="space-y-2">
            {projects.map((p) => (
              <div
                key={p.id}
                onClick={(e) => openCase(p.id, e)}
                className="rounded-[8px] cursor-pointer select-none px-4 py-3 flex items-center justify-between"
                style={{
                  border: "1px solid var(--boundary)",
                  background: "var(--active-dim)",
                }}>
                <div className="min-w-0">
                  <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest"
                    style={{ fontFamily: "ui-monospace,monospace", color: "var(--active)" }}>
                    {p.category}
                  </p>
                  <p className="text-[clamp(15px,2.4vw,19px)] font-light truncate"
                    style={{ color: "var(--measure)" }}>
                    {p.title}
                  </p>
                </div>
                <span className="text-[clamp(18px,2.5vw,24px)] shrink-0 ml-3"
                  style={{ color: "var(--measure-dim)" }}>
                  ›
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expandedId && (() => {
          const p = projects.find((x) => x.id === expandedId);
          if (!p) return null;

          return (
            <motion.div
              key={p.id}
              initial={isDesktop ? { opacity: 0, x: 40 } : {
                opacity: 0,
                scale: 0.92,
                y: (origin?.top ?? 0) - 12,
                height: origin?.height,
                borderRadius: 8,
              }}
              animate={isDesktop ? { opacity: 1, x: 0 } : {
                opacity: 1,
                scale: 1,
                y: 0,
                height: "auto",
                borderRadius: 0,
              }}
              exit={isDesktop ? { opacity: 0, x: 40 } : {
                opacity: 0,
                scale: 0.92,
                y: (origin?.top ?? 0) - 12,
                height: origin?.height,
                borderRadius: 8,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 bottom-0 top-0 overflow-y-auto"
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

                <p className="text-[clamp(9px,1.3vw,11px)] tracking-[0.2em] mb-2"
                  style={{ fontFamily: "ui-monospace,monospace", color: "var(--active)" }}>
                  {p.category}
                </p>
                <h2 className="text-[clamp(28px,5vw,48px)] font-light tracking-tight mb-8"
                  style={{ color: "var(--measure)" }}>
                  {p.title}
                </h2>

                <Section label="PROBLEMA — ¿Cuál era el problema?">
                  {p.problem}
                </Section>
                <Section label="SOLUCIÓN — ¿Qué construimos?">
                  {p.solution}
                </Section>
                <Section label="CÓMO FUNCIONA — Demo">
                  {p.howItWorks}
                </Section>

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
                    RESULTADOS — ¿Qué cambió?
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
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}

function Section({ label, children }: { label: string; children: string }) {
  return (
    <div className="mb-6">
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
