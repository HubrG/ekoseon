import { ReadPost } from "@/src/feature/layout/blog/ReadPost";
import React from "react";
import { getBlogPost } from "@/src/query/blog.query";
import NotFound from "@/app/not-found";
import { BlogPost } from "@prisma/client";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";

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
  const blogPost = (await getBlogPost(params.id)) as ExtendedBlogPost;
  if (!blogPost) {
    throw new Error("Article de blog non trouvé");
  }
  const description = blogPost?.excerpt ? blogPost?.excerpt : "Aucun extrait";
  let descriptionSliced;
  // On réduit la taille de la description à 170 caractères maximum
  if (description && description.length > 170) {
    descriptionSliced = description.slice(0, 167) + "...";
  } else {
    descriptionSliced = description;
  }
  const title = blogPost?.title
    ? blogPost?.title + " | Blog "
    : "Aucun article";
  return {
    title: Meta("title", title),
    description: descriptionSliced,
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_RELATIVE_URI +
        "/blog/lecture/" +
        blogPost?.canonicalSlug +
        "/" +
        blogPost?.id,
    },
    openGraph: {
      title: Meta("title", title),
      description: descriptionSliced,
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
      publishedTime: blogPost?.publishedAt?.toISOString(),
      modifiedTime: blogPost?.updatedAt?.toISOString(),
      section: blogPost.category?.name || "Blog",
      tags:
        blogPost.tags?.map((t) => t.tag?.name).filter((name) => name != null) ||
        [],
      authors: ["Ekoseon"],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@ekoseon",
      images: [
        {
          url: blogPost?.image ? blogPost?.image : "/img/header-home.webp",
          width: 1200,
          height: 630,
          alt: blogPost?.title ? blogPost?.title : "Aucun titre",
        },
      ],
    },
  };
}

export default async function ReadBlogPost({
  params,
}: {
  params: { method: string; slug: string; id: string };
}) {
  const blogPost = await getBlogPost(params.id);
  if (!blogPost || !blogPost.published) {
    return (
      <div className="content">
        <NotFound />
      </div>
    );
  }
  // SCHEMA JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogPost.title,
    image: blogPost.image,
    author: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_APP_NAME,
      url: process.env.NEXT_PUBLIC_RELATIVE_URI,
    },
    url:process.env.NEXT_PUBLIC_RELATIVE_URI + "/blog/lecture/" + blogPost.canonicalSlug + "/" + blogPost.id,
    publisher: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_APP_NAME,
      logo: {
        "@type": "ImageObject",
        url: process.env.NEXT_PUBLIC_RELATIVE_URI + "/img/logo.png",
      },
    },
    datePublished: blogPost.publishedAt,
    dateModified: blogPost.updatedAt,
  };
  return (
    <div className="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ReadPost blogPost={blogPost} />
    </div>
  );
}
