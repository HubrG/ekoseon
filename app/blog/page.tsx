import PageTransition from "@/src/feature/layout/effects/PageTransition";
import BlogPostList from "@/src/feature/layout/blog/BlogPostList";
import React from "react";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import SideBar from "../../src/feature/layout/blog/SideBar";
export const metadata: Metadata = {
  title: Meta("title", "Blog"),
  description: "Ekoseon",
};
export default async function faq() {
  return (
    <PageTransition>
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
    </PageTransition>
  );
}
