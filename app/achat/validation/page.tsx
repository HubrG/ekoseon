import React from "react";
import { CheckoutForm } from "@/src/feature/ecommerce/validation/CheckoutForm";
import { getUserLog } from "@/src/query/user.query";


export default async function Achat() {
  
  const user = await getUserLog()
  return (
   
      <div className="content">
        <div className="flex flex-row gap-x-5">
          <div>
          </div>
          <div className="flex flex-col w-1/2">
            <CheckoutForm user={user}   />
          </div>
        </div>
      </div>
   
  );
}
