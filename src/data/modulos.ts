import type { FC, SVGProps } from "react";
import { Users, Globe, Trophy, Shield, ShoppingBag, BarChart3 } from "lucide-react";

export interface Modulo {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  features: string[];
}

export const modulos: Modulo[] = [
  { icon: Users, title: "Gestión de Socios", features: ["Registro digital", "Control de pagos", "Membresías"] },
  { icon: Globe, title: "Portal de Hinchas", features: ["Noticias", "Calendario", "Resultados"] },
  { icon: Trophy, title: "Participación", features: ["MVP del partido", "Encuestas", "Fan Zone"] },
  { icon: Shield, title: "Patrocinadores", features: ["Espacios publicitarios", "Estadísticas", "Gestión"] },
  { icon: ShoppingBag, title: "Tienda Online", features: ["Venta de productos", "Control de stock"] },
  { icon: BarChart3, title: "Estadísticas", features: ["Jugadores", "Equipos", "Temporadas"] },
];
