import PageTransition from "@/src/feature/layout/effects/PageTransition";
import BlogPostList from "@/src/feature/layout/blog/BlogPostList";
import React from "react";
import { getBlogTag } from "@/src/query/blog.query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/pro-solid-svg-icons";
import Link from "next/link";
import SideBar from "@/src/feature/layout/blog/SideBar";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Blog"),
};

export default async function BlogPostsByTag({
  params,
}: {
  params: { method: string; slug: string; id: string };
}) {


  const tag = await getBlogTag(params.slug);

  return (
      <div className="content">
        <div className="flex md:flex-row flex-col items-start justify-between w-full gap-5">
          <div className="2/6">
            <h1 className="flex flex-col justify-left gap-1 items-start">
              <Link href="/blog">Blog</Link>
              {tag?.name &&
                <small className="flex flex-row items-baseline mt-1">
                  <div className="flex flex-row text-lg  items-baseline pt-1">
                    <FontAwesomeIcon icon={faTag} className="mx-2 force-lg" />{" "}
                    {tag.name}
                  </div>
                </small>
              }
            </h1>
            <div className="flex md:flex-row flex-col gap-5">
              <div className="w-full">
              {tag?.slug &&
                <BlogPostList tagSlug={tag?.slug} />
              }
              </div>
            </div>
          </div>
          <div className="md:sticky relative md:top-24 md:w-4/6 w-full h-full">
            <SideBar />
          </div>
        </div>
      </div>
  );
}
