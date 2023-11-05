import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getBlogPosts = async () => {

  const blogPosts = await prisma.blogPost.findMany({
    include: {
      category: true,
      tags: true,
    },
  });

  return blogPosts;
  };

  
    export type BlogPosts = NonNullable<Prisma.PromiseReturnType<typeof getBlogPosts>>;
