import React from "react";
import { CheckoutForm } from "@/src/feature/layout/ecommerce/validation/CheckoutForm";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: Meta("title", "Votre panier"),
};

export default function Achat() {
  return (
    <>
      <div className="content min-w-fit">
       
        <div className="flex md:flex-row flex-col gap-x-5 gap-y-10">
          <div className="md:w-6/12 w-full"> <h1 className="text-center mb-10">
          C&apos;est bientôt fini !
        </h1></div>
          <div className=" md:w-6/12 flex flex-col w-full  md:order-2 order-1">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </>
  );
}
