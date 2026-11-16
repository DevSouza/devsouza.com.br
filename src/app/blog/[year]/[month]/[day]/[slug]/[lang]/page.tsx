import { getAllPosts, type PostParams } from "@/lib/posts";
import { defaultLocale } from "@/lib/i18n";
import { PostView, postMetadata } from "@/components/PostView";

type Props = { params: Promise<PostParams & { lang: string }> };

export const dynamicParams = false;

/** Traduções: /blog/2026/11/16/001-slug/en */
export function generateStaticParams() {
  return getAllPosts().flatMap(({ year, month, day, slug, variants }) =>
    variants.filter((v) => v.lang !== defaultLocale).map((v) => ({ year, month, day, slug, lang: v.lang })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { lang, ...p } = await params;
  return postMetadata(p, lang);
}

export default async function TranslatedPostPage({ params }: Props) {
  const { lang, ...p } = await params;
  return <PostView params={p} lang={lang} />;
}
