import { siteConfig } from "@/site.config";

type LocaleInfo = { label: string; short: string; hreflang: string; dateLocale: string };

/** Idiomas conhecidos. Arquivos index.<codigo>.md com outros códigos também funcionam. */
export const locales: Record<string, LocaleInfo> = {
  pt: { label: "Português", short: "PT", hreflang: "pt-BR", dateLocale: "pt-BR" },
  en: { label: "English", short: "EN", hreflang: "en", dateLocale: "en-US" },
  es: { label: "Español", short: "ES", hreflang: "es", dateLocale: "es-ES" },
};

export const defaultLocale = siteConfig.defaultLocale;

export function localeInfo(lang: string): LocaleInfo {
  return locales[lang] ?? { label: lang, short: lang.toUpperCase(), hreflang: lang, dateLocale: lang };
}

export function formatDate(iso: string, lang = defaultLocale) {
  return new Date(iso).toLocaleDateString(localeInfo(lang).dateLocale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const ui = {
  pt: {
    readingTime: (m: number) => `${m} min de leitura`,
    otherLangs: "Também disponível em",
    backToBlog: "Voltar ao blog",
    prev: "Anterior",
    next: "Próximo",
  },
  en: {
    readingTime: (m: number) => `${m} min read`,
    otherLangs: "Also available in",
    backToBlog: "Back to blog",
    prev: "Previous",
    next: "Next",
  },
  es: {
    readingTime: (m: number) => `${m} min de lectura`,
    otherLangs: "También disponible en",
    backToBlog: "Volver al blog",
    prev: "Anterior",
    next: "Siguiente",
  },
};

export function t(lang: string) {
  return ui[lang as keyof typeof ui] ?? ui.en;
}
