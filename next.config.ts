import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Todas as páginas são geradas estaticamente (SSG).
  // Descomente para gerar um site 100% estático em /out (GitHub Pages, Netlify, etc.):
  // output: "export",
  trailingSlash: false,
};

export default nextConfig;
