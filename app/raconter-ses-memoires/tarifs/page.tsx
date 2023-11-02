import { Products } from "@/src/feature/layout/ecommerce/Products";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import Skeleton from '@/src/feature/layout/skeleton/Content';
import { Suspense } from 'react';

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
           <Suspense fallback={<Skeleton />}>
            <Products />
            </Suspense>
        </div>
      </section>
    </PageTransition>
  );
}
