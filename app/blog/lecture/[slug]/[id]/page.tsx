import { ReadPost } from "@/src/feature/layout/blog/ReadPost";
import React from "react";
import { getBlogPost } from "@/src/query/blog.query";
import type { Metadata } from "next";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import NotFound from "@/app/not-found";
import { BlogPost } from "@prisma/client";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface ExtendedBlogPost extends BlogPost {
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  tags?: Array<{
    tagId: string;
    postId: string;
    tag: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const blogPost = (await getBlogPost(params.id)) as ExtendedBlogPost; // Assurez-vous que cela renvoie bien un BlogPost
  // Si blogPost est null, vous devriez traiter cette situation, soit en retournant des métadonnées par défaut, soit en gérant l'erreur.
  if (!blogPost) {
    throw new Error("Article de blog non trouvé");
    // Ou retournez des métadonnées par défaut si c'est approprié pour votre application
  }
  const description = blogPost?.excerpt ? blogPost?.excerpt : "Aucun extrait";
  // On réduit la taille de la description à 170 caractères maximum
  if (description && description.length > 170) {
    blogPost.excerpt = description.slice(0, 166) + "...";
  }
  const title = blogPost?.title ? blogPost?.title + " | Blog " : "Aucun article";
  return {
    title: Meta(
      "title",
      title
    ),
    description: description,
    alternates:
      {
       canonical: process.env.NEXT_PUBLIC_RELATIVE_URI + "/blog/lecture/" + blogPost?.canonicalSlug + "/" + blogPost?.id,
      },
    openGraph: {
      title: Meta(
        "title",
        title
      ),
      description: description,
      url:
        process.env.NEXT_PUBLIC_RELATIVE_URI +
        "/blog/lecture/" +
        blogPost?.canonicalSlug +
        "/" +
        blogPost?.id,
      images: blogPost?.image
        ? blogPost?.image
        : process.env.NEXT_PUBLIC_RELATIVE_URI + "/img/header-home.webp",
      type: "article",
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      publishedTime: blogPost?.publishedAt?.toISOString(), // Assurez-vous que c'est une chaîne de caractères ISO
      modifiedTime: blogPost?.updatedAt?.toISOString(), // Assurez-vous que c'est une chaîne de caractères ISO
      section: blogPost.category?.name || "Blog",
      tags:
        blogPost.tags?.map((t) => t.tag?.name).filter((name) => name != null) ||
        [],
      authors: ["Ekoseon"], // Assurez-vous que ceci est conforme à votre structure de données
      // tags: post?.tags ? post?.tags : [],
    },
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
      {blogPost && blogPost.published ? (
        <ReadPost blogPost={blogPost} />
      ) : (
        <>
          <NotFound />
        </>
      )}
    </div>
  );
}
