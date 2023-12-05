import { Products } from "@/src/feature/layout/ecommerce/Products";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { getProducts } from "@/src/query/product.query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: Meta("title", "Nos tarifs"),
  description: "Ekoseon",
};

export default async function Pricing() {
  const products = await getProducts();

  return (
      <section className=" relative z-0  ">
        <div className="content max-w-xl">
          <h1 className="text-center">Notre seule raison d&apos;être</h1>
            {products && <Products products={products} />}
        </div>
      </section>
  );
}
