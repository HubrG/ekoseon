"use client";
import CustomerInfoForm from "@/src/feature/layout/ecommerce/validation/CustomerInfoForm";
import React, { useEffect, useState, Suspense } from "react"; // Assurez-vous d'importer React pour les types
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartProduct } from "@/lib/types/CartProduct";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@prisma/client";
import Cookies from "js-cookie";
import Skeleton from "@/src/feature/layout/skeleton/Content";

//
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("STRIPE_PUBLIC_KEY is missing in environment variables.");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
//
type CheckoutFormProps = {
  user?: User | undefined;
};
type CartData = {
  items?: CartProduct[];
};

//
//
export function CheckoutForm({ ...props }: CheckoutFormProps) {
  return (
    <>
      <Elements stripe={stripePromise}>
        <InnerCheckoutForm />
      </Elements>
    </>
  );
}
//
//
export function InnerCheckoutForm() {
  const [isPending, startTransition] = useTransition();
  const [cartData, setCartData] = useState<CartData>();
  const [areFieldsValid, setAreFieldsValid] = useState(false);
  

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    setCartData(JSON.parse(Cookies.get("cart") || "{}"));
  }, []);

  const cartItems = cartData?.items || [];
  const calculatedTotal = cartItems?.reduce(
    (total: number, item: CartProduct) => {
      return total + parseFloat(item.price.toString());
    },
    0
  );

  const handleSubscription = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Erreur: CardElement n'a pas été trouvé!");
      return;
    }

    const response = await fetch("/api/stripe/create-checkout-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
      }),
    });

    const { sessionId } = await response.json();

    stripe?.redirectToCheckout({ sessionId });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        console.error("Erreur: CardElement n'a pas été trouvé!");
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error(error);
        return;
      }

      // Appelez votre backend pour créer un PaymentIntent
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems, // Vos articles du panier ici
        }),
      });

      const paymentIntentData = await response.json();
      const confirmPayment = await stripe.confirmCardPayment(
        paymentIntentData.clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmPayment.error) {
        console.error(confirmPayment.error);
        return;
      }
      // Ici, le paiement a été confirmé !
      router.push("/");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="bg-app-100/50 text-center rounded-xl mb-10 rounded-b-none shadow shadow-app-200">
            <CardTitle>Paiement</CardTitle>
            <CardDescription>
              Vous avez la possibilité de payer en plusieurs fois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerInfoForm setValidity={setAreFieldsValid} />
            <div className="grid w-full  items-center gap-3">
              <div className=" relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-app-500" />
                </div>
                <div className="relative flex justify-center  text-xs ">
                  <span className="bg-app-50 font-bold text-base text-app-900 dark:text-app-500 dark:bg-slate-900 px-2">
                    Informations de paiement
                  </span>
                </div>
              </div>

              <Suspense fallback={<Skeleton />}>
                <CardElement id="paymentInfo" />
              </Suspense>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Suspense fallback={<Skeleton />}>
              <div className="grid grid-cols-2 w-full gap-x-5 mt-5 items-center">
                <Button
                  type="submit"
                  className={`${
                    isPending ? "disabled opacity-50 cursor-default" : null
                  }`}
                  disabled={!areFieldsValid || !stripe}>
                  {isPending ? <Loader className="mr-2 h-4 w-4" /> : null}{" "}
                  Régler {calculatedTotal}€
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSubscription}
                  disabled={!areFieldsValid || !stripe}>
                  Ou par mensualités
                </Button>
              </div>
            </Suspense>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
