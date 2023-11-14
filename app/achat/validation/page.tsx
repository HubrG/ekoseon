import React from "react";
import { CheckoutForm } from "@/src/feature/layout/ecommerce/validation/CheckoutForm";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import { Basket } from "@/src/feature/layout/ecommerce/validation/Basket";

export const metadata: Metadata = {
  title: Meta("title", "Votre panier"),
};

export default function Achat() {
  return (
    <>
      <div className="content">
        <h1 className="title-page  mb-0 flex w-full md:justify-start justify-center md:mt-0 mt-0">
          C&apos;est bientôt fini !
        </h1>
        <div className="flex md:flex-row flex-col gap-x-5 gap-y-10">
          <div className="md:w-6/12 w-full">
            <Basket />
          </div>
          <div className=" md:w-6/12 flex flex-col w-full  md:order-2 order-1">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </>
  );
}
