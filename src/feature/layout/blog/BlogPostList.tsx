import { getBlogPosts, getBlogPostsByTagSlug, getBlogPostsByCategorySlug } from "@/src/query/blog.query";
import React from "react";
import BlogPostListView from "./BlogPostListView";
type Props = {
  tagSlug?: string;
  categorySlug?: string;
};
export default async function BlogPostList({ tagSlug, categorySlug }: Props) {

  let blogPosts = [];
  if (tagSlug) {
    blogPosts = await getBlogPostsByTagSlug(tagSlug);
  } else if (categorySlug) {
    blogPosts = await getBlogPostsByCategorySlug(categorySlug);
  } else {
    blogPosts = await getBlogPosts();
  }
  return (
    <div>
      <BlogPostListView blogPosts={blogPosts} />
    </div>
  );
}
