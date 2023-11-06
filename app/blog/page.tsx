import PageTransition from "@/src/feature/layout/effects/PageTransition";
import BlogPostList from '@/src/feature/layout/blog/BlogPostList';
import React from "react"
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Blog"),
  description: "Ekoseon",
};
export default async function faq() {

  return (
    <PageTransition>
      <div className="content">
        <h1>Blog</h1>
        <div className="flex md:flex-row flex-col gap-5">
        <div className="md:w-4/6 w-full">
          <BlogPostList  />
          </div>
        <div  className="md:w-2/6 w-full md:border-l-[1px] md:pl-4">
          Coucou
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
