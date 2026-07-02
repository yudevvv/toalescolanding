import { Zap, Code, Palette, Search, Gauge, ArrowUp, Shield, HeartHandshake } from "lucide-react";
import type { FC, SVGProps } from "react";

export interface Benefit {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

export const benefits: Benefit[] = [
  { icon: Zap, title: "Respuesta rápida", desc: "Primera orientación en menos de 24 horas, con próximos pasos concretos." },
  { icon: Code, title: "Código limpio", desc: "Arquitectura mantenible para que el proyecto pueda crecer sin rehacerse." },
  { icon: Palette, title: "Diseño moderno", desc: "Interfaces simples de usar, rápidas de entender y alineadas a tu marca." },
  { icon: Search, title: "SEO técnico", desc: "Metadata, estructura semántica y rendimiento pensados desde el inicio." },
  { icon: Gauge, title: "Performance", desc: "Carga rápida, imágenes optimizadas y experiencia fluida en móvil." },
  { icon: ArrowUp, title: "Escalabilidad", desc: "Bases preparadas para nuevos usuarios, módulos e integraciones." },
  { icon: Shield, title: "Seguridad", desc: "Buenas prácticas en formularios, datos, accesos y despliegue." },
  { icon: HeartHandshake, title: "Soporte directo", desc: "Hablas con el equipo que diseña y desarrolla, sin capas innecesarias." },
];
