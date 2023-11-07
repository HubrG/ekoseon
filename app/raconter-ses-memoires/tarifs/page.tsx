import { Products } from "@/src/feature/layout/ecommerce/Products";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { getProducts } from "@/src/query/product.query";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: Meta("title", "Nos tarifs"),
  description: "Ekoseon",
};

export default async function Pricing() {
  const products = await getProducts();

  return (
    <PageTransition>
      <section className=" relative z-0  ">
        <div className="content max-w-xl">
          <h1 className="text-center">Notre seule raison d&apos;être</h1>
          <Suspense
            fallback={
              <div className="p-5  flex justify-center items-center flex-col gap-5 gap-y-0 mt-10 w-full">
                <h2 className="font-normal opacity-50 mb-2 text-base">
                  Chargement de notre offre biographique...
                </h2>
                <div
                  role="status"
                  className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-xl shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }>
            {products && <Products products={products} />}
          </Suspense>
        </div>
      </section>
    </PageTransition>
  );
}
