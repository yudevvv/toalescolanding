import { Scissors, Trophy, User } from "lucide-react";
import type { FC, SVGProps } from "react";

export interface Proyecto {
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  description: string;
  tech: string[];
  url: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  terminalLines: string[];
  features: string[];
  detailLines: string[];
  image?: string;
}

export const proyectos: Proyecto[] = [
  {
    slug: "fabiancuts",
    title: "FabianCuts — Barbería Premium",
    category: "Landing Pages",
    shortDesc: "Landing page profesional con galería, carta de servicios con precios y agendamiento directo por WhatsApp.",
    description:
      "Sitio web profesional para FabianCuts, una barbería premium ubicada en Mafil, Chile. El diseño refleja la estética audaz y clásica de la marca, con una carta de servicios detallada con precios, galería de cortes, horarios de atención, ubicación interactiva y agendamiento directo por WhatsApp. Totalmente responsive, optimizado para conversión y construido con Next.js.",
    tech: ["Next.js", "Tailwind CSS", "FontAwesome"],
    url: "https://fabiancuts.pages.dev",
    icon: Scissors,
    terminalLines: [
      "$ npx toalesco --init fabiancuts",
      "✓ Proyecto inicializado",
      "$ npm run deploy:prod",
      "> Landing Page v1.0.0",
      "> ready on https://fabiancuts.pages.dev",
    ],
    features: [
      "Carta de servicios con precios actualizados",
      "Galería interactiva de cortes y estilos",
      "Agendamiento directo por WhatsApp",
      "Horarios y ubicación con mapa interactivo",
      "Diseño responsive y moderno",
      "SEO local optimizado",
    ],
    image: "/images/barber.png",
    detailLines: [
      "$ git clone https://github.com/toalesco/fabiancuts",
      "Clonando repositorio...",
      "$ cd fabiancuts",
      "$ npm install",
      "✓ Dependencias instaladas (134 paquetes)",
      "$ npm run build",
      "✓ Build completado exitosamente",
      "$ npm run deploy:prod",
      "> Landing Page v1.0.0",
      "> Módulos: Servicios, Galería, WhatsApp, Horarios, Ubicación",
      "> WhatsApp API: integrada",
      "> FontAwesome: iconos cargados",
      "> ready on https://fabiancuts.pages.dev",
      "$ Deployment finalized at 2026-06-15T10:00:00Z",
      "$ Status: OPERANDO 24/7",
    ],
  },
  {
    slug: "gestion-clubes",
    title: "Plataforma de Gestión Clubes SaaS",
    category: "Sistemas",
    shortDesc: "Sistema integral de administración deportiva con módulos de socios, finanzas, comunicaciones y estadísticas.",
    description:
      "Plataforma SaaS todo-en-uno para la gestión de clubes deportivos. Centraliza socios, finanzas, calendario de eventos, comunicaciones internas y estadísticas en un solo lugar. Diseñada para reducir la carga administrativa y potenciar la gestión del club con herramientas modernas y fáciles de usar. Multi-club, multi-usuario y completamente escalable.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Tailwind"],
    url: "",
    icon: Trophy,
    terminalLines: [
      "$ npx toalesco --init gestion-clubes",
      "✓ Proyecto inicializado",
      "$ npm run deploy:prod",
      "> TOALESCO Clubes SaaS v1.0.0",
      "> ready on https://clubes.toalesco.cl",
    ],
    features: [
      "Registro y control de socios con cuotas automatizadas",
      "Gestión financiera y cobranzas",
      "Calendario de partidos, entrenamientos y eventos",
      "Comunicaciones internas (notificaciones, avisos)",
      "Estadísticas deportivas y reportes",
      "Panel administrativo multi-rol",
    ],
    image: "/images/gestion-clubes.svg",
    detailLines: [
      "$ git clone https://github.com/toalesco/gestion-clubes",
      "Clonando repositorio...",
      "$ cd gestion-clubes",
      "$ npm install",
      "✓ Dependencias instaladas (312 paquetes)",
      "$ npm run build",
      "✓ Build completado exitosamente",
      "$ npm run deploy:prod",
      "> TOALESCO Clubes SaaS v1.0.0",
      "> Módulos: Socios, Finanzas, Calendario, Comunicaciones, Estadísticas",
      "> Base de datos: PostgreSQL 16 conectada",
      "> Cache: Redis cluster online",
      "> Multi-club: activo",
      "> ready on https://clubes.toalesco.cl",
      "$ Deployment finalized at 2026-05-20T11:00:00Z",
      "$ Status: OPERANDO 24/7",
    ],
  },
  {
    slug: "jugaviewscl",
    title: "JugaViewsCL — Marketplace de Jugadores",
    category: "Apps",
    shortDesc: "Plataforma donde jugadores crean su perfil deportivo y clubes/agencias los descubren y contactan.",
    description:
      "Marketplace deportivo que conecta jugadores con clubes y agencias. Los futbolistas crean su perfil con datos clave: edad, posición, altura, estadísticas y video highlights. Los clubes y agencias pueden buscar, filtrar y contactar talento de forma directa y eficiente. Transparencia, visibilidad y oportunidades para el talento chileno.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    url: "",
    icon: User,
    terminalLines: [
      "$ npx toalesco --init jugaviewscl",
      "✓ Proyecto inicializado",
      "$ npm run dev",
      "> JugaViewsCL v0.1.0 (En Desarrollo)",
      "> ready on https://jugaviewscl.toalesco.cl",
    ],
    features: [
      "Perfiles de jugadores con datos deportivos",
      "Filtros avanzados: edad, posición, altura, pie hábil",
      "Galería de videos y estadísticas por perfil",
      "Búsqueda y matchmaking para clubes y agencias",
      "Sistema de contacto directo entre partes",
      "Panel de administración con moderación",
    ],
    image: "/images/jugaviewscl.svg",
    detailLines: [
      "$ git clone https://github.com/toalesco/jugaviewscl",
      "Clonando repositorio...",
      "$ cd jugaviewscl",
      "$ npm install",
      "✓ Dependencias instaladas (178 paquetes)",
      "$ npm run dev",
      "> JugaViewsCL v0.1.0 (En Desarrollo)",
      "> Módulos en construcción: Perfiles, Filtros, Búsqueda, Contacto",
      "> Base de datos: PostgreSQL conectada",
      "> API REST: 12 endpoints implementados",
      "> ready on http://localhost:3000",
      "$ Next step: implementar módulo de contacto y videos",
    ],
  },
];
