import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, tagSlug, type PostParams } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate, localeInfo, t } from "@/lib/i18n";
import { siteConfig } from "@/site.config";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";

function find(params: PostParams, lang?: string) {
  const post = getPost(params);
  if (!post) return null;
  const variant = lang ? post.variants.find((v) => v.lang === lang) : post.primary;
  if (!variant) return null;
  return { post, variant };
}

export function postMetadata(params: PostParams, lang?: string): Metadata {
  const found = find(params, lang);
  if (!found) return {};
  const { post, variant } = found;
  return {
    title: variant.title,
    description: variant.description,
    authors: [{ name: siteConfig.author }],
    alternates: {
      canonical: variant.url,
      languages: Object.fromEntries(post.variants.map((v) => [localeInfo(v.lang).hreflang, v.url])),
    },
    openGraph: {
      type: "article",
      title: variant.title,
      description: variant.description,
      publishedTime: variant.date,
      modifiedTime: variant.updated,
      tags: variant.tags,
      url: variant.url,
      images: variant.cover ? [variant.cover] : undefined,
    },
  };
}

export async function PostView({ params, lang }: { params: PostParams; lang?: string }) {
  const found = find(params, lang);
  if (!found) notFound();
  const { post, variant } = found;
  const html = await renderMarkdown(variant.content, post.dir);
  const i = t(variant.lang);
  const others = post.variants.filter((v) => v.lang !== variant.lang);

  // posts vizinhos (ordem cronológica)
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.dir === post.dir);
  const newer = all[idx - 1];
  const older = all[idx + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: variant.title,
    description: variant.description,
    datePublished: variant.date,
    dateModified: variant.updated ?? variant.date,
    inLanguage: localeInfo(variant.lang).hreflang,
    author: { "@type": "Person", name: siteConfig.author, url: siteConfig.url },
    url: siteConfig.url + variant.url,
    image: variant.cover ? siteConfig.url + variant.cover : undefined,
  };

  return (
    <article lang={localeInfo(variant.lang).hreflang} className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-accent">
        <ArrowLeftIcon width={16} height={16} /> {i.backToBlog}
      </Link>

      <header className="pb-8 pt-8 sm:pt-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <time dateTime={variant.date}>{formatDate(variant.date, variant.lang)}</time>
          <span aria-hidden>•</span>
          <span>{i.readingTime(variant.readingTime)}</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{variant.title}</h1>
        {variant.description && <p className="mt-4 text-lg text-muted sm:text-xl">{variant.description}</p>}

        {variant.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {variant.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog/tag/${tagSlug(tag)}`} className="chip transition hover:border-accent hover:text-accent">
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {others.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-border p-3 text-sm">
            <span className="text-muted">🌐 {i.otherLangs}:</span>
            {others.map((v) => (
              <Link
                key={v.lang}
                href={v.url}
                hrefLang={localeInfo(v.lang).hreflang}
                className="rounded-full bg-surface-2 px-3 py-1 font-medium transition hover:bg-brand hover:text-white"
              >
                {localeInfo(v.lang).label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {variant.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={variant.cover} alt="" className="mb-10 w-full rounded-3xl border border-border object-cover" />
      )}

      <div className="prose-post" dangerouslySetInnerHTML={{ __html: html }} />

      <nav aria-label="Outros posts" className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {older ? (
          <Link href={older.primary.url} className="card card-hover p-5">
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowLeftIcon width={14} height={14} /> {i.prev}
            </span>
            <span className="mt-1 block font-display font-bold">{older.primary.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link href={newer.primary.url} className="card card-hover p-5 text-right">
            <span className="flex items-center justify-end gap-1 text-xs text-muted">
              {i.next} <ArrowRightIcon width={14} height={14} />
            </span>
            <span className="mt-1 block font-display font-bold">{newer.primary.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
