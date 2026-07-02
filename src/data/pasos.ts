import type { FC, SVGProps } from "react";
import { Lightbulb, Code, Rocket } from "lucide-react";

export interface Paso {
  title: string;
  desc: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export const pasos: Paso[] = [
  { title: "Escuchamos tu idea", desc: "Nos cuentas qué necesitas — una web, un sistema, una plataforma. Sin vueltas, sin tecnicismos.", icon: Lightbulb },
  { title: "Desarrollamos la solución", desc: "Construimos con tecnología moderna, diseño profesional y pruebas constantes.", icon: Code },
  { title: "Entregamos y acompañamos", desc: "Te entregamos el proyecto funcionando y te damos soporte para que crezca contigo.", icon: Rocket },
];
