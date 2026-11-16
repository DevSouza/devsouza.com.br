import { Feed } from "feed";
import { siteConfig } from "@/site.config";
import { getPostsByLang } from "./posts";
import { renderMarkdown } from "./markdown";
import { defaultLocale, localeInfo } from "./i18n";
import { getProfile } from "./data";

export async function buildFeed(lang: string = defaultLocale) {
  const site = siteConfig.url;
  const profile = getProfile();
  const author = { name: profile.name ?? siteConfig.author, link: site };
  const selfUrl = lang === defaultLocale ? `${site}/rss.xml` : `${site}/rss/${lang}.xml`;
  const items = getPostsByLang(lang).slice(0, 50);

  const feed = new Feed({
    title: lang === defaultLocale ? siteConfig.title : `${siteConfig.title} (${localeInfo(lang).label})`,
    description: siteConfig.description,
    id: site + "/",
    link: site + "/",
    language: localeInfo(lang).hreflang,
    image: profile.avatar ? site + profile.avatar : undefined,
    copyright: `© ${new Date().getFullYear()} ${author.name}`,
    updated: items[0] ? new Date(items[0].variant.date) : new Date(),
    feedLinks: { rss: selfUrl },
    author,
  });

  for (const { post, variant } of items) {
    feed.addItem({
      title: variant.title,
      id: site + variant.url,
      link: site + variant.url,
      description: variant.description,
      content: await renderMarkdown(variant.content, post.dir, site),
      date: new Date(variant.updated ?? variant.date),
      published: new Date(variant.date),
      category: variant.tags.map((name) => ({ name })),
      image: variant.cover ? (variant.cover.startsWith("http") ? variant.cover : site + variant.cover) : undefined,
      author: [author],
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
