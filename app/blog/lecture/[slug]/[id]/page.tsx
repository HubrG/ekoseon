import { ReadPost } from "@/src/feature/layout/blog/ReadPost";
import React from "react";
import { getBlogPost } from "@/src/query/blog.query";
import type { Metadata, ResolvingMetadata } from "next";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import NotFound from "@/app/not-found";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const title = await getBlogPost(params.id); // Assurez-vous que cela renvoie bien un BlogPost

  return {
    title: Meta(
      "title",
      title?.title ? title?.title + " | Blog " : "Aucun article"
    ),
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default async function ReadBlogPost({
  params,
}: {
  params: { method: string; slug: string; id: string };
}) {
  const blogPost = await getBlogPost(params.id); // Assurez-vous que cela renvoie bien un BlogPost

  return (
    <div className="content">
      {blogPost ? (
        <ReadPost blogPost={blogPost} />
      ) : (
        <>
          <NotFound />
        </>
      )}
    </div>
  );
}
