import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-grid">
      <nav className="h-9 flex items-center px-3" style={{ borderBottom: "1px solid var(--boundary)" }}>
        <Link href="/" className="text-[clamp(11px,1.9vw,13px)] tracking-[0.25em] text-measure-dim select-none">TOALESCO</Link>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-[1.25rem] font-normal text-measure mb-6">Privacidad</h1>
        <div className="space-y-4 text-[clamp(14px,2.5vw,16px)] text-measure-dim leading-relaxed">
          <p>No compartimos tu información. Los datos de contacto se usan solo para responderte.</p>
          <p>Escríbenos a <span className="text-measure">toalesco@tutamail.com</span> para solicitar la eliminación de tus datos.</p>
        </div>
      </div>
    </div>
  );
}
