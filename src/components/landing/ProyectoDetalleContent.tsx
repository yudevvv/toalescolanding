"use client";

import Link from "next/link";

interface Props {
  proyecto: {
    slug: string; title: string; category: string; shortDesc: string;
    description: string; url: string; features: string[];
  };
}

export function ProyectoDetalleContent({ proyecto: p }: Props) {
  return (
    <div className="min-h-screen bg-substrate">
      <nav className="h-10 flex items-center px-3 border-b" style={{ borderColor: "var(--boundary)" }}>
        <Link href="/" className="text-[clamp(12px,2.1vw,14px)] text-measure-secondary tracking-widest select-none" style={{ fontFamily: "ui-monospace, monospace" }}>
          TOALESCO
        </Link>
        <span className="mx-2 text-measure-secondary text-[clamp(12px,2.1vw,14px)]">/</span>
        <Link href="/proyectos" className="text-[clamp(12px,2.1vw,14px)] text-measure-secondary" style={{ fontFamily: "ui-monospace, monospace" }}>Proyectos</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-[clamp(11px,1.9vw,13px)] text-active tracking-widest mb-2" style={{ fontFamily: "ui-monospace, monospace" }}>{p.category}</p>
        <h1 className="text-[1.5rem] font-normal text-measure mb-3">{p.title}</h1>
        <p className="text-[clamp(15px,2.7vw,17px)] text-measure-secondary leading-relaxed mb-8 max-w-xl">{p.description}</p>

        <div className="p-4 rounded-[5px] mb-6" style={{ border: "1px solid var(--boundary)", backgroundColor: "var(--substrate-dim)" }}>
          <p className="text-[clamp(11px,1.9vw,13px)] text-measure-secondary mb-3" style={{ fontFamily: "ui-monospace, monospace" }}>Características</p>
          <ul className="space-y-1.5">
            {p.features.map((f) => (
              <li key={f} className="text-[clamp(14px,2.5vw,16px)] text-measure flex items-start gap-2">
                <span className="text-active">—</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {p.url && (
          <a href={p.url} target="_blank" rel="noopener noreferrer"
            className="inline-block text-[clamp(14px,2.5vw,16px)] py-2 px-4 rounded-[5px]"
            style={{ border: "1px solid var(--measure-dim)", color: "var(--measure)", opacity: 0.7 }}>
            Visitar sitio →
          </a>
        )}
      </div>
    </div>
  );
}
