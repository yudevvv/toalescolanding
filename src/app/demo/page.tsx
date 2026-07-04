import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo",
  description: "Solicita una demo gratuita.",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-grid">
      <h1 className="text-[1.25rem] font-normal text-measure mb-2">Solicitar demo</h1>
      <p className="text-[clamp(14px,2.5vw,16px)] text-measure-dim mb-6" style={{ fontFamily: "ui-monospace,monospace" }}>Escríbenos y te mostraremos cómo podemos ayudarte.</p>
      <a href="mailto:toalesco@tutamail.com"
        className="inline-block px-5 py-2 text-[clamp(14px,2.5vw,16px)] rounded-[5px] border border-boundary text-measure/70 hover:border-active hover:text-active transition-[border-color,color] duration-200">
        toalesco@tutamail.com
      </a>
    </div>
  );
}
