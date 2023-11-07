import { Product as PrismaProduct } from "@prisma/client";
import { Product } from "./Product";

interface ProductsProps {
  products: PrismaProduct[]; // tableau de produits
}

export const Products: React.FC<ProductsProps> = ({ products }) => {

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
