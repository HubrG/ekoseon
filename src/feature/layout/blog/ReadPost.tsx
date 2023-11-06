"use client";
import React from "react";
import { BlogPost } from "@prisma/client";
import Image from "next/image";
import Head from "next/head";

interface ExtendedBlogPost extends BlogPost {
  category?: {
    id: string;
    name: string;
  };
  tags?: Array<{
    tagId: string;
    postId: string;
  }>;
}
interface BlogPostProps {
  blogPost: ExtendedBlogPost;
}

export const ReadPost: React.FC<BlogPostProps> = ({ blogPost }) => {
  return (
    <>
      {blogPost.content ?(
      <article>
        <h1 className="text-center">{blogPost.title}</h1>
        {blogPost.image && (
          <div className="h-[35vh] w-full relative object-cover">
            <Image
              src={blogPost.image}
              fill={true}
              alt={blogPost.title ?? "Aucun"}
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div
          className="mt-10"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
        </article>
      ) : (
        <div className="text-center"><h1>Aucun article</h1></div>
      )}
    </>
  );
};
