"use client";

import { useEffect } from "react";
import { gaId } from "@/data/analytics";

export function Analytics() {
  useEffect(() => {
    if (!gaId || typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) { window.dataLayer.push(args); }
    gtag("js", new Date());
    gtag("config", gaId);
  }, []);

  return null;
}
