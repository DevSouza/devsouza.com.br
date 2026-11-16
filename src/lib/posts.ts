import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale } from "./i18n";

/**
 * Estrutura esperada:
 *   contents/<ano>/<mes>/<dia>/<numero>-<slug>/index.md      -> idioma padrão (pt)
 *   contents/<ano>/<mes>/<dia>/<numero>-<slug>/index.en.md   -> tradução em inglês
 */
export const CONTENT_DIR = path.join(process.cwd(), "contents");

export type PostVariant = {
  lang: string;
  title: string;
  description: string;
  date: string; // ISO
  updated?: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  content: string; // markdown bruto
  readingTime: number;
  url: string;
};

export type Post = {
  year: string;
  month: string;
  day: string;
  slug: string; // nome da pasta, ex: 001-ola-mundo
  number: number;
  dir: string; // caminho relativo a /contents
  variants: PostVariant[];
  primary: PostVariant;
};

export type PostParams = { year: string; month: string; day: string; slug: string };

const isProd = process.env.NODE_ENV === "production";
let cache: Post[] | null = null;

const subdirs = (p: string, re: RegExp) =>
  fs.existsSync(p)
    ? fs
        .readdirSync(p, { withFileTypes: true })
        .filter((d) => d.isDirectory() && re.test(d.name))
        .map((d) => d.name)
    : [];

function toISO(value: unknown): string | undefined {
  if (!value) return undefined;
  const d = value instanceof Date ? value : new Date(String(value));
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

function resolveAsset(dir: string, src?: string) {
  if (!src) return undefined;
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return src;
  return `/contents/${dir}/${src.replace(/^\.\//, "")}`;
}

export function postUrl(p: PostParams, lang: string = defaultLocale) {
  const base = `/blog/${p.year}/${p.month}/${p.day}/${p.slug}`;
  return lang === defaultLocale ? base : `${base}/${lang}`;
}

function loadPost(year: string, month: string, day: string, slug: string): Post | null {
  const dir = `${year}/${month}/${day}/${slug}`;
  const abs = path.join(CONTENT_DIR, dir);
  const files = fs.readdirSync(abs).filter((f) => /^index(\.[a-z]{2}(-[A-Za-z]{2})?)?\.md$/.test(f));

  const variants: PostVariant[] = files
    .map((file) => {
      const lang = file === "index.md" ? defaultLocale : file.split(".")[1];
      const { data, content } = matter(fs.readFileSync(path.join(abs, file), "utf8"));
      const words = content.trim().split(/\s+/).length;
      return {
        lang,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: toISO(data.date) ?? new Date(Date.UTC(+year, +month - 1, +day)).toISOString(),
        updated: toISO(data.updated),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        cover: resolveAsset(dir, data.cover),
        draft: Boolean(data.draft),
        content,
        readingTime: Math.max(1, Math.round(words / 200)),
        url: postUrl({ year, month, day, slug }, lang),
      };
    })
    .filter((v) => !(isProd && v.draft))
    .sort((a, b) =>
      a.lang === defaultLocale ? -1 : b.lang === defaultLocale ? 1 : a.lang.localeCompare(b.lang),
    );

  if (!variants.length) return null;
  return {
    year,
    month,
    day,
    slug,
    dir,
    number: parseInt(slug, 10) || 0,
    variants,
    primary: variants[0],
  };
}

export function getAllPosts(): Post[] {
  if (cache && isProd) return cache;
  const posts: Post[] = [];
  for (const y of subdirs(CONTENT_DIR, /^\d{4}$/))
    for (const m of subdirs(path.join(CONTENT_DIR, y), /^\d{2}$/))
      for (const d of subdirs(path.join(CONTENT_DIR, y, m), /^\d{2}$/))
        for (const s of subdirs(path.join(CONTENT_DIR, y, m, d), /^[\w-]+$/)) {
          const post = loadPost(y, m, d, s);
          if (post) posts.push(post);
        }
  posts.sort((a, b) => b.primary.date.localeCompare(a.primary.date) || b.number - a.number);
  cache = posts;
  return posts;
}

export function getPost(p: PostParams) {
  return getAllPosts().find(
    (x) => x.year === p.year && x.month === p.month && x.day === p.day && x.slug === p.slug,
  );
}

/** Posts disponíveis em um idioma específico (usado no RSS por idioma). */
export function getPostsByLang(lang: string) {
  return getAllPosts()
    .map((post) => ({ post, variant: post.variants.find((v) => v.lang === lang) }))
    .filter((x): x is { post: Post; variant: PostVariant } => !!x.variant);
}

export function getAllLangs() {
  return [...new Set(getAllPosts().flatMap((p) => p.variants.map((v) => v.lang)))];
}

export const tagSlug = (tag: string) =>
  tag
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function getAllTags() {
  const map = new Map<string, { name: string; count: number }>();
  for (const p of getAllPosts())
    for (const name of p.primary.tags) {
      const slug = tagSlug(name);
      const cur = map.get(slug) ?? { name, count: 0 };
      cur.count++;
      map.set(slug, cur);
    }
  return [...map.entries()]
    .map(([slug, v]) => ({ slug, ...v }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
