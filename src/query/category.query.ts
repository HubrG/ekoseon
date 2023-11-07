import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCategory = async (slug?:string) => {

  const rawCategory = await prisma.blogCategory.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!rawCategory) return null;


  return rawCategory;
  };

  
    export type Category = NonNullable<Prisma.PromiseReturnType<typeof getCategory>>;
