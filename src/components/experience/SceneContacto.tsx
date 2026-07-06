"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function SceneContacto() {
  return (
    <section className="h-dvh flex items-center justify-center relative overflow-hidden px-6" style={{ background: "var(--substrate)" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[clamp(250px,50vw,600px)] h-[clamp(250px,50vw,600px)] rounded-full"
          style={{ top: "10%", right: "-20%", background: "var(--active)", filter: "blur(120px)", opacity: 0.04 }} />
        <div className="absolute w-[clamp(200px,40vw,500px)] h-[clamp(200px,40vw,500px)] rounded-full"
          style={{ bottom: "5%", left: "-15%", background: "var(--active)", filter: "blur(100px)", opacity: 0.03 }} />
        {/* Floating dots */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" style={{ maskImage: "linear-gradient(180deg,transparent,black 30%,black 70%,transparent)" }}>
          <defs>
            <pattern id="contact-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="var(--measure)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-dots)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center w-full max-w-md text-center relative z-[1]">

        <motion.div className="mb-6"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Image src="/logo.png" alt="TOALESCO" width="72" height="72"
            className="w-[clamp(48px,6vw,72px)] h-auto" />
        </motion.div>

        <h2 className="text-[clamp(28px,5vw,52px)] font-light tracking-tight mb-2"
          style={{ color: "var(--measure)" }}>
          TOALESCO
        </h2>
        <p className="text-[clamp(12px,1.8vw,15px)] font-light mb-8"
          style={{ color: "var(--measure-dim)" }}>
          Transformamos ideas en sistemas que funcionan.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            href="https://www.instagram.com/toalesco.dev/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-[8px] font-medium transition-all duration-200"
            style={{ background: "var(--active)", color: "#fff" }}>
            <span>Cuéntanos tu idea</span>
            <span className="text-sm">→</span>
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="mailto:toalesco@tutamail.com"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-[8px] transition-all duration-200 group"
            style={{ border: "1px solid var(--boundary)", background: "var(--substrate)" }}>
            <span className="text-[clamp(14px,2vw,18px)] shrink-0">✉</span>
            <div className="text-left min-w-0">
              <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest"
                style={{ fontFamily: "ui-monospace,monospace", color: "var(--measure-dim)" }}>EMAIL</p>
              <p className="text-[clamp(12px,1.8vw,15px)] truncate" style={{ color: "var(--measure)" }}>toalesco@tutamail.com</p>
            </div>
            <span className="ml-auto text-[10px] font-mono shrink-0 group-hover:translate-x-1 transition-transform duration-200"
              style={{ color: "var(--measure-dim)" }}>
              →
            </span>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            href="https://www.instagram.com/toalesco.dev/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-[8px] transition-all duration-200 group"
            style={{ border: "1px solid var(--boundary)", background: "var(--substrate)" }}>
            <span className="text-[clamp(14px,2vw,18px)] shrink-0">📷</span>
            <div className="text-left min-w-0">
              <p className="text-[clamp(8px,1.1vw,10px)] tracking-widest"
                style={{ fontFamily: "ui-monospace,monospace", color: "var(--measure-dim)" }}>INSTAGRAM</p>
              <p className="text-[clamp(12px,1.8vw,15px)] truncate" style={{ color: "var(--measure)" }}>@toalesco.dev</p>
            </div>
            <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full shrink-0"
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
