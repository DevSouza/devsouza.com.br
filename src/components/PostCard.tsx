import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate, localeInfo, t } from "@/lib/i18n";

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const v = post.primary;
  return (
    <article className="card card-hover group relative flex flex-col overflow-hidden">
      {v.cover && !compact && (
        <div className="aspect-[2/1] overflow-hidden border-b border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={v.cover}
            alt=""
            loading="lazy"
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <time dateTime={v.date}>{formatDate(v.date, v.lang)}</time>
          <span aria-hidden>•</span>
          <span>{t(v.lang).readingTime(v.readingTime)}</span>
          {post.variants.length > 1 && (
            <span className="ml-auto flex gap-1" aria-label="Idiomas disponíveis">
              {post.variants.map((x) => (
                <span key={x.lang} className="rounded border border-border px-1.5 py-px text-[10px]">
                  {localeInfo(x.lang).short}
                </span>
              ))}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold leading-snug transition group-hover:text-accent">
          <Link href={v.url} className="after:absolute after:inset-0" lang={localeInfo(v.lang).hreflang}>
            {v.title}
          </Link>
        </h3>
        {v.description && <p className="line-clamp-3 text-muted">{v.description}</p>}
        {v.tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {v.tags.slice(0, 4).map((tag) => (
              <li key={tag} className="chip">
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
