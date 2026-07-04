import { notFound } from "next/navigation";
import { ProyectoDetalleContent } from "@/components/landing/ProyectoDetalleContent";
import { proyectos } from "@/data/proyectos";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = proyectos.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.shortDesc };
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const p = proyectos.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <ProyectoDetalleContent
      proyecto={{
        slug: p.slug,
        title: p.title,
        category: p.category,
        shortDesc: p.shortDesc,
        description: p.description,
        url: p.url,
        features: p.features,
      }}
    />
  );
}
