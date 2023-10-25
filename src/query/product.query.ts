import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getProduct = async (id?:string) => {

  const rawProduct = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!rawProduct) return null;

  const product = {
    ...rawProduct,
    price: rawProduct.price.toString() // Convertit le champ price en chaîne
  };

  return product;
  };

  export const getProducts = async (categoryId?:string) => {

    const rawProducts = await prisma.product.findMany({
      where: {
        categoryId: categoryId
      },
    });

    const products = rawProducts?.map(product => ({
      ...product,
      price: product.price.toString() // Convertit le champ price en chaîne
    }));

    return products;
    };
  
    export type Product = NonNullable<Prisma.PromiseReturnType<typeof getProduct>>;
    export type Products = NonNullable<Prisma.PromiseReturnType<typeof getProducts>>;
