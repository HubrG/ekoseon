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
        <div className="flex flex-row gap-5">
        <div className="w-5/6">
          <BlogPostList  />
          </div>
        <div  className="w-1/6">
          Coucou
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
