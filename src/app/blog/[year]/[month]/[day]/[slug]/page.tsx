import { getAllPosts, type PostParams } from "@/lib/posts";
import { PostView, postMetadata } from "@/components/PostView";

type Props = { params: Promise<PostParams> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ year, month, day, slug }) => ({ year, month, day, slug }));
}

export async function generateMetadata({ params }: Props) {
  return postMetadata(await params);
}

export default async function PostPage({ params }: Props) {
  return <PostView params={await params} />;
}
