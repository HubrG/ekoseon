import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getProduct = async (id?:string) => {

  const rawProduct = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!rawProduct) return null;


  return rawProduct;
  };

  export const getProducts = async (categoryId?:string) => {

    const rawProducts = await prisma.product.findMany({
      where: {
        categoryId: categoryId
      },
    });

    if (!rawProducts) return null;

    return rawProducts;
    };
  
    export type Product = NonNullable<Prisma.PromiseReturnType<typeof getProduct>>;
    export type Products = NonNullable<Prisma.PromiseReturnType<typeof getProducts>>;
