import { buildFeed } from "@/lib/rss";
import { getAllLangs } from "@/lib/posts";
import { defaultLocale } from "@/lib/i18n";

export const dynamic = "force-static";
export const dynamicParams = false;

/** Feeds por idioma: /rss/en.xml, /rss/es.xml ... */
export function generateStaticParams() {
  return getAllLangs()
    .filter((l) => l !== defaultLocale)
    .map((lang) => ({ file: `${lang}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  return buildFeed(file.replace(/\.xml$/, ""));
}
