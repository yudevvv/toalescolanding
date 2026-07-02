import { Lightbulb, PenTool, Code, TestTube, Rocket, HeadphonesIcon } from "lucide-react";
import type { FC, SVGProps } from "react";

export interface ProcessStep {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

export const processSteps: ProcessStep[] = [
  { icon: Lightbulb, title: "Escuchamos", desc: "Entendemos tu idea, tu negocio y lo que necesitás resolver." },
  { icon: PenTool, title: "Diseñamos", desc: "Prototipamos la solución y la ajustamos hasta que sea perfecta." },
  { icon: Code, title: "Desarrollamos", desc: "Escribimos código limpio, modular y preparado para crecer." },
  { icon: TestTube, title: "Probamos", desc: "Cada función se testea antes de que llegue a tus manos." },
  { icon: Rocket, title: "Lanzamos", desc: "Ponemos tu proyecto en producción sin sorpresas." },
  { icon: HeadphonesIcon, title: "Soportamos", desc: "Seguimos ahí cuando necesitás cambios o mejoras." },
];
