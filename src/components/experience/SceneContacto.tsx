"use client";

import { motion } from "framer-motion";

export function SceneContacto() {
  return (
    <section className="h-dvh flex items-center justify-center relative overflow-hidden px-6" style={{ background: "var(--substrate)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center w-full max-w-md text-center">

        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
          style={{ background: "var(--active-dim)", border: "1px solid var(--active)" }}>
          <span className="text-[clamp(14px,2vw,18px)] font-medium" style={{ color: "var(--active)" }}>T</span>
        </div>

        <h2 className="text-[clamp(28px,5vw,52px)] font-light tracking-tight mb-2"
          style={{ color: "var(--measure)" }}>
          TOALESCO
        </h2>
        <p className="text-[clamp(12px,1.8vw,15px)] font-light mb-8"
          style={{ color: "var(--measure-dim)" }}>
          Ingeniería de Software — Transformamos ideas en sistemas que funcionan.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="mailto:toalesco@tutamail.com"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-[8px] transition-all duration-200"
            style={{ border: "1px solid var(--boundary)", background: "var(--active-dim)" }}>
            <span className="text-[clamp(14px,2vw,18px)]">✉</span>
            <div className="text-left">
              <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest"
                style={{ fontFamily: "ui-monospace,monospace", color: "var(--measure-dim)" }}>EMAIL</p>
              <p className="text-[clamp(12px,1.8vw,15px)]" style={{ color: "var(--measure)" }}>toalesco@tutamail.com</p>
            </div>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            href="https://www.instagram.com/toalesco.cl/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-[8px] transition-all duration-200"
            style={{ border: "1px solid var(--boundary)", background: "var(--active-dim)" }}>
            <span className="text-[clamp(14px,2vw,18px)]">📷</span>
            <div className="text-left">
              <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest"
                style={{ fontFamily: "ui-monospace,monospace", color: "var(--measure-dim)" }}>INSTAGRAM</p>
              <p className="text-[clamp(12px,1.8vw,15px)]" style={{ color: "var(--measure)" }}>@toalesco.cl</p>
            </div>
            <span className="ml-auto text-[clamp(9px,1.3vw,11px)] px-2 py-0.5 rounded-full"
              style={{ background: "var(--active)", color: "#fff", fontFamily: "ui-monospace,monospace" }}>
              DM
            </span>
          </motion.a>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[clamp(10px,1.5vw,13px)] mt-8"
          style={{ color: "var(--measure-dim)" }}>
          Responde en menos de 24 hrs
        </motion.p>
      </motion.div>
    </section>
  );
}
