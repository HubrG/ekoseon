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
  } | null;
  tags?:
    | {
        id: string;
        name: string;
      }[]
    | null;
}
const BlogPostListView: React.FC<BlogPostListProps> = ({ blogPosts }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
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
                <MotionHover scale={1.02} type={"grow"}>
                  <Link
                    className="nunderline"
                    href={`/blog/lecture/${post.canonicalSlug}/${post.id}`}>
                    <div className="flex md:flex-row flex-col gap-5 rounded-lg  p-3 items-start cursor-pointer ">
                      <div className="md:w-1/3 w-full relative">
                        <div className="relative w-full h-24 mx-auto rounded-lg overflow-hidden">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title ? post.title : ""}
                              layout="fill"
                              objectFit="cover"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div>
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
                        </div>

                        <h2>{post.title}</h2>

                        <p>{post.excerpt ? post.excerpt : ""}</p>
                        <div className="flex flex-row gap-2">
                          {post.tags &&
                            post.tags.map((tag: any) => (
                              <span key={tag.tag.id} className="tag-label">
                                {tag.tag.name}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </Link>
                </MotionHover>
              </MotionShow>
            )}
          </>
        ))}
    </div>
  );
};

export default BlogPostListView;
