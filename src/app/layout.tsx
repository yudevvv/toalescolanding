import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://toalesco.cl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TOALESCO — Webs y Software para Pymes en Chile",
    template: "%s | TOALESCO",
  },
  description:
    "Creamos landing pages, sitios web y sistemas simples para pymes que venden por Instagram, WhatsApp o en local.",
  keywords: [
    "soluciones digitales",
    "desarrollo web",
    "landing pages",
    "Valdivia",
    "Chile",
    "PYMES",
    "empresas",
    "emprendedores",
    "Next.js",
    "TypeScript",
    "Node.js",
    "desarrollo a medida",
    "transformación digital",
    "página web profesional",
    "sistema de gestión",
    "control de inventario",
    "control de asistencia",
    "automatización de procesos",
    "dashboards",
    "API",
    "WhatsApp",
    "Instagram",
  ],
  authors: [{ name: "TOALESCO", url: siteUrl }],
  creator: "TOALESCO",
  publisher: "TOALESCO",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "TOALESCO",
    title: "TOALESCO — Webs y Software para Pymes en Chile",
    description:
      "Landing pages, sitios web, catálogos y sistemas simples para pymes que quieren vender mejor.",
    url: siteUrl,
    images: [{ url: "/images/logo-bg.jpg", width: 1200, height: 630, alt: "TOALESCO desarrollo de software" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOALESCO — Webs y Software para Pymes",
    description:
      "Landing pages, sitios web, catálogos y sistemas simples para pymes que venden por Instagram o WhatsApp.",
    images: ["/images/logo-bg.jpg"],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "TOALESCO",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/logo-bg.jpg`,
    email: "toalesco@tutamail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Valdivia",
      addressCountry: "CL",
    },
    areaServed: "Chile",
    description:
      "Empresa de desarrollo web y software para pymes: landing pages, sitios web, catálogos, sistemas simples y automatizaciones.",
    serviceType: [
      "Desarrollo de software a medida",
      "Landing pages",
      "Sitios web corporativos",
      "Sistemas de gestión",
      "Control de inventario",
      "Control de asistencia",
      "Dashboards",
      "Automatización de procesos",
      "Integraciones y APIs",
    ],
  };

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem("toalesco-theme");
                  if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                    document.documentElement.classList.add("dark");
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
