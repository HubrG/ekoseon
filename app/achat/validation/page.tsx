import React from "react";
import { CheckoutForm } from "@/src/feature/layout/ecommerce/validation/CheckoutForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered } from "@fortawesome/pro-duotone-svg-icons";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import { LottieDisplayOnSSR } from "@/src/feature/layout/lottie/LottieDisplayOnSSR";

export const metadata: Metadata = {
  title: Meta("title", "Votre panier"),
  description: "Ekoseon",
};

export default function Achat() {
  return (
    <>
      <div className="content min-w-fit">
        <h1 className="text-center mb-10">
          C&apos;est bientôt fini !
        </h1>
        <div className="flex md:flex-row flex-col gap-x-5 gap-y-10">
          <div className="w-6/12 md:order-1 order-2">f</div>
          <div className="flex flex-col w-full  md:order-2 order-1">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </>
  );
}
