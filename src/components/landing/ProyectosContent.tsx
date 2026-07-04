"use client";

import Link from "next/link";
import { proyectos } from "@/data/proyectos";

export function ProyectosContent() {
  return (
    <div className="min-h-screen bg-substrate">
      <nav className="h-10 flex items-center px-3 border-b" style={{ borderColor: "var(--boundary)" }}>
        <Link href="/" className="text-[clamp(12px,2.1vw,14px)] text-measure-secondary tracking-widest select-none" style={{ fontFamily: "ui-monospace, monospace" }}>
          TOALESCO
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-[1.75rem] font-normal text-measure mb-2">Proyectos</h1>
        <p className="text-[clamp(14px,2.5vw,16px)] text-measure-secondary mb-10" style={{ fontFamily: "ui-monospace, monospace" }}>
          Trabajos seleccionados.
        </p>
        <div className="space-y-4">
          {proyectos.map((p) => (
            <Link
              key={p.slug}
              href={`/proyectos/${p.slug}`}
              className="block p-4 rounded-[5px] transition-[border-color] duration-200"
              style={{ border: "1px solid var(--boundary)" }}
            >
              <p className="text-[clamp(11px,1.9vw,13px)] text-active tracking-widest mb-1" style={{ fontFamily: "ui-monospace, monospace" }}>{p.category}</p>
              <p className="text-[clamp(16px,2.9vw,18px)] text-measure mb-1">{p.title}</p>
              <p className="text-[clamp(14px,2.5vw,16px)] text-measure-secondary">{p.shortDesc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
