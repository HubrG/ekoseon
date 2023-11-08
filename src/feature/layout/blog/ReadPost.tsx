import React, { Suspense } from "react";
import { BlogPost } from "@prisma/client";
import Image from "next/image";
import { BlogBreadCrumb } from "./Breadcrumb";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderBookmark, faTags } from "@fortawesome/pro-solid-svg-icons";

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
interface BlogPostProps {
  blogPost: ExtendedBlogPost;
}

export const ReadPost: React.FC<BlogPostProps> = ({ blogPost }) => {
  console.log(blogPost.tags)
  return (
    <>
      {blogPost.content && blogPost.title ? (
        <>
          <Suspense fallback={<p className="text-center">...</p>}>
            <BlogBreadCrumb title={blogPost.title} />
          </Suspense>
          <article>
            <h1 className="text-center">{blogPost.title}</h1>
            {blogPost.image && (
              <div className="h-[35vh] w-full relative object-cover">
                <Image
                  src={blogPost.image}
                  alt={blogPost.title ?? "Aucun"}
                  fill
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 576px"
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <div
              className="mt-14"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
            <div className="flex flex-col gap-5  my-10">
            {blogPost.category && (
              <div className="inline-flex gap-3 items-center flex-wrap ">
                <FontAwesomeIcon icon={faFolderBookmark} className="text-2xl" />
                <Link href={`/blog/tag/${blogPost.category.slug}`}>
                  {blogPost.category.name}
                </Link>
              </div>
            )}
            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className="inline-flex gap-3 items-center flex-wrap ">
                <FontAwesomeIcon icon={faTags} className="text-2xl" />
                {blogPost.tags.map((tag) => (
                  <Link href={`/blog/tag/${tag.tag.slug}`} key={tag.tag.id}>
                    {tag.tag.name}
                  </Link>
                ))}
              </div>
            )}
            </div>
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
