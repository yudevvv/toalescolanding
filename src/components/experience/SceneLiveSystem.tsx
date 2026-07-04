"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── ECOSYSTEM ───

const nodes = [
  { x: 12, y: 22 }, { x: 78, y: 18 }, { x: 52, y: 32 },
  { x: 18, y: 58 }, { x: 82, y: 48 }, { x: 48, y: 68 },
  { x: 68, y: 72 }, { x: 28, y: 78 },
];

const connections = [[0,1],[0,2],[1,2],[2,3],[2,4],[3,5],[4,5],[5,6],[6,7],[3,7],[1,4],[0,3]];

function Ecosystem() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" style={{ opacity: 0.15 }}>
        {connections.map(([a, b], i) => (
          <g key={i}>
            <line x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`} x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
              stroke="var(--pb-solution)" strokeWidth="0.5" opacity="0.3" />
            <motion.line x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`} x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
              stroke="var(--pb-energy)" strokeWidth="1" strokeDasharray="3 10" opacity="0.25"
              animate={{ strokeDashoffset: [0, -26] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.12 }} />
          </g>
        ))}
        {nodes.map((n, i) => (
          <motion.circle key={i} cx={`${n.x}%`} cy={`${n.y}%`} r="2.5" fill="var(--pb-solution)" opacity="0.2"
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </svg>
      {[0,1,2,3,4].map((i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ width: 2, height: 2, background: "var(--pb-energy)", left: `${15 + i * 16}%` }}
          animate={{ top: [`${20 + i * 8}%`, `${15 + i * 8}%`, `${20 + i * 8}%`], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }} />
      ))}
    </div>
  );
}

// ─── INTERFACE PANELS ───

function PanelLanding() {
  return (
    <div className="w-full max-w-xs lg:max-w-md mx-auto rounded-xl overflow-hidden"
      style={{ background: "var(--pb-module)", border: "1px solid var(--boundary)" }}>
      <div className="h-1.5" style={{ background: "var(--pb-energy)" }} />
      <div className="p-3 sm:p-4">
        <div className="text-[9px] font-semibold tracking-wider mb-2" style={{ color: "var(--measure-dim)" }}>toalesco.cl/lead</div>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--pb-text)" }}>¿Listo para digitalizar tu negocio?</h3>
        <div className="flex flex-col gap-1.5 mb-2">
          {[
            { label: "Nombre", value: "Juan Pérez" },
            { label: "Email", value: "juan@email.com" },
            { label: "Teléfono", value: "+56 9 1234 5678" },
          ].map((f) => (
            <div key={f.label} className="text-[10px]">
              <span style={{ color: "var(--measure-dim)" }}>{f.label}</span>
              <div className="h-6 rounded-md px-2 flex items-center text-xs" style={{ background: "color-mix(in srgb, var(--substrate) 85%, var(--measure))", color: "var(--pb-text)" }}>{f.value}</div>
            </div>
          ))}
        </div>
        <motion.div className="h-7 rounded-md flex items-center justify-center text-xs font-medium"
          style={{ background: "var(--pb-energy)", color: "#fff" }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}>
          Enviar → Enviado ✓
        </motion.div>
      </div>
    </div>
  );
}

