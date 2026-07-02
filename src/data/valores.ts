import type { FC, SVGProps } from "react";
import { Code, Server, Users } from "lucide-react";

export interface Valor {
  title: string;
  desc: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export const valores: Valor[] = [
  { title: "Calidad sobre cantidad", desc: "Pocos proyectos, cada uno al máximo. Preferimos hacerlo bien antes que hacerlo rápido.", icon: Code },
  { title: "Tecnología actual", desc: "Stack moderno: Next.js, TypeScript, Node. Nada de WordPress ni soluciones del 2010.", icon: Server },
  { title: "Cercanía real", desc: "Trabajamos contigo, no para ti. Reuniones, avances y soporte directo desde Valdivia.", icon: Users },
];
