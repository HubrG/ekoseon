import { Products } from "@/src/feature/layout/ecommerce/Products";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import Head from "next/head";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Nos tarifs"),
  description: "Ekoseon",
};

export default function pricing() {

  return (
    <PageTransition>
      <section className=" relative z-0  ">
        <div className="content max-w-xl">
          <h1 className="text-center">Notre seule raison d&apos;être</h1>
            <Products  />
        </div>
      </section>
    </PageTransition>
  );
}
