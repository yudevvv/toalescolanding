import { notFound } from "next/navigation";
import { proyectos } from "@/data/proyectos";
import ProyectoDetalleContent from "@/components/landing/ProyectoDetalleContent";
import type { Metadata } from "next";

export function generateStaticParams() {
  return proyectos.map((proj) => ({ slug: proj.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const proj = proyectos.find((p) => p.slug === params.slug);
  if (!proj) return { title: "Proyecto no encontrado" };
  return {
    title: proj.title,
    description: proj.shortDesc,
    openGraph: {
      title: `${proj.title} | TOALESCO`,
      description: proj.shortDesc,
    },
  };
}

export default function ProyectoDetallePage({ params }: { params: { slug: string } }) {
  const proj = proyectos.find((p) => p.slug === params.slug);
  if (!proj) notFound();
  return <ProyectoDetalleContent proj={proj} />;
}
