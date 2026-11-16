"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Revela elementos com o atributo `data-reveal` quando entram na tela.
 * Uso: <div data-reveal style={{ "--d": "120ms" }}>...</div>  (--d = atraso opcional)
 * O estilo fica em globals.css e só é aplicado com JS ativo e sem "reduzir movimento".
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
