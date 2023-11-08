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
    return post;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export const getBlogCategory = async (slug?:string) => {

  const rawCategory = await prisma.blogCategory.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!rawCategory) return null;


  return rawCategory;
  };

export const getBlogCategories = async () => {
  const rawCategories = await prisma.blogCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });
  if (!rawCategories) return null;


  return rawCategories;
}
export const getTagsForPublishedPosts = async (slug?: string) => {
  const tags = await prisma.blogTag.findMany({
    where: {
      slug: slug,
      // Ici, vous accédez à la relation de jointure et utilisez la propriété 'post'
      // pour filtrer les tags associés aux posts publiés
      posts: {
        some: {
          post: {
            published: true,
          },
        },
      },
    },
    // Ici, vous pouvez sélectionner les champs spécifiques que vous voulez récupérer pour le tag
    // Par exemple, inclure les champs 'id' et 'name' du tag
    select: {
      id: true,
      name: true,
      slug: true,
      // Et tout autre champ que vous souhaiteriez sélectionner
    },
  });

  return tags;
};

export const getCategoriesForPublishedPosts = async (slug?: string) => {
  const posts = await prisma.blogCategory.findMany({
    where: {
      slug: slug,
      // Ici, vous accédez à la relation de jointure et utilisez la propriété 'post'
      // pour filtrer les tags associés aux posts publiés
      posts: {
        some: {
          published: true,
        },
      },
    },
    // Ici, vous pouvez sélectionner les champs spécifiques que vous voulez récupérer pour le tag
    // Par exemple, inclure les champs 'id' et 'name' du tag
    select: {
      id: true,
      name: true,
      slug: true,
      // Et tout autre champ que vous souhaiteriez sélectionner
    },
  });

  return posts;
};


export const getBlogTag = async (slug?:string) => {

  const rawSlug = await prisma.blogTag.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!rawSlug) return null;


  return rawSlug;
  };

  
    export type Tag = NonNullable<Prisma.PromiseReturnType<typeof getBlogTag>>;



export type TagPPost = NonNullable<Prisma.PromiseReturnType<typeof getTagsForPublishedPosts>>;
  
  export type BlogPosts = NonNullable<Prisma.PromiseReturnType<typeof getBlogPosts>>;
  export type TypeBlogPost = NonNullable<Prisma.PromiseReturnType<typeof getBlogPost>>;
