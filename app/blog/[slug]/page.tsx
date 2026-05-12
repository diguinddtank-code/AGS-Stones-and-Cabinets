import type { Metadata } from "next";
import BlogPostClient from "../../../components/BlogPostClient";
import { blogContent } from "../../../lib/blogData";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogContent[params.slug];
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | AGS Stones Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.agsstonefabricators.com/blog/${params.slug}`,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />;
}
