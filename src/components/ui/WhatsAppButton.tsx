"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const phone = "56912345678";

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${phone}?text=Hola%20TOALESCO%2C%20quiero%20consultar%20por%20un%20proyecto`}
      target="_blank"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:bg-emerald-400 transition-all"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
}