function PanelExcel() {
  return (
    <div className="w-full max-w-xs lg:max-w-md mx-auto rounded-xl overflow-hidden"
      style={{ background: "var(--pb-module)", border: "1px solid var(--boundary)" }}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b text-[10px] font-mono" style={{ borderColor: "var(--boundary)", color: "var(--measure-dim)" }}>
        <span style={{ color: "#22C55E" }}>●</span> inventario_automatico.py
      </div>
      <div className="p-3">
        <div className="flex gap-1 mb-2">
          {["Producto", "Stock", "Precio", "Total"].map((h) => (
            <div key={h} className="flex-1 text-[8px] font-semibold" style={{ color: "var(--measure-dim)" }}>{h}</div>
          ))}
        </div>
        {[
          { name: "Zapatos", stock: 45, price: "15.990", total: "719.550" },
          { name: "Camisetas", stock: 3, price: "9.990", total: "29.970" },
          { name: "Gorras", stock: 12, price: "12.500", total: "150.000" },
          { name: "Chaquetas", stock: 8, price: "45.000", total: "360.000" },
        ].map((row, i) => (
          <div key={i} className="flex gap-1 py-1 text-[10px] border-b" style={{ borderColor: "var(--boundary)" }}>
            <span className="flex-1 font-medium" style={{ color: "var(--pb-text)" }}>{row.name}</span>
            <motion.span className="flex-1 font-mono tabular-nums" style={{ color: row.stock < 5 ? "#EF4444" : "var(--pb-text)" }}
              animate={row.stock < 5 ? { opacity: [1, 0.4, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}>
              {row.stock}
            </motion.span>
            <span className="flex-1 font-mono" style={{ color: "var(--pb-text)" }}>{row.price}</span>
            <span className="flex-1 font-mono" style={{ color: "var(--pb-text)" }}>{row.total}</span>
          </div>
        ))}
        <motion.div className="mt-2 text-[9px] font-mono" style={{ color: "#6366F1" }}
          animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          &gt; alerta_stock_bajo("Camisetas") → Pedido automático generado ✓
        </motion.div>
      </div>
    </div>
  );
}

function PanelPython() {
  const [step, setStep] = useState(0);
  const lines = [
    { text: "> import toalesco.engine as te", color: "#6366F1" },
    { text: "> te.load_clientes('whatsapp')", color: "#6366F1" },
    { text: "  ✓ 12 mensajes nuevos procesados", color: "#22C55E" },
    { text: "> te.clasificar_lead(messages)", color: "#6366F1" },
    { text: "  ✓ 3 leads identificados como calientes", color: "#22C55E" },
    { text: "> te.asignar_crm(leads_calientes)", color: "#6366F1" },
    { text: "  ✓ Leads asignados a ejecutivo", color: "#22C55E" },
    { text: "> te.enviar_bienvenida(leads)", color: "#6366F1" },
    { text: "  ✓ Secuencia de emails activada", color: "#22C55E" },
    { text: "> te.sincronizar_dashboard()", color: "#6366F1" },
    { text: "  ✓ Dashboard actualizado en tiempo real", color: "#22C55E" },
    { text: "", color: "transparent" },
  ];

  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % lines.length), 350);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div className="w-full max-w-xs lg:max-w-md mx-auto rounded-xl overflow-hidden"
      style={{ background: "#0A0E17", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b text-[10px]" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#F59E0B" }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
        </div>
        <span className="ml-2 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>toalesco_engine — bash</span>
      </div>
      <div className="p-3 font-mono text-[11px] leading-relaxed">
        {lines.slice(0, step + 1).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }} style={{ color: line.color }}>
            {line.text || "\u00A0"}
          </motion.div>
        ))}
        <motion.span style={{ color: "#22C55E" }}
          animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
          ▊
        </motion.span>
      </div>
    </div>
  );
}

