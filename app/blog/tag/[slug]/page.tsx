import PageTransition from "@/src/feature/layout/effects/PageTransition";
import BlogPostList from '@/src/feature/layout/blog/BlogPostList';
import React from "react"
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import { getTag } from "@/src/query/tag.query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from "@fortawesome/pro-solid-svg-icons";
import Link from "next/link";
export const metadata: Metadata = {
  title: Meta("title", "Blog"),
  description: "Ekoseon",
};
export default async function BlogPostsByTag({
  params,
}: {
  params: { method: string; slug: string, id: string };
  }) {
  const tag = await getTag(params.slug); 
    
  return (
    <PageTransition>
      <div className="content">
        <h1><Link href="/blog">Blog</Link> » <FontAwesomeIcon icon={faTag} className="mx-2" /> {tag?.name}</h1>
        <div className="flex md:flex-row flex-col gap-5">
        <div className="md:w-4/6 w-full">
          <BlogPostList tagName={params.slug}  />
          </div>
        <div  className="md:w-2/6 w-full md:border-l-[1px] md:pl-4">
          Coucou
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
