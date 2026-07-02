import HomeContent from "@/components/landing/HomeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOALESCO — Webs y Software para Pymes",
  description:
    "Creamos landing pages, sitios web y sistemas simples para pymes que venden por Instagram, WhatsApp o en local.",
  openGraph: {
    title: "TOALESCO — Webs y Software para Pymes",
    description:
      "Creamos landing pages, sitios web y sistemas simples para pymes que venden por Instagram, WhatsApp o en local.",
    url: "https://toalesco.cl",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
