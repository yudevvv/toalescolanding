"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun, Menu, X, Code2, ChevronLeft } from "lucide-react";
import { proyectos } from "@/data/proyectos";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Clubes", href: "#clubes" },
  { label: "Qué hacemos", href: "#projects" },
  { label: "Contacto", href: "#cta" },
];

const instagramUrl = "https://www.instagram.com/toalesco.dev/";
const whatsappUrl =
  "https://wa.me/56912345678?text=Hola%20TOALESCO%2C%20quiero%20cotizar%20un%20proyecto%20para%20mi%20pyme";

function focusTrap(element: HTMLElement, event: KeyboardEvent) {
  if (event.key !== "Tab") return;
  const focusable = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isLanding = pathname === "/";
  const isProyectos = pathname === "/proyectos";
  const isProyectoDetalle = pathname.startsWith("/proyectos/") && !isProyectos;
  const proyectoSlug = isProyectoDetalle ? pathname.replace("/proyectos/", "") : null;
  const proyecto = proyectoSlug ? proyectos.find((p) => p.slug === proyectoSlug) : null;

  useEffect(() => {
    if (!open || !menuRef.current) return;
    const handler = (e: KeyboardEvent) => {
      if (menuRef.current) focusTrap(menuRef.current, e);
    };
    document.addEventListener("keydown", handler);
    menuRef.current.querySelector<HTMLElement>("a, button")?.focus();
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isLanding) return;
    const ids = navLinks.map((l) => l.href).filter((h) => h.startsWith("#"));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isLanding]);

  const headerClass =
    "shrink-0 h-14 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/88 dark:bg-slate-950/88 backdrop-blur-2xl transition-colors";

  if (!isLanding) {
    return (
      <header className={headerClass} role="banner">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950">
                <Code2 className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">TOALESCO</span>
            </Link>
            <span className="hidden select-none text-slate-300 dark:text-slate-600 sm:inline">/</span>
            <span className="hidden rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 sm:inline">
              proyectos
            </span>
            {isProyectoDetalle && (
              <>
                <span className="hidden select-none text-slate-300 dark:text-slate-600 sm:inline">/</span>
                <span className="truncate text-xs text-slate-700 dark:text-slate-200 sm:text-sm">
                  {proyecto?.title || proyectoSlug}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={isProyectos ? "/" : "/proyectos"}
              className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white sm:inline-flex"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>{isProyectos ? "Inicio" : "Proyectos"}</span>
            </Link>
            <button
              onClick={toggle}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800"
              aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
              title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-cyan-300" /> : <Moon className="h-4 w-4 text-slate-500" />}
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={headerClass} role="banner">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="TOALESCO inicio">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950">
            <Code2 className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">TOALESCO</span>
          <span className="ml-1 hidden rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 sm:inline">
            pymes + software
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/7 dark:hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={instagramUrl}
            target="_blank"
            className="hidden h-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-600 transition-all hover:-translate-y-0.5 hover:border-rose-200 hover:text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-rose-300/30 dark:hover:text-rose-300 md:inline-flex"
          >
            Instagram
          </a>
          <a
            href="#cta"
            className="hidden h-8 items-center justify-center rounded-full bg-slate-950 px-3.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 md:inline-flex"
          >
            WhatsApp
          </a>
          <button
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800"
            aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
            title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-cyan-300" /> : <Moon className="h-4 w-4 text-slate-500" />}
          </button>
          <button
            onClick={() => setOpen((current) => !current)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4 text-slate-600 dark:text-slate-300" /> : <Menu className="h-4 w-4 text-slate-600 dark:text-slate-300" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="navigation"
          aria-label="Menú móvil"
          className="md:hidden fixed inset-x-0 top-14 bottom-0 z-50 border-t border-slate-200 bg-white/96 px-4 py-5 backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-950/96"
        >
          <div className="mb-4 grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
            >
              WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              Instagram
            </a>
          </div>

          <div className="space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-4 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/8"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
