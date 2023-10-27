"use client";
import React, { useEffect, useState } from "react";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import Cookies from "js-cookie";
import { Toastify } from "@/src/feature/layout/toastify/Toastify";

export default function Success({ params }: { params: { session: string } }) {
  const [isLoad, setIsLoad] = useState(false);
  const customerInfo = Cookies.get("customerInfo");
  const cart = Cookies.get("cart");

  useEffect(() => {
    if (isLoad === true) {
      const handleSub = async () => {
        const response = await fetch(`/api/stripe/retrieve-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: params.session,
            cart: cart,
            customerInfo: customerInfo,
          }),
        });
        return await response.json();
      };
      handleSub().then((result) => {
        if (!result) {
          Toastify({
            type: "success",
            autoClose: 3000,
            value: "Votre paiement a bien été traité. Merci pour votre achat !",
          });
        } else if (result == "errAcc") {
          Toastify({
            type: "warning",
            autoClose: false,
            value:
              "Votre paiement a bien été enregistré, toutefois un problème est survenu lors de la création de votre commande, veuillez nous contacter !",
          });
        } else if (result == "exist") {
          return;
        } else {
          Toastify({
            type: "error",
            autoClose: false,
            value: "Cette commande n'existe pas",
          });
        }
      });
    }
    setIsLoad(true);
  }, [isLoad, cart, customerInfo, params]);

  // Ajouté des dépendances pertinentes

  return (
    <PageTransition>
      <div className="content">cgv</div>
    </PageTransition>
  );
}
