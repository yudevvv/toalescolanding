export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Carlos Mendoza",
    role: "Dueño",
    company: "FabianCuts Barbería",
    text: "Ahora mis clientes reservan desde la web y ya no pierdo turnos por WhatsApp. La página me cambió la forma de trabajar.",
    initials: "CM",
  },
  {
    name: "Ignacio Rivas",
    role: "Presidente",
    company: "Club Deportivo",
    text: "Pasamos de 5 planillas de Excel a un solo sistema. Ahora sabemos exactamente cuántos socios tenemos al día.",
    initials: "IR",
  },
  {
    name: "María José",
    role: "Emprendedora",
    company: "JugaViewsCL",
    text: "Necesitaba una tienda online que funcionara de verdad. En dos semanas teníamos todo listo y vendiendo.",
    initials: "MJ",
  },
];
