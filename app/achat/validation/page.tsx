"use client;"
import React from "react";
import { CheckoutForm } from "@/src/feature/layout/ecommerce/validation/CheckoutForm";

export default function Achat() {
  return (
    <>

      <div className="content">
        <div className="flex flex-row gap-x-5">
          <div>
          </div>
          <div className="flex flex-col w-2/3">
            <CheckoutForm   />
          </div>
        </div>
      </div>
        
   </>
  );
}
