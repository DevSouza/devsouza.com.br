import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { defaultLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/PostCard";
import { RssIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos, tutoriais e reflexões sobre tecnologia e carreira.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  // A listagem do /blog é em português; as tags de outros idiomas continuam acessíveis pelos posts traduzidos.
  const tags = getAllTags(defaultLocale);

  const byYear = posts.reduce<Record<string, typeof posts>>((acc, p) => {
    (acc[p.year] ??= []).push(p);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
        title="Blog"
        description="Artigos, tutoriais e reflexões sobre tecnologia, código e carreira."
      >
        <a
          href="/rss.xml"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-fg/30 hover:text-fg"
        >
          <RssIcon width={16} height={16} /> Assinar via RSS
        </a>
      </PageHeader>

      {tags.length > 0 && (
        <nav aria-label="Tags" className="-mx-5 mb-12 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul className="flex gap-2 sm:flex-wrap">
            {tags.map((tag) => (
              <li key={tag.slug} className="shrink-0">
                <Link
                  href={`/blog/tag/${tag.slug}`}
                  className="chip transition hover:border-accent hover:text-accent"
                >
                  #{tag.name} <span className="ml-1 opacity-60">{tag.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {Object.keys(byYear)
        .sort((a, b) => b.localeCompare(a))
        .map((year) => (
          <section key={year} className="mb-12">
            <h2 className="mb-5 flex items-center gap-4 font-mono text-sm font-medium text-muted">
              {year} <span className="h-px flex-1 bg-border" />
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {byYear[year].map((p) => (
                <PostCard key={p.dir} post={p} />
              ))}
            </div>
          </section>
        ))}

      {!posts.length && <p className="text-muted">Nenhum post publicado ainda.</p>}
    </>
  );
}
