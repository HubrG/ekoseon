import { getBlogPosts } from '@/src/query/blog.query'
import React from 'react'
import BlogPostListView from './BlogPostListView'

export default async function BlogPostList() {
    const blogPosts = await getBlogPosts()
  return (
    <div><BlogPostListView blogPosts={blogPosts} /></div>
  )
}
