import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getAllTags, tagSlug } from "@/lib/posts";
import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/PostCard";
import { ArrowLeftIcon } from "@/components/Icons";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const info = getAllTags().find((t) => t.slug === tag);
  return { title: `#${info?.name ?? tag}`, alternates: { canonical: `/blog/tag/${tag}` } };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const info = getAllTags().find((t) => t.slug === tag);
  if (!info) notFound();
  const posts = getAllPosts().filter((p) => p.primary.tags.some((t) => tagSlug(t) === tag));

  return (
    <>
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeftIcon width={16} height={16} /> Blog
      </Link>
      <PageHeader eyebrow={`${posts.length} post(s)`} title={`#${info.name}`} />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.dir} post={p} />
        ))}
      </div>
    </>
  );
}
