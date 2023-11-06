"use client";
import React from "react";
import { BlogPost } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/pro-solid-svg-icons";
import { Tooltip } from "react-tooltip";

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
      {blogPost.content && blogPost.title ? (
        <>
          <div className="sticky top-[4.6rem] w-full z-10 bg-white">
            <div
              className="flex justify-center w-full border-b-[1px] py-2 -mt-8 mb-14"
              aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
                <li className="inline-flex items-center">
                  <Link href="/" className="flex flex-row gap-x-2 items-center">
                    Accueil
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCaretRight} className="mr-2" />
                    <Link href="/blog">Blog</Link>
                  </div>
                </li>
                <li aria-current="page" className="w-full">
                  <div className="flex w-full items-center">
                    <FontAwesomeIcon icon={faCaretRight} className="mr-1" />
                    <div
                      data-tooltip-id="ttTitle"
                      data-tooltip-content={blogPost.title}>
                      <span className="cursor-default ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                        {blogPost.title.length > 25
                          ? blogPost.title.slice(0, 25) + "..."
                          : blogPost.title}
                      </span>
                      <Tooltip place="bottom" id="ttTitle" className="tooltip" />
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
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
              className="mt-14"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </article>
        </>
      ) : (
        <div className="text-center">
          <h1>Aucun article</h1>
        </div>
      )}
    </>
  );
};
