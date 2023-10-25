import React, { useEffect } from "react";
import { Product as PrismaProduct } from "@prisma/client";
import { Product } from "./Product";
import { getSession } from "next-auth/react";


type FetchedProduct = Omit<PrismaProduct, 'price'> & {
  price: string;
};



type ProductsProps = {
  products: FetchedProduct[];
};


export const Products: React.FC<ProductsProps> = async ({ products }) => {
  
  
  return (
    <>
      
      <div className=" gap-x-5 gap-y-5  justify-center">
        {products
          .filter((product) => product.display)
          .map((product, index) => (
            <Product key={index}  product={product} products={products} />
          ))}
      </div>
    </>
  );
};
