"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { proyectos } from "@/data/proyectos";
import Image from "next/image";
import Link from "next/link";

export function ProjectCarousel() {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
      {proyectos.map((project, index) => {
        const Icon = project.icon;
        return (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, rotate: index === 1 ? 0 : index === 0 ? -0.6 : 0.6 }}
            className="group w-[82vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition-all hover:border-cyan-300/30 hover:shadow-cyan-500/10 md:w-auto"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-950">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`Vista previa de ${project.title}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                <Icon className="h-3.5 w-3.5" />
                {project.category}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold leading-tight text-white">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{project.shortDesc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[11px] font-semibold text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4">
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  Ver proyecto
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
                  >
                    Abrir sitio
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
