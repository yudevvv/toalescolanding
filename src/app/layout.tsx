import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://toalesco.cl"),
  title: { default: "TOALESCO — Ingeniería de Software", template: "%s | TOALESCO" },
  description: "Raw ideas become digital systems.",
  openGraph: { type: "website", locale: "es_CL", siteName: "TOALESCO", title: "TOALESCO", description: "Raw ideas become digital systems.", url: "https://toalesco.cl" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
