"use client;"
import React from "react";
import { CheckoutForm } from "@/src/feature/layout/ecommerce/validation/CheckoutForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered } from "@fortawesome/pro-duotone-svg-icons";

export default function Achat() {
  return (
    <>

      <div className="content min-w-fit">
        <h1 className="text-center mb-10"><FontAwesomeIcon icon={faFlagCheckered} /> C&apos;est bientôt fini !</h1>
        <div className="flex md:flex-row flex-col gap-x-5 gap-y-10">
          <div className="w-6/12 md:order-1 order-2">
            f
          </div>
          <div className="flex flex-col w-full  md:order-2 order-1">
            <CheckoutForm   />
          </div>
        </div>
      </div>
        
   </>
  );
}
