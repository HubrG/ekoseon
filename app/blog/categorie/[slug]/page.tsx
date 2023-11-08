import PageTransition from "@/src/feature/layout/effects/PageTransition";
import BlogPostList from "@/src/feature/layout/blog/BlogPostList";
import React from "react";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderBookmark,
} from "@fortawesome/pro-solid-svg-icons";
import Link from "next/link";
import { getBlogCategory } from "@/src/query/blog.query";
import SideBar from "@/src/feature/layout/blog/SideBar";
export const metadata: Metadata = {
  title: Meta("title", "Blog"),
  description: "Ekoseon",
};
export default async function BlogPostsByCategory({
  params,
}: {
  params: { method: string; slug: string; id: string };
}) {
  const category = await getBlogCategory(params.slug);
  

  return (
    <PageTransition>
      <div className="content">
        <div className="flex md:flex-row flex-col items-start justify-between w-full gap-5">
          <div className="2/6">
            {" "}
            <h1 className="flex flex-col justify-left gap-1 items-start">
              <Link href="/blog">Blog</Link>
              {category?.name &&
                <small className="flex flex-row items-baseline mt-1">
                <div className="flex flex-row text-lg  items-baseline pt-1">
                  <FontAwesomeIcon icon={faFolderBookmark} className="mx-2 force-lg" />{" "}
                {category.name}
                </div>
              </small>
            }
            </h1>
            <div className="flex md:flex-row flex-col gap-5">
              <div className="w-full">
                {category?.slug &&
                  <BlogPostList categorySlug={category?.slug} />
                }
              </div>
            </div>
          </div>
          <div className="md:sticky relative md:top-24 md:w-4/6 w-full h-full">
            <SideBar />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
