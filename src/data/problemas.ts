import type { FC, SVGProps } from "react";
import { Building2, DollarSign, BarChart3 } from "lucide-react";

export interface Problema {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export const problemas: Problema[] = [
  { icon: Building2, title: "Gestión desordenada", description: "Socios, jugadores y pagos distribuidos en Excel, WhatsApp y papeles." },
  { icon: DollarSign, title: "Menos ingresos", description: "Patrocinio, merchandising y membresías sin gestionar." },
  { icon: BarChart3, title: "Falta de datos", description: "Sin estadísticas ni métricas para tomar decisiones." },
];
