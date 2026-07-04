export interface Proyecto {
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  description: string;
  url: string;
  features: string[];
}

export const proyectos: Proyecto[] = [
  {
    slug: "fabiancuts",
    title: "FabianCuts — Barbería Premium",
    category: "Landing Pages",
    shortDesc: "Landing page profesional con galería, carta de servicios con precios y agendamiento directo por WhatsApp.",
    description:
      "Sitio web profesional para FabianCuts, una barbería premium ubicada en Mafil, Chile. Carta de servicios con precios, galería de cortes, horarios, ubicación interactiva y agendamiento por WhatsApp.",
    url: "https://fabiancuts.pages.dev",
    features: [
      "Carta de servicios con precios actualizados",
      "Galería interactiva de cortes y estilos",
      "Agendamiento directo por WhatsApp",
      "Horarios y ubicación con mapa interactivo",
      "Diseño responsive y moderno",
      "SEO local optimizado",
    ],
  },
  {
    slug: "gestion-clubes",
    title: "Plataforma de Gestión Clubes SaaS",
    category: "Sistemas",
    shortDesc: "Sistema integral de administración deportiva con módulos de socios, finanzas, comunicaciones y estadísticas.",
    description:
      "Plataforma SaaS todo-en-uno para la gestión de clubes deportivos. Centraliza socios, finanzas, calendario de eventos, comunicaciones y estadísticas en un solo lugar. Multi-club, multi-usuario y escalable.",
    url: "",
    features: [
      "Registro y control de socios con cuotas automatizadas",
      "Gestión financiera y cobranzas",
      "Calendario de partidos, entrenamientos y eventos",
      "Comunicaciones internas (notificaciones, avisos)",
      "Estadísticas deportivas y reportes",
      "Panel administrativo multi-rol",
    ],
  },
  {
    slug: "jugaviewscl",
    title: "JugaViewsCL — Marketplace de Jugadores",
    category: "Apps",
    shortDesc: "Plataforma donde jugadores crean su perfil deportivo y clubes/agencias los descubren y contactan.",
    description:
      "Marketplace deportivo que conecta jugadores con clubes y agencias. Perfiles con datos clave, estadísticas y video highlights. Búsqueda, filtros y contacto directo para el talento chileno.",
    url: "",
    features: [
      "Perfiles de jugadores con datos deportivos",
      "Filtros avanzados: edad, posición, altura, pie hábil",
      "Galería de videos y estadísticas por perfil",
      "Búsqueda y matchmaking para clubes y agencias",
      "Sistema de contacto directo entre partes",
      "Panel de administración con moderación",
    ],
  },
];
