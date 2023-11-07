import { getBlogPosts, getBlogPostsByTagSlug, getBlogPostsByCategorySlug } from "@/src/query/blog.query";
import React from "react";
import BlogPostListView from "./BlogPostListView";
type Props = {
  tagName?: string;
  categoryName?: string;
};
export default async function BlogPostList({ tagName, categoryName }: Props) {
  let blogPosts = [];
  if (tagName) {
    blogPosts = await getBlogPostsByTagSlug(tagName);
  } else if (categoryName) {
    blogPosts = await getBlogPostsByCategorySlug(categoryName);
  } else {
    blogPosts = await getBlogPosts();
  }
  return (
    <div>
      <BlogPostListView blogPosts={blogPosts} />
    </div>
  );
}
