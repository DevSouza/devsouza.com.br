import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => siteConfig.url + p;
  const pages = ["", "/blog", "/projetos", "/livros", "/carreira", "/sobre"].map((p) => ({
    url: u(p),
    changeFrequency: "weekly" as const,
  }));
  const posts = getAllPosts().flatMap((p) =>
    p.variants.map((v) => ({ url: u(v.url), lastModified: v.updated ?? v.date })),
  );
  const tags = getAllTags().map((t) => ({ url: u(`/blog/tag/${t.slug}`) }));
  return [...pages, ...posts, ...tags];
}
