"use client";
import Image from "next/image";
import React from "react";

import { BlogPost } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MotionHover from "../effects/Hover";
import MotionShow from "../effects/Show";


interface BlogPostListProps {
  blogPosts: BlogPost[];
}
interface CustomBlogPost extends BlogPost {
  category?: {
    name: string;
  } | null;
}
const BlogPostListView: React.FC<BlogPostListProps> = ({ blogPosts }) => {
  const router = useRouter();

  const handleLink = (slug: string, id: string) => () => {
    router.push(`/blog/lecture/${slug}/${id}`);
  };

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
              <MotionShow animation="bounceIn"  key={post.id}>
              <MotionHover scale={1.02} type={"grow"} >
                <div className="flex md:flex-row flex-col gap-5 rounded-lg  p-3 items-start cursor-pointer " onClick={handleLink(post.canonicalSlug ? post.canonicalSlug : "", post.id)}>
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
                    <Link
                      prefetch={false}
                      className="nunderline"
                      href={`/blog/lecture/${post.canonicalSlug}/${post.id}`}>
                      <h2>{post.title}</h2>
                    </Link>
                    <p>{post.excerpt ? post.excerpt : ""}</p>
                  </div>
                </div>
                </MotionHover>
              </MotionShow>
            )}
          </>
        ))}
    </div>
  );
};

export default BlogPostListView;
