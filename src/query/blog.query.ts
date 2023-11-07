import { prisma } from "@/lib/prisma";
import { BlogPost, Prisma } from "@prisma/client";



export const getBlogPosts = async () => {
  const blogPosts = await prisma.blogPost.findMany({
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  return blogPosts;
};

export const getBlogPostsByTagSlug = async (slug: string) => {
  const posts = await prisma.blogPost.findMany({
    where: {
      tags: {
        some: {
          tag: {
            slug: slug,
          },
        },
      },
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  return posts;
};

export const getBlogPostsByCategorySlug = async (slug: string) => {
  const posts = await prisma.blogPost.findMany({
    where: {
      category: {
        slug: slug,
      },
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  return posts;
};


export const getBlogPost = async (id?: string): Promise<BlogPost | null> => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        id: id,
      },
      include: {
        category:
        {
          select: {
            name: true,
            slug: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
  return null;
}

   

  
  export type BlogPosts = NonNullable<Prisma.PromiseReturnType<typeof getBlogPosts>>;
  export type TypeBlogPost = NonNullable<Prisma.PromiseReturnType<typeof getBlogPost>>;
