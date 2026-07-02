"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { contactEmail } from "@/data/contact";
import { fadeInUp, staggerContainer, scaleIn, buttonTap } from "@/lib/animations";
import type { Proyecto } from "@/data/proyectos";

const featureVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.3, ease: "easeOut" as const },
  }),
};

export default function ProyectoDetalleContent({ proj }: { proj: Proyecto }) {
  const Icon = proj.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors relative">
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.015] dark:opacity-[0.03] bg-noise" />
      <Navbar />

      <main className="bg-dot-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Terminal Hero */}
            <motion.div
              className="border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-md glow-card mb-6 sm:mb-8 lg:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-slate-200 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-blue-400" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-orange-400" />
                <span className="text-[10px] sm:text-xs lg:text-sm font-mono text-slate-500 dark:text-slate-500 ml-2 font-medium truncate">
                  deploy-{proj.slug}.log
                </span>
              </div>
              <div className="bg-slate-950 dark:bg-black p-3 sm:p-5 lg:p-8 font-mono text-[10px] sm:text-xs lg:text-sm leading-relaxed space-y-0.5 overflow-x-auto">
                {proj.detailLines.map((line, i) => {
                  if (line.startsWith("$"))
                    return (
                      <p key={i} className="text-orange-400 whitespace-nowrap">
                        <span className="text-blue-400">$</span>{" "}
                        {line.slice(2)}
                      </p>
                    );
                  if (
                    line.startsWith("Clonando") ||
                    line.startsWith("✓") ||
                    line.startsWith("Dependencias") ||
                    line.startsWith("Build") ||
                    line.startsWith("Docker") ||
                    line.startsWith("MongoDB") ||
                    line.startsWith("Redis")
                  )
                    return (
                      <p key={i} className="text-orange-400 whitespace-nowrap">
                        <span className="text-orange-500">✓</span>{" "}
                        {line.replace(/^✓\s*/, "")}
                      </p>
                    );
                  if (
                    line.startsWith(">") ||
                    line.startsWith("Deployment") ||
                    line.startsWith("Status")
                  ) {
                    const isUrl = line.includes("https://");
                    const isStatus = line.includes("Status:");
                    return (
                      <p
                        key={i}
                        className={`${
                          isUrl
                            ? "text-blue-400"
                            : isStatus
                              ? "text-orange-400"
                              : "text-slate-400"
                        } whitespace-nowrap`}
                      >
                        {line}
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="text-slate-500 whitespace-nowrap">
                      {line}
                    </p>
                  );
                })}
                <div className="flex gap-1.5 mt-2 sm:mt-3 lg:mt-4">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-orange-500/60" />
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-orange-500/30" />
                </div>
              </div>
            </motion.div>

            {/* Screenshot */}
            {proj.image && (
              <motion.div
                className="border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 glow-card shadow-sm mb-6 sm:mb-8 lg:mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-1.5 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-slate-200 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-blue-400" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] sm:text-xs lg:text-sm font-mono text-slate-500 dark:text-slate-500 ml-2 font-medium truncate">
                    screenshot-preview.png
                  </span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 p-2 sm:p-3 lg:p-4 flex items-center justify-center">
                  <Image
                    src={proj.image}
                    alt={`${proj.title} — Vista previa`}
                    width={1261}
                    height={815}
                    className="w-full h-auto rounded-lg shadow-md object-cover border border-slate-300 dark:border-slate-700"
                    unoptimized
                  />
                </div>
              </motion.div>
            )}

            {/* Project Info */}
            <motion.div
              className="grid md:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="md:col-span-3" variants={fadeInUp}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 text-blue-600 dark:text-blue-400 shadow-sm">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] lg:text-xs font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    {proj.category}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                  {proj.title}
                </h1>
                <p className="text-[13px] sm:text-sm lg:text-base font-mono text-slate-500 dark:text-slate-400 leading-relaxed">
                  {proj.description}
                </p>
              </motion.div>

              <motion.div className="md:col-span-2" variants={scaleIn}>
                <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 p-4 sm:p-5 glow-card shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 sm:mb-3">
                    Tecnologías
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] sm:text-[10px] lg:text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-200 dark:border-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <motion.a
                      href={proj.url}
                      target="_blank"
                      whileHover={{ scale: 1.02 }}
                      whileTap={buttonTap}
                      className="flex h-9 sm:h-10 w-full items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 border-b-2 border-blue-800 dark:border-blue-600 text-[10px] sm:text-xs lg:text-sm font-mono font-bold text-white dark:text-slate-900 transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />{" "}
                      Visitar Proyecto
                    </motion.a>
                    <motion.a
                      href={`mailto:${contactEmail}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={buttonTap}
                      className="flex h-9 sm:h-10 w-full items-center justify-center rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-[10px] sm:text-xs lg:text-sm font-mono font-medium text-slate-700 dark:text-slate-300 transition-all"
                    >
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />{" "}
                      Consultar por este proyecto
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 p-4 sm:p-5 lg:p-7 glow-card shadow-sm mb-6 sm:mb-8 lg:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p
                className="text-[10px] sm:text-xs lg:text-sm font-mono text-slate-400 dark:text-slate-500 mb-1"
                aria-hidden="true"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  $
                </span>{" "}
                cat features.txt
              </p>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                <span className="text-blue-600 dark:text-blue-400">&gt;</span>{" "}
                Características
              </h2>
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {proj.features.map((f, i) => (
                  <motion.div
                    key={f}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={featureVariants}
                    className="flex items-start gap-1.5 sm:gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-900"
                  >
                    <span className="text-orange-500 dark:text-orange-400 font-bold text-[10px] sm:text-xs shrink-0 mt-0.5">
                      $
                    </span>
                    <span className="text-[11px] sm:text-xs lg:text-sm font-mono text-slate-600 dark:text-slate-300">
                      {f}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-950/20 dark:to-orange-950/20 text-center glow-card mb-8 sm:mb-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p
                className="text-[9px] sm:text-[10px] lg:text-xs font-mono text-slate-400 dark:text-slate-500 mb-1.5 sm:mb-2"
                aria-hidden="true"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  $
                </span>{" "}
                ./contacto --proyecto
              </p>
              <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
                ¿Necesitas algo similar?
              </h2>
              <p className="text-[11px] sm:text-xs lg:text-sm font-mono text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-4 sm:mb-5">
                Cada proyecto es único. Cuéntanos tu idea y la hacemos realidad
                con el mismo nivel de calidad y dedicación.
              </p>
              <motion.a
                href={`mailto:${contactEmail}?subject=Quiero%20un%20proyecto%20como%20${encodeURIComponent(proj.title)}`}
                whileHover={{ scale: 1.05 }}
                whileTap={buttonTap}
                className="inline-flex h-10 sm:h-11 lg:h-12 items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-600/25 dark:hover:shadow-blue-500/30 px-5 sm:px-6 lg:px-8 text-xs sm:text-sm lg:text-base font-mono font-bold text-white dark:text-slate-900 transition-all border-b-2 border-blue-800 dark:border-blue-600"
              >
                Quiero un proyecto así{" "}
                <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </motion.a>
            </motion.div>

            {/* Back link */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-1.5 h-9 sm:h-10 px-4 sm:px-5 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-[11px] sm:text-xs lg:text-sm font-mono font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-sm transition-all"
              >
                <span aria-hidden="true">←</span> Ver todos los proyectos
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="py-4 sm:py-5 lg:py-6 border-t-2 border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] sm:text-xs lg:text-sm font-mono text-slate-500 dark:text-slate-400">
            &copy; 2026 TOALESCO. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
