import { Globe, Code2, Warehouse, Clock, Boxes, LayoutDashboard, Workflow, GitBranch } from "lucide-react";
import type { FC, SVGProps } from "react";

export interface DevService {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

export const devServices: DevService[] = [
  { icon: Globe, title: "Landing Pages", desc: "Páginas rápidas, claras y diseñadas para convertir tráfico en oportunidades reales." },
  { icon: Code2, title: "Software a Medida", desc: "Herramientas hechas para tu flujo de trabajo, tus reglas y tu forma de crecer." },
  { icon: Warehouse, title: "Inventario", desc: "Stock, movimientos y alertas en un solo lugar, sin perseguir planillas." },
  { icon: Clock, title: "Asistencia", desc: "Entradas, salidas, ausencias y reportes listos para operar sin fricción." },
  { icon: Boxes, title: "Bodega", desc: "Trazabilidad por ubicación, responsable y estado para reducir pérdidas." },
  { icon: LayoutDashboard, title: "Dashboards", desc: "Métricas entendibles para decidir rápido sin pedir reportes manuales." },
  { icon: Workflow, title: "Automatizaciones", desc: "Procesos repetitivos que se ejecutan solos, con menos errores y más velocidad." },
  { icon: GitBranch, title: "Integraciones y APIs", desc: "Conectamos tus sistemas para que la información fluya donde corresponde." },
];
