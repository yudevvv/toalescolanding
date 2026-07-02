"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { proyectos } from "@/data/proyectos";
import { Navbar } from "@/components/landing/Navbar";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  cardHover,
  buttonTap,
} from "@/lib/animations";

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function ProyectosContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors relative">
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.015] dark:opacity-[0.03] bg-noise" />
      <Navbar />

      <main className="bg-dot-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="text-[10px] sm:text-xs lg:text-sm font-mono text-slate-400 dark:text-slate-500 text-center mb-1.5 sm:mb-2"
                aria-hidden="true"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold">$</span>{" "}
                ls /toalesco/proyectos/ --all
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-slate-900 dark:text-white mb-1.5 sm:mb-2"
              >
                <span className="text-blue-600 dark:text-blue-400">&gt;</span> Proyectos
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-[12px] sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 text-center font-mono max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12"
              >
                Conocé en detalle los proyectos que hemos desarrollado. Cada uno
                representa nuestro compromiso con la calidad y la innovación.
              </motion.p>
            </motion.div>

            <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {proyectos.map((proj, i) => {
                const Icon = proj.icon;
                return (
                  <motion.div
                    key={proj.slug}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={projectVariants}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <Link
                      href={`/proyectos/${proj.slug}`}
                      className="group border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 glow-card shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all flex flex-col"
                    >
                      <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-200 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-400" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-orange-400" />
                        <span className="text-[9px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-500 ml-2 truncate font-medium">
                          {proj.slug}.sh
                        </span>
                      </div>

                      <div className="p-3.5 sm:p-4 lg:p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                          <div className="flex h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 items-center justify-center rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                            <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                          </div>
                          <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                            {proj.category}
                          </span>
                        </div>

                        <h2 className="text-sm sm:text-sm lg:text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                          {proj.title}
                        </h2>

                        <p className="text-[11px] sm:text-[11px] lg:text-xs font-mono text-slate-500 dark:text-slate-400 mb-2.5 sm:mb-3 flex-1 line-clamp-2 leading-relaxed">
                          {proj.shortDesc}
                        </p>

                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3">
                          {proj.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[8px] sm:text-[9px] font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded px-1.5 sm:px-2 py-0.5 border border-slate-200 dark:border-slate-600"
                            >
                              {t}
                            </span>
                          ))}
                          {proj.tech.length > 3 && (
                            <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 dark:text-slate-500">
                              +{proj.tech.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="bg-slate-950 dark:bg-black rounded-lg p-2 sm:p-2.5 lg:p-3 font-mono text-[8px] sm:text-[9px] lg:text-[10px] leading-relaxed space-y-0.5">
                          {proj.terminalLines.map((line, i) => {
                            if (line.startsWith("$"))
                              return (
                                <p key={i} className="text-orange-400 truncate">
                                  <span className="text-blue-400">$</span>{" "}
                                  {line.slice(2)}
                                </p>
                              );
                            if (line.startsWith("✓"))
                              return (
                                <p key={i} className="text-orange-400">
                                  <span className="text-orange-500">✓</span>{" "}
                                  {line.slice(2)}
                                </p>
                              );
                            if (line.startsWith(">"))
                              return (
                                <p key={i} className="text-slate-400 truncate">
                                  {line}
                                </p>
                              );
                            return (
                              <p key={i} className="text-slate-500 truncate">
                                {line}
                              </p>
                            );
                          })}
                        </div>

                        <div className="mt-2.5 sm:mt-3 flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                          Ver proyecto <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mt-10 sm:mt-12 lg:mt-14 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.a
                href="/#contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={buttonTap}
                className="inline-flex h-10 sm:h-11 lg:h-12 items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-600/25 dark:hover:shadow-blue-500/30 px-5 sm:px-6 lg:px-8 text-xs sm:text-sm lg:text-base font-mono font-bold text-white dark:text-slate-900 transition-all border-b-2 border-blue-800 dark:border-blue-600"
              >
                ¿Tienes un proyecto similar? Contáctanos{" "}
                <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="py-4 sm:py-5 lg:py-6 border-t-2 border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] sm:text-xs lg:text-sm font-mono text-slate-500 dark:text-slate-400 text-center">
            &copy; 2026 TOALESCO. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
