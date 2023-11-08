import Image from "next/image";
import React from "react";
import { BlogPost } from "@prisma/client";
import Link from "next/link";
import MotionHover from "../effects/Hover";
import MotionShow from "../effects/Show";

interface BlogPostListProps {
  blogPosts: BlogPost[];
}
interface CustomBlogPost extends BlogPost {
  category?: {
    name: string;
    slug: string;
  } | null;
  tags?:
    | {
        id: string;
        name: string;
        slug: string;
      }[]
    | null;
}
const BlogPostListView: React.FC<BlogPostListProps> = ({ blogPosts }) => {
  return (
    <div className="flex flex-col gap-10 w-full">
      {blogPosts
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((post: CustomBlogPost) => (
          <>
            {post.published && (
              
              <MotionShow animation="bounceIn" key={post.id}>
                <MotionHover scale={1.01} shadow={"0 25px 50px -12px var(--color-app3)"} type={"grow"}>
                  <div className="flex flex-col gap-5 rounded-lg p-4 items-start ">
                    <div className="flex w-full flex-row items-center justify-between">
                      <p>
                        <small>
                          Le{" "}
                          {post.publishedAt
                            ?.toLocaleString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .replace(",", " à")}
                        </small>
                      </p>
                      <Link href={`/blog/categorie/${post.category?.slug}`} className="text-sm">
                        {post.category?.name}
                      </Link>
                    </div>
                    <Link
                      className="nunderline flex flex-col gap-2 -mt-6"
                      href={`/blog/lecture/${post.canonicalSlug}/${post.id}`}>
                      <div className="w-full relative">
                        <div className="relative w-full h-32 mx-auto rounded-lg overflow-hidden">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title ? post.title : ""}
                              layout="fill"
                              objectFit="cover"
                              loading="lazy"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <h2 className="mt-2">{post.title}</h2>
                      <p className="-mt-2 font-normal">
                        {post.excerpt ? post.excerpt : ""}
                      </p>
                    </Link>
                    <div className="flex flex-row flex-wrap gap-2 text-sm -mt-5 italic opacity-80">
                      {post.tags &&
                        post.tags.map((tag: any) => (
                          <span key={tag.id} className="tag-label">
                            <Link
                              className="cursor-pointer"
                              href={`/blog/tag/${tag.tag.slug}`}>
                              {tag.tag.name}
                            </Link>
                          </span>
                        ))}
                    </div>
                  </div>
                  <div></div>
                </MotionHover>
              </MotionShow>
            )}
          </>
        ))}
    </div>
  );
};

export default BlogPostListView;
