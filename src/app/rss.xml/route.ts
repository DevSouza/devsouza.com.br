import { buildFeed } from "@/lib/rss";

export const dynamic = "force-static";

/** Feed RSS no idioma padrão: /rss.xml */
export function GET() {
  return buildFeed();
}
