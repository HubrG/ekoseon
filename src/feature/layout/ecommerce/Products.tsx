"use client";
import React, { useEffect, Suspense, useState } from "react";
import { Product as PrismaProduct } from "@prisma/client";
import { Product } from "./Product";
import { fetchProducts } from "./utils.server";
import Skeleton from "@/src/feature/layout/skeleton/Content";

type FetchedProduct = Omit<PrismaProduct, "price"> & {
  price: string;
};

export const Products = () => {
  const [products, setProducts] = useState<FetchedProduct[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const rawProducts = await fetchProducts();
      const formattedProducts = rawProducts.map((product) => ({
        ...product,
        price: product.price.toString(),
      }));
      setProducts(formattedProducts);
    }

    loadProducts();
  }, []);

  return (
    <div className="gap-x-5 gap-y-5 justify-center">
      {products
        .filter((product) => product.display)
        .map((product) => (
          <Product key={product.id} product={product} products={products} />
        ))}
    </div>
  );
};
