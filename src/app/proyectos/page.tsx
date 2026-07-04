import { ProyectosContent } from "@/components/landing/ProyectosContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Trabajos seleccionados de TOALESCO. Cada proyecto, una solución.",
};

export default function ProyectosPage() {
  return <ProyectosContent />;
}