function PanelDashboard() {
  return (
    <div className="w-full max-w-xs lg:max-w-md mx-auto rounded-xl overflow-hidden"
      style={{ background: "var(--pb-module)", border: "1px solid var(--boundary)" }}>
      <div className="flex items-center gap-2 px-3 py-1.5 border-b text-[9px] font-semibold tracking-wider" style={{ borderColor: "var(--boundary)", color: "var(--measure-dim)" }}>
        <span style={{ color: "var(--pb-solution)" }}>◉</span> Dashboard · TOALESCO
        <motion.span className="ml-auto" style={{ color: "#22C55E" }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          ● En vivo
        </motion.span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: "Ventas", value: "$2.340", change: "+12%", color: "var(--pb-energy)" },
            { label: "Leads", value: "18", change: "+5", color: "var(--pb-solution)" },
            { label: "Conversión", value: "4.2%", change: "+0.8%", color: "#22C55E" },
          ].map((k) => (
            <div key={k.label} className="text-center">
              <div className="text-[8px]" style={{ color: "var(--measure-dim)" }}>{k.label}</div>
              <motion.div className="text-sm font-bold tabular-nums mt-0.5" style={{ color: k.color }}
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                {k.value}
              </motion.div>
              <div className="text-[8px]" style={{ color: "#22C55E" }}>{k.change}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 h-14">
          {[35, 55, 42, 78, 61, 89, 73].map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t-sm" style={{ background: "var(--pb-solution)" }}
              animate={{ height: `${h + (i % 3) * 5}%` }} transition={{ duration: 0.8, delay: i * 0.04 }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, idx) => (
            <span key={idx} className="text-[7px]" style={{ color: "var(--measure-dim)" }}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelCRM() {
  const [statuses, setStatuses] = useState(["Nuevo", "En seguimiento", "Contactado", "Cerrado"]);
  useEffect(() => {
    const interval = setInterval(() => {
      setStatuses((prev) => {
        const next = [...prev];
        const statusOrder = ["Nuevo", "En seguimiento", "Contactado", "Cerrado"];
        for (let i = 0; i < next.length; i++) {
          const idx = statusOrder.indexOf(next[i]);
          if (idx < statusOrder.length - 1 && Math.random() > 0.4) {
            next[i] = statusOrder[idx + 1];
          }
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xs lg:max-w-md mx-auto rounded-xl overflow-hidden"
      style={{ background: "var(--pb-module)", border: "1px solid var(--boundary)" }}>
      <div className="flex items-center gap-2 px-3 py-1.5 border-b text-[9px]" style={{ borderColor: "var(--boundary)", color: "var(--measure-dim)" }}>
        <span style={{ color: "var(--pb-solution)", fontWeight: 600 }}>CRM</span>
        <span className="ml-auto">12 contactos activos</span>
      </div>
      <div className="p-3 flex flex-col gap-1">
        {[
          { name: "María García", source: "WhatsApp", statusIdx: 0 },
          { name: "Pedro López", source: "Landing", statusIdx: 1 },
          { name: "Ana Martínez", source: "Instagram", statusIdx: 2 },
          { name: "Carlos Soto", source: "WhatsApp", statusIdx: 3 },
        ].map((contact, i) => {
          const status = statuses[contact.statusIdx] || "Nuevo";
          return (
            <div key={contact.name} className="flex items-center gap-2 py-1.5 text-xs border-b" style={{ borderColor: "var(--boundary)" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium shrink-0"
                style={{ background: "color-mix(in srgb, var(--pb-solution) 10%, transparent)", color: "var(--pb-solution)" }}>
                {contact.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <span style={{ color: "var(--pb-text)" }}>{contact.name}</span>
                <span className="block text-[9px]" style={{ color: "var(--measure-dim)" }}>{contact.source}</span>
              </div>
              <motion.span className="text-[9px] px-1.5 py-0.5 rounded-full shrink-0"
                style={{
                  background: status === "Nuevo" ? "rgba(232,164,71,0.12)" : status === "Cerrado" ? "rgba(34,197,94,0.12)" : "rgba(41,100,242,0.1)",
                  color: status === "Nuevo" ? "var(--pb-energy)" : status === "Cerrado" ? "#22C55E" : "var(--pb-solution)",
                }}
                key={status} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}>
                {status}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PanelInventory() {
  const [stock, setStock] = useState({ Zapatos: 45, Camisetas: 3, Gorras: 12, Chaquetas: 8 });
  const [alert, setAlert] = useState<string | null>(null);
  const tick = useRef(0);
  useEffect(() => {
    const interval = setInterval(() => {
      tick.current++;
      const prod = ["Camisetas", "Gorras", "Zapatos"][tick.current % 3];
      setStock((s) => ({ ...s, [prod]: Math.max(1, s[prod as keyof typeof s] + (Math.random() > 0.5 ? 1 : -1)) }));
      if (tick.current % 3 === 0) {
        setAlert(`📦 Pedido recibido: ${Math.floor(Math.random() * 15 + 10)} unidades`);
        setTimeout(() => setAlert(null), 2500);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xs lg:max-w-md mx-auto rounded-xl overflow-hidden"
      style={{ background: "var(--pb-module)", border: "1px solid var(--boundary)" }}>
      <div className="flex items-center gap-2 px-3 py-1.5 border-b text-[9px]" style={{ borderColor: "var(--boundary)", color: "var(--measure-dim)" }}>
        <span style={{ color: "var(--pb-solution)", fontWeight: 600 }}>Inventario</span>
        <motion.span className="ml-auto text-[8px]" style={{ color: "#22C55E" }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          ● Sincronizado
        </motion.span>
      </div>
      <div className="p-3">
        {Object.entries(stock).map(([product, qty]) => (
          <div key={product} className="flex items-center gap-2 py-1 text-xs border-b" style={{ borderColor: "var(--boundary)" }}>
            <span className="flex-1 font-medium" style={{ color: "var(--pb-text)" }}>{product}</span>
            <motion.span className="font-mono tabular-nums w-6 text-right" style={{ color: qty < 5 ? "#EF4444" : "var(--pb-text)" }}
              key={qty} initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}>
              {qty}
            </motion.span>
            <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--boundary)" }}>
              <motion.div className="h-full rounded-full" style={{ background: qty < 5 ? "#EF4444" : "var(--pb-solution)" }}
                animate={{ width: `${Math.min(100, (qty / 60) * 100)}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>
        ))}
        <AnimatePresence>
          {alert && (
            <motion.div className="text-[10px] mt-1.5 pt-1.5 border-t" style={{ borderColor: "var(--boundary)", color: "var(--pb-solution)" }}
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {alert}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── PANEL DATA ───

const panels = [
  { key: "landing", component: PanelLanding, label: "Landing Page · Captación de leads" },
  { key: "excel", component: PanelExcel, label: "Inventario · Automatización de datos" },
  { key: "python", component: PanelPython, label: "TOALESCO Engine · Automatización inteligente" },
  { key: "dashboard", component: PanelDashboard, label: "Dashboard · Métricas en tiempo real" },
  { key: "crm", component: PanelCRM, label: "CRM · Gestión de clientes automatizada" },
  { key: "inventory", component: PanelInventory, label: "Inventario · Stock sincronizado" },
];

// ─── ENDING ───

function Ending() {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <motion.p className="text-[clamp(18px,3.5vw,34px)] font-light leading-snug max-w-xs lg:max-w-md"
        style={{ color: "var(--measure)" }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        Mientras trabajas…
        <span className="block mt-1 font-normal" style={{ color: "var(--measure-secondary)" }}>
          tu negocio sigue funcionando.
        </span>
      </motion.p>
      <motion.div
        className="w-12 h-px" style={{ background: "var(--boundary)" }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.p className="text-[clamp(18px,3.5vw,34px)] font-light leading-snug max-w-xs lg:max-w-md"
        style={{ color: "var(--measure)" }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        La automatización no es velocidad.
        <span className="block mt-1 font-normal" style={{ color: "var(--pb-energy)" }}>
          Es libertad.
        </span>
      </motion.p>
    </div>
  );
}

// ─── MAIN ───

export function SceneLiveSystem() {
  const [panelIdx, setPanelIdx] = useState(0);
  const [phase, setPhase] = useState<"playing" | "ending" | "done">("playing");
  const [cycle, setCycle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "playing") return;
    const interval = setInterval(() => {
      setPanelIdx((i) => {
        if (i >= panels.length - 1) { setPhase("ending"); return i; }
        return i + 1;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === "ending") {
      const t = setTimeout(() => {
        setCycle((c) => c + 1);
        setPanelIdx(0);
        setPhase("playing");
      }, 7000); // 5s ending + 2s pause
      return () => clearTimeout(t);
    }
  }, [phase]);

  const current = panels[panelIdx];
  const dateStr = useMemo(() => {
    const d = new Date();
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return `${days[d.getDay()]} · ${d.getDate()} ${months[d.getMonth()]}`;
  }, []);

  return (
    <div ref={containerRef} data-scene-lock={cycle < 1 ? "live" : undefined}
      className="h-full w-full overflow-hidden relative flex flex-col select-none"
      style={{ background: "var(--substrate)", perspective: "1000px", WebkitTapHighlightColor: "transparent" }}>
      <Ecosystem />

      {/* Clock */}
      <div className="shrink-0 text-center pt-[clamp(10px,2.5vh,22px)] relative z-10">
        <motion.div className="text-[clamp(40px,10vw,96px)] font-light tracking-[0.08em] tabular-nums leading-none"
          style={{ color: "var(--measure)", fontFamily: "ui-monospace, monospace" }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          08:01
        </motion.div>
        <div className="text-[clamp(9px,1.5vw,12px)] font-mono mt-0.5 tracking-wider" style={{ color: "var(--measure-dim)" }}>
          {dateStr}
        </div>
      </div>

      {/* Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 min-h-0">
        <div className="w-full flex flex-col items-center" style={{ perspective: "800px" }}>
          <AnimatePresence mode="wait">
            {phase === "playing" ? (
              <motion.div key={current.key} className="w-full"
                initial={{ opacity: 0, rotateX: 4, y: 20 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: -4, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <current.component />
              </motion.div>
            ) : (
              <motion.div key="ending" className="w-full flex justify-center"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <Ending />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Panel label */}
        <AnimatePresence mode="wait">
          {phase === "playing" && (
            <motion.div className="mt-3 text-center"
              key={current.key}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}>
              <span className="text-[clamp(9px,1.5vw,12px)] font-medium" style={{ color: "var(--measure-secondary)" }}>
                {current.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
