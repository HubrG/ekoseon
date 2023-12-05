import PageTransition from "@/src/feature/layout/effects/PageTransition";
import BlogPostList from "@/src/feature/layout/blog/BlogPostList";
import React from "react";
import SideBar from "../../src/feature/layout/blog/SideBar";

import { Meta } from "@/src/feature/layout/metadata/Metadata";
import createMetadata from "@/lib/metadatas";
export const metadata = createMetadata({
  // Voir la configuration des métadonnées dans metadatas.ts
  // file://@/lib/metadatas
  title: Meta("title", "Blog"),
  url: `${process.env.NEXT_PUBLIC_RELATIVE_URI}/blog`,
});

export default async function faq() {
  return (
      <div className="content">
        <div className="flex md:flex-row flex-col items-start justify-between w-full gap-5">
          <div className="2/6">
            <h1>Blog</h1>
            <div className="flex md:flex-row flex-col gap-5">
              <div className="w-full">
                <BlogPostList />
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
