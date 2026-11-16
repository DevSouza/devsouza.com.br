"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Registra cliques em elementos com `data-track` como eventos do Vercel Analytics.
 * Uso: <a data-track="LinkedIn" data-track-local="home">...</a>
 * (eventos personalizados aparecem no painel apenas nos planos Pro/Enterprise da Vercel)
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(`Clique: ${el.dataset.track}`, {
        local: el.dataset.trackLocal ?? location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
