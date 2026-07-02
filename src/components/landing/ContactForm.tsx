"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, Check, AlertCircle, Mail } from "lucide-react";
import { formEndpoint, contactEmail } from "@/data/contact";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const reset = () => setTimeout(() => setStatus("idle"), 5000);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setStatus("sending");

    if (formEndpoint) {
      try {
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });
        if (res.ok) {
          setStatus("success");
          setName(""); setEmail(""); setSubject(""); setMessage("");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
      reset();
      return;
    }

    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(`[TOALESCO] ${subject}`)}&body=${encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`
    )}`;

    window.location.href = mailtoLink;
    setStatus("success");
    setName(""); setEmail(""); setSubject(""); setMessage("");
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div>
        <label htmlFor="name" className="text-xs sm:text-sm font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Tu nombre"
          className="w-full h-11 sm:h-12 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm sm:text-base font-mono text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs sm:text-sm font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@email.com"
          className="w-full h-11 sm:h-12 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm sm:text-base font-mono text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="subject" className="text-xs sm:text-sm font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Asunto
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          placeholder="¿De qué se trata?"
          className="w-full h-11 sm:h-12 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm sm:text-base font-mono text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs sm:text-sm font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Mensaje
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Cuéntanos sobre tu proyecto..."
          rows={5}
          className="w-full rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm sm:text-base font-mono text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className={`inline-flex h-12 sm:h-14 w-full items-center justify-center rounded-xl text-sm sm:text-base font-mono font-bold transition-all border-b-2 ${
          status === "success"
            ? "bg-orange-600 border-orange-800 text-white"
            : status === "error"
            ? "bg-red-600 border-red-800 text-white"
            : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 border-blue-800 dark:border-blue-600 text-white dark:text-slate-900 hover:shadow-lg hover:shadow-blue-600/25 dark:hover:shadow-blue-500/30"
        }`}
      >
        {status === "idle" && (
          <>
            Enviar Mensaje <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </>
        )}
        {status === "sending" && (
          <>
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" /> Enviando...
          </>
        )}
        {status === "success" && (
          <>
            <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Mensaje listo
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Error al enviar
          </>
        )}
      </button>
      {status === "success" && (
        <p className="text-xs sm:text-sm font-mono text-orange-600 dark:text-orange-400 text-center">
          Se abrirá tu cliente de correo. Solo presiona enviar.
        </p>
      )}
      <p className="text-[10px] sm:text-xs font-mono text-slate-400 dark:text-slate-500 text-center">
        $ <span className="text-orange-500">✓</span> Comunicación cifrada de extremo a extremo
      </p>
    </form>
  );
}
