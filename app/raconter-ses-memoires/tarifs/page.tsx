import { Products } from "@/src/feature/ecommerce/Products";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { getProduct, getProducts } from "@/src/query/product.query";

export default async function pricing() {
  const rawProducts = await getProducts();
  // On converti le "price" (Decimal) en String
  const products = rawProducts.map(product => ({
    ...product,
    price: product.price.toString()
  }));

  return (
    <PageTransition>
      <section className=" relative z-0  ">
        <div className="content max-w-xl">
          <Products products={products} />
        </div>
      </section>
    </PageTransition>
  );
}
