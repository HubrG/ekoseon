import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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

export const getTag = async (slug?:string) => {

  const rawSlug = await prisma.blogTag.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!rawSlug) return null;


  return rawSlug;
  };

  
    export type Tag = NonNullable<Prisma.PromiseReturnType<typeof getTag>>;



export type TagPPost = NonNullable<Prisma.PromiseReturnType<typeof getTagsForPublishedPosts>>;
