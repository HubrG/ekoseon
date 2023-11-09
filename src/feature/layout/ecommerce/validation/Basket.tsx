"use client";
import React from "react";
import Cookies from "js-cookie";
import { CartItem, CartProduct } from "@/lib/types/CartProduct";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export const Basket = () => {
  const router = useRouter();
  let cart = Cookies.get("cart");

  let cartItems: CartItem[] = [];

  if (cart) {
    try {
      const parsed = JSON.parse(cart);
      if (parsed.items && Array.isArray(parsed.items)) {
        cartItems = parsed.items;
      }
    } catch (e) {
      console.error("Erreur lors de la conversion du panier en JSON:", e);
    }
  }

  if (cartItems.length === 0) {
    return <div>Votre panier est vide</div>;
  }
  function formatQuantityToTime(quantity: number) {
    const hours = Math.floor(quantity);
    const minutes = (quantity - hours) * 60;
    return `${hours}h${minutes < 10 ? "0" : ""}${minutes}`;
  }
  const calculatedTotal = cartItems?.reduce(
    (total: number, item: CartProduct) => {
      return total + parseFloat(item.price.toString());
    },
    0
  );
  const handleUpdateBasket = () => {
    router.push("/raconter-ses-memoires/tarifs");
  };

  return (
    
    <div className="w-full p-5 rounded-xl border border-app-300 shadow items-start flex flex-col gap-y-5 mt-1">
      
      {cartItems.map((product) => (
        <div
          key={product.id}
          className="flex flex-row justify-between   w-full gap-x-4">
          <div className="flex flex-row  gap-x-4">
            {product.img && (
              <div className="md:min-w-[3.75rem] min-w-[3rem] rounded-full">
                <Image
                  src={product.img}
                  width={60}
                  height={60}
                  alt={product.name}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
            <div className="font-semibold">{product.name}</div>
            <div className="font-semibold md:block hidden"><p className="text-sm italic font-normal">{product.description}</p></div>
              <div className="text-sm md:font-bold font-normal">{product.price}€</div>
            </div>
          </div>
          <div>
            {product.name === "Entretien audio"
              ? formatQuantityToTime(product.quantity)
              : product.quantity}
          </div>
        </div>
      ))}
       <Button
        onClick={handleUpdateBasket}
        variant={"outline"}
        className="w-full">
        Modifier mon panier
      </Button>
      <Separator className="my-1" />
     
      <div className="w-full font-bold flex flex-row items-center justify-between">
        <span>Total :</span>
        <span>{calculatedTotal}€</span>
      </div>
    </div>
  );
};
