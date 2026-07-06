"use client";

import Image from "next/image";

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
      <div className="flex flex-col items-center text-center max-w-xl a-fu">

        <div className="a-si">
          <Image src="/logo.png" alt="TOALESCO" width="96" height="96"
            className="w-[clamp(72px,8vw,96px)] h-auto mb-4" priority />
        </div>

        <div className="a-fu a-d1">
          <span className="text-[clamp(18px,3.5vw,24px)] font-mono tracking-[0.3em] mb-2 inline-block"
            style={{ color: "var(--active)" }}>
            TOALESCO
          </span>
          <p className="text-[clamp(11px,1.4vw,14px)] font-light mb-6 tracking-wide"
            style={{ color: "var(--measure-secondary)" }}>
            Herramientas digitales para emprendedores
          </p>
        </div>

        <h1 className="text-[clamp(32px,8vw,80px)] font-light leading-[1.1] tracking-tight mb-8 a-fu a-d2"
          style={{ color: "var(--measure)" }}>
          Tu idea.<br />
          <span style={{ color: "var(--active)" }}>Nuestro software.</span>
        </h1>

        <div className="space-y-1.5 mb-8">
          {transforms.map(([from, to], i) => (
            <p key={from}
              className="text-[clamp(13px,2vw,16px)] font-mono tracking-tight a-sr"
              style={{ animationDelay: `${0.35 + i * 0.08}s`, color: "var(--measure)" }}>
              <span style={{ color: "var(--measure-dim)" }}>{from}</span>
              {" "}→{" "}
              <span style={{ color: "var(--active)" }}>{to}</span>
            </p>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1.5 mb-6 a-fu a-d8">
          <span className="text-[clamp(11px,1.3vw,13px)] inline-flex items-center gap-1" style={{ color: "var(--measure-secondary)" }}>
            <span className="text-[8px]" style={{ color: "var(--active)", opacity: 0.6 }}>▶</span>
            Para dueños de negocio que no saben de tecnología
          </span>
          <span className="text-[clamp(11px,1.3vw,13px)] inline-flex items-center gap-1" style={{ color: "var(--measure-secondary)" }}>
            <span className="text-[8px]" style={{ color: "var(--active)", opacity: 0.6 }}>▶</span>
            Soporte directo de quien construye tu sistema
          </span>
          <span className="text-[clamp(11px,1.3vw,13px)] inline-flex items-center gap-1" style={{ color: "var(--measure-secondary)" }}>
            <span className="text-[8px]" style={{ color: "var(--active)", opacity: 0.6 }}>▶</span>
            Hablamos tu idioma, no código
          </span>
        </div>

        <p className="text-[clamp(14px,2.2vw,18px)] font-light leading-relaxed max-w-lg a-fu a-d10"
          style={{ color: "var(--measure)" }}>
          Deja de adaptar tu negocio a las herramientas.{" "}
          <span style={{ color: "var(--active)", fontWeight: 450 }}>
            Construimos herramientas adaptadas a tu negocio.
          </span>
        </p>
      </div>

      <span className="absolute bottom-10 text-[clamp(9px,1.3vw,11px)] tracking-widest select-none a-fi"
        style={{ animationDelay: "1.4s", color: "var(--measure-dim)", opacity: 0.25, fontFamily: "ui-monospace,monospace" }}>
        → desliza
      </span>
    </section>
  );
}
