"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Mail,
  MessageCircle,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SectionNav } from "@/components/ui/SectionNav";
import { ProjectCarousel } from "@/components/landing/ProjectCarousel";
import { contactEmail } from "@/data/contact";

const sections = ["hero", "clubes", "projects", "cta"];
const instagramUrl = "https://www.instagram.com/toalesco.dev/";
const whatsappUrl =
  "https://wa.me/56912345678?text=Hola%20TOALESCO%2C%20vi%20su%20landing%20y%20quiero%20cotizar%20una%20web%20para%20mi%20pyme";
const mailUrl = `mailto:${contactEmail}?subject=Cotizar%20proyecto%20para%20mi%20pyme&body=Hola%20TOALESCO%2C%20quiero%20cotizar%20un%20proyecto.%0A%0AMi%20negocio%20es%3A%0ANecesito%3A%0AMi%20WhatsApp%20es%3A`;

const quickServices = [
  "Landing para vender",
  "Web con WhatsApp",
  "Catálogo online",
  "Reservas",
  "Inventario simple",
  "Panel para administrar",
];

const clubFeatures = [
  "Socios y cuotas",
  "Asistencia y eventos",
  "Comunicaciones internas",
  "Reportes y panel admin",
];

const steps = [
  ["Instagram", "Te encuentran"],
  ["Web", "Confían"],
  ["WhatsApp", "Compran"],
];

type Spark = { id: number; x: number; y: number };

const enterUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function PhoneStory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]"
    >
      <div className="absolute -inset-4 rounded-[34px] bg-[conic-gradient(from_180deg,rgba(34,211,238,0.0),rgba(34,211,238,0.35),rgba(99,102,241,0.26),rgba(34,211,238,0.0))] opacity-80 blur-2xl" />
      <div className="relative rounded-[34px] border border-slate-200 bg-slate-950 p-2 shadow-2xl shadow-blue-950/20 dark:border-white/10">
        <div className="overflow-hidden rounded-[28px] bg-white text-slate-950 dark:bg-[#080b14] dark:text-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400" />
              <div>
                <p className="text-sm font-semibold">@tu.negocio</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">cliente desde Instagram</p>
              </div>
            </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 text-[10px] font-black text-white">
                IG
              </span>
          </div>
          <div className="space-y-3 p-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.06]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-cyan-300">
                Landing lista
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight">Precios, fotos, ubicación y contacto.</p>
              <button className="mt-4 h-10 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
                Reservar por WhatsApp
              </button>
            </motion.div>
            <div className="grid grid-cols-3 gap-2">
              {steps.map(([title, text], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.48 + index * 0.12 }}
                  className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{text}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
              <Check className="h-4 w-4" />
              <p className="text-xs font-semibold">Menos preguntas repetidas. Más clientes listos.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeContent() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [sparks, setSparks] = useState<Spark[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);
  const sparkId = useRef(0);
  const { scrollYProgress } = useScroll({ container: mainRef });
  const heroShift = useTransform(scrollYProgress, [0, 0.28], [0, -40]);

  useEffect(() => {
    const seen = sessionStorage.getItem("toalesco-loaded");
    if (seen) setLoading(false);
    else sessionStorage.setItem("toalesco-loaded", "true");
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { root, threshold: 0.55 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addSpark = (x: number, y: number) => {
    const id = sparkId.current++;
    setSparks((current) => [...current.slice(-12), { id, x, y }]);
    window.setTimeout(() => {
      setSparks((current) => current.filter((spark) => spark.id !== id));
    }, 650);
  };

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <div
        onPointerMove={(event) => addSpark(event.clientX, event.clientY)}
        className="relative flex h-dvh flex-col overflow-hidden bg-white text-slate-950 selection:bg-cyan-200 dark:bg-[#05070c] dark:text-white"
      >
        <div className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.015] dark:opacity-[0.04]" />
        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            className="pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.95)]"
            style={{ left: spark.x - 4, top: spark.y - 4 }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        ))}

        <SectionNav active={activeSection} />
        <WhatsAppButton />
        <Navbar />

        <main
          ref={mainRef}
          className="relative z-10 flex-1 snap-y snap-mandatory overflow-y-auto scroll-smooth motion-reduce:snap-none motion-reduce:scroll-auto"
        >
          <section
            id="hero"
            className="relative flex min-h-[calc(100dvh-3.5rem)] snap-start items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(140deg,#ffffff_0%,#f8fbff_42%,#eef7ff_100%)] dark:bg-[linear-gradient(140deg,#05070c_0%,#080b14_55%,#061421_100%)]" />
            <motion.div
              className="absolute inset-x-0 top-8 h-28 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.22),rgba(59,130,246,0.16),transparent)] blur-2xl"
              animate={{ x: ["-35%", "35%", "-35%"] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div
              style={{ y: heroShift }}
              className="container relative mx-auto grid max-w-7xl items-center gap-7 lg:grid-cols-[1fr_0.9fr]"
            >
              <div className="pt-2 sm:pt-8">
                <motion.div
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48 }}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/7 dark:text-slate-300"
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                  Webs para negocios que venden por Instagram
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[3.2rem] font-semibold leading-[0.9] tracking-normal text-slate-950 dark:text-white sm:text-7xl lg:text-8xl"
                >
                  Que tu pyme se vea tan buena como trabaja.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16, duration: 0.52 }}
                  className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-xl sm:leading-8"
                >
                  Creamos una web clara, rápida y conectada a WhatsApp para que tus clientes entiendan, confíen y te escriban.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                  className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    className="inline-flex h-14 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition-all active:scale-[0.98] dark:bg-white dark:text-slate-950 sm:h-12"
                  >
                    Cotizar mi web
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-300 bg-white/80 px-6 text-sm font-semibold text-slate-900 backdrop-blur-xl transition-all active:scale-[0.98] dark:border-white/15 dark:bg-white/7 dark:text-white sm:h-12"
                  >
                    <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 text-[8px] font-black text-white">
                      IG
                    </span>
                    @toalesco.dev
                  </a>
                </motion.div>
              </div>
              <PhoneStory />
            </motion.div>
          </section>

          <section
            id="clubes"
            className="relative flex min-h-[calc(100dvh-3.5rem)] snap-start items-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#05070c_0%,#07111d_100%)]" />
            <div className="container relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -28, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-cyan-300">
                  Gestión de clubes
                </p>
                <h2 className="text-[2.6rem] font-semibold leading-[0.96] tracking-normal text-slate-950 dark:text-white sm:text-6xl">
                  Orden para clubes que hoy viven en Excel y WhatsApp.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                  Si necesitas socios, cuotas, asistencia o comunicación en un solo lugar, esta es la línea correcta.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {clubFeatures.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/7 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 32, rotate: 1.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06]"
              >
                <div className="rounded-[24px] bg-slate-950 p-5 text-white dark:bg-white dark:text-slate-950">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 dark:text-cyan-600">
                    club dashboard
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Socios", "al día"],
                      ["Cuotas", "controladas"],
                      ["Asistencia", "registrada"],
                      ["Avisos", "enviados"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-2xl font-semibold">{value}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section
            id="projects"
            className="relative flex min-h-[calc(100dvh-3.5rem)] snap-start items-center overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8"
          >
            <motion.div
              className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(90deg,rgba(34,211,238,0.0),rgba(34,211,238,0.22),rgba(99,102,241,0.2),rgba(34,211,238,0.0))] blur-3xl"
              animate={{ x: ["30%", "-30%", "30%"] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
            />
            <div className="container relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <motion.div
                variants={enterUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Qué hacemos</p>
                <h2 className="text-4xl font-semibold leading-[0.98] tracking-normal sm:text-6xl">
                  Primero que te escriban. Después ordenamos el negocio.
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {quickServices.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-slate-200"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 text-sm text-slate-300">
                  <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    Tus horarios, servicios, fotos, ubicación y precios quedan claros.
                  </div>
                  <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    El cliente llega desde Instagram y termina hablando contigo por WhatsApp.
                  </div>
                </div>
              </motion.div>
              <ProjectCarousel />
            </div>
          </section>

          <section
            id="cta"
            className="relative flex min-h-[calc(100dvh-3.5rem)] snap-start items-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(140deg,#ffffff_0%,#f8fbff_42%,#eef7ff_100%)] dark:bg-[linear-gradient(140deg,#05070c_0%,#080b14_55%,#061421_100%)]" />
            <div className="container relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: -38, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-cyan-300">
                  Hablemos sin vueltas
                </p>
                <h2 className="text-[2.8rem] font-semibold leading-[0.95] tracking-normal text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                  Mándanos tu Instagram y te decimos qué web necesitas.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                  Partimos simple: una página que explique tu negocio, muestre confianza y lleve clientes directo a WhatsApp.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 34, rotate: 1.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[28px] border border-slate-200 bg-white/82 p-4 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07]"
              >
                <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-950 p-4 text-white dark:bg-white dark:text-slate-950">
                  <MousePointer2 className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Contacto rápido</p>
                    <p className="text-sm opacity-70">Ideal si vienes desde Instagram.</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    className="flex min-h-14 items-center justify-between rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-transform active:scale-[0.98]"
                  >
                    <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    className="flex min-h-14 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition-transform active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 text-[8px] font-black text-white">
                        IG
                      </span>
                      @toalesco.dev
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={mailUrl}
                    className="flex min-h-14 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition-transform active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                  >
                    <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Correo listo</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
