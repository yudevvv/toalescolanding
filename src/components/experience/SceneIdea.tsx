"use client";

import { motion } from "framer-motion";

const transforms = [
  ["Instagram", "Tu propia plataforma."],
  ["Excel", "Un sistema inteligente."],
  ["WhatsApp", "Procesos automatizados."],
  ["Ideas", "Software."],
  ["Negocio", "Escalable."],
];

export function SceneIdea() {
  return (
    <section className="h-dvh flex items-center justify-center relative overflow-hidden px-6" style={{ background: "var(--substrate)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-xl">

        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(11px,1.6vw,14px)] font-mono tracking-[0.3em] mb-6"
          style={{ color: "var(--active)" }}>
          TOALESCO
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(32px,8vw,80px)] font-light leading-[1.1] tracking-tight mb-8"
          style={{ color: "var(--measure)" }}>
          Tu idea.<br />
          <span style={{ color: "var(--active)" }}>Nuestro software.</span>
        </motion.h1>

        <div className="space-y-1.5 mb-8">
          {transforms.map(([from, to], i) => (
            <motion.p
              key={from}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(13px,2vw,16px)] font-mono tracking-tight"
              style={{ color: "var(--measure)" }}>
              <span style={{ color: "var(--measure-dim)" }}>{from}</span>
              {" "}→{" "}
              <span style={{ color: "var(--active)" }}>{to}</span>
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(14px,2.2vw,18px)] font-light leading-relaxed max-w-lg"
          style={{ color: "var(--measure)" }}>
          Deja de adaptar tu negocio a las herramientas.{" "}
          <span style={{ color: "var(--active)", fontWeight: 450 }}>
            Construimos herramientas adaptadas a tu negocio.
          </span>
        </motion.p>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-10 text-[clamp(9px,1.3vw,11px)] tracking-widest select-none"
        style={{ color: "var(--measure-dim)", opacity: 0.25, fontFamily: "ui-monospace,monospace" }}>
        → desliza
      </motion.span>
    </section>
  );
}
