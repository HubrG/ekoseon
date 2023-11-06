import { prisma } from "@/lib/prisma";
import { BlogPost, Prisma } from "@prisma/client";



export const getBlogPosts = async () => {

  const blogPosts = await prisma.blogPost.findMany({
    include: {
      category: true,
      tags: true,
    },
  });

  return blogPosts;
  };

  export const getBlogPost = async (id?: string): Promise<BlogPost | null> => {
    try {
      const post = await prisma.blogPost.findUnique({
        where: {
          id: id,
        },
        include: {
          category: true,
          tags: true,
        },
      });
    
      if (!post) return null;
    
      // Assurez-vous que les champs category et tags ne sont pas null ici,
      // sinon vous devrez ajuster le type ExtendedBlogPost pour qu'il accepte null.
      return post;
    } catch (error) {
      console.error("Erreur lors de la récupération du post : ", error);
      return null;
    }
  };
  

  
  export type BlogPosts = NonNullable<Prisma.PromiseReturnType<typeof getBlogPosts>>;
  export type TypeBlogPost = NonNullable<Prisma.PromiseReturnType<typeof getBlogPost>>;
