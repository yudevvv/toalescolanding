import ProyectosContent from "@/components/landing/ProyectosContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Conocé los proyectos que hemos desarrollado: landing pages, plataformas SaaS y sistemas a medida para clientes en Chile.",
  openGraph: {
    title: "Proyectos | TOALESCO",
    description:
      "Landing pages, plataformas SaaS y sistemas a medida para clientes en Chile.",
  },
};

export default function ProyectosPage() {
  return <ProyectosContent />;
}
