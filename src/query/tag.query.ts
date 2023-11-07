import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
