import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { ClickTracker } from "@/components/ClickTracker";
import { Analytics } from "@vercel/analytics/next";
import { getAllLangs } from "@/lib/posts";
import { defaultLocale, localeInfo } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const feeds = getAllLangs().map((lang) => ({
  url: lang === defaultLocale ? "/rss.xml" : `/rss/${lang}.xml`,
  title: `${siteConfig.title} (${localeInfo(lang).label})`,
}));

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.author} · Desenvolvedor Fullstack Java`, template: `%s · ${siteConfig.title}` },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: { type: "website", siteName: siteConfig.title, locale: "pt_BR" },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": feeds.length ? feeds : [{ url: "/rss.xml", title: siteConfig.title }] },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

// Aplica o tema antes da renderização para evitar "piscar"
// (também marca <html class="js"> para as animações de revelar ao rolar)
const themeScript = `(()=>{document.documentElement.classList.add('js');try{const t=localStorage.getItem('theme');const d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="mx-auto w-full max-w-5xl flex-1 px-5 pb-20 pt-6 sm:px-8">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <ClickTracker />
        <Analytics />
      </body>
    </html>
  );
}
