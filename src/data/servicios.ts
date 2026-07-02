import type { FC, SVGProps } from "react";
import { Globe, Scissors, Trophy } from "lucide-react";

export interface Servicio {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
  bg: string;
  highlight?: boolean;
}

export const servicios: Servicio[] = [
  {
    icon: Globe,
    title: "Tu negocio en internet",
    description: "¿No te encuentran tus clientes? Te creamos una página web profesional para que aparezcas online, captes clientes y vendas más. Simple, rápido, sin complicaciones.",
    features: ["Diseño atractivo", "SEO incluido", "Carga rápida"],
    bg: "from-blue-50 to-blue-50 dark:from-blue-950/30 dark:to-blue-950/30",
  },
  {
    icon: Scissors,
    title: "Adiós al Excel",
    description: "¿Todavía manejás clientes, precios y pedidos en planillas? Automatizamos tus procesos para que ahorres horas por semana y no se te escape nada.",
    features: ["Catálogo online", "WhatsApp directo", "Galería visual"],
    bg: "from-violet-50 to-blue-50 dark:from-violet-950/30 dark:to-blue-950/30",
  },
  {
    icon: Trophy,
    title: "Tu club al día",
    description: "¿Tenés mil planillas de socios, pagos y estadísticas y nadie se entiende? Unificamos todo en un solo sistema: socios, finanzas, equipo e hinchas.",
    features: ["Gestión completa", "Datos en vivo", "Portal de hinchas"],
    bg: "from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30",
    highlight: true,
  },
];
