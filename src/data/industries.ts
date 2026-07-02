import { BriefcaseBusiness, Building2, HardHat, Stethoscope, Store, Utensils, Users } from "lucide-react";
import type { FC, SVGProps } from "react";

export interface Industry {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
}

export const industries: Industry[] = [
  { icon: Utensils, label: "Restaurantes" },
  { icon: Stethoscope, label: "Clínicas" },
  { icon: HardHat, label: "Constructoras" },
  { icon: Store, label: "Tiendas" },
  { icon: Building2, label: "Pymes" },
  { icon: BriefcaseBusiness, label: "Empresas grandes" },
  { icon: Users, label: "Profesionales" },
];
