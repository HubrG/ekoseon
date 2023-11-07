import React, { Suspense } from "react";
import { BlogPost } from "@prisma/client";
import Image from "next/image";
import { BlogBreadCrumb } from "./Breadcrumb";

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
