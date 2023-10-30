"use client";
import CustomerInfoForm from "@/src/feature/layout/ecommerce/validation/CustomerInfoForm";
import React, { useEffect, useRef, useState, Suspense } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CartProduct } from "@/lib/types/CartProduct";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import Cookies from "js-cookie";
import Skeleton from "@/src/feature/layout/skeleton/Content";
import { Toastify } from "@/src/feature/layout/toastify/Toastify";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockKeyhole } from "@fortawesome/pro-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";
import { createOrder } from "@/src/feature/layout/ecommerce/utils.server";
//
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("STRIPE_PUBLIC_KEY is missing in environment variables.");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
//

type CartData = {
  items?: CartProduct[];
};
type CalculateInstallmentsParams = {
  total: number;
};
//
//
export function CheckoutForm() {
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
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  //
  const [isPending, startTransition] = useTransition();
  const isTransitionActive = useRef(true); // Par défaut, la transition est active

  const [cartData, setCartData] = useState<CartData>();
  const [areFieldsValid, setAreFieldsValid] = useState(false);

  // States Check
  const [isCGVChecked, setIsCGVChecked] = useState<boolean>(false); // Adresse de livraison

  // Variable d'option
  const isDelivery = true; // NOTE Cet objet a-t-il besoin d'une livraison ?
  const activeMonthly = true; // NOTE Activation du paiement en plusieurs fois
  const minMonthly = 300; // NOTE Minimum d'activation du paiement en plusieurs fois
  const maxMonthlyPayment = 4; // NOTE Maximum de mensualités
  const trancheAmount = 150; // NOTE Montant de la tranche pour le paiement en plusieurs fois
  const calculateInstallments = ({ total }: CalculateInstallmentsParams) => {
    if (total < minMonthly) {
      return 0; // ou null, selon ce que vous préférez pour indiquer qu'aucun paiement échelonné n'est possible
    }
    // Calcule le nombre de mensualités en se basant sur la tranche
    let numberOfInstallments = Math.floor(total / trancheAmount);
    // S'assure que le nombre de mensualités est au moins 2
    return Math.min(maxMonthlyPayment, Math.max(2, numberOfInstallments));
  };
  //

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

  const cancelPending = () => {
    isTransitionActive.current = false; // Marquez la transition comme inactive
  };

  const isCookieSet = () => {
    const storedCustomerInfo: string | undefined = Cookies.get("customerInfo");
    if (!storedCustomerInfo) {
      cancelPending();
      Toastify({
        type: "error",
        value:
          "Une erreur est survenue, veuillez à nouveau renseigner les information",
      });
      return;
    }
  };

  const handleCheckboxCGVChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isChecked = e.currentTarget.getAttribute("aria-checked") === "true";
    setIsCGVChecked(!isChecked);
  };

  const handleSubscription = async ({ months }: { months: number }) => {
    if (!stripe || !elements) {
      cancelPending();
      Toastify({ type: "error", value: "Une erreur est survenue" });
      return;
    }

    isTransitionActive.current = true;

    isCookieSet();

    const customerInfo = Cookies.get("customerInfo");
    if (!customerInfo) {
      throw new Error("Le cookie 'customerInfo' n'est pas défini.");
    }

    startTransition(async () => {
      const response = await fetch("/api/stripe/create-checkout-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          months: months,
          customerInfo: customerInfo,
        }),
      });

      const { sessionId } = await response.json();

      stripe?.redirectToCheckout({ sessionId });
      cancelPending();
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    isTransitionActive.current = true;

    isCookieSet();
    const customerInfo = Cookies.get("customerInfo");
    if (!customerInfo) {
      throw new Error("Le cookie 'customerInfo' n'est pas défini.");
    }
    startTransition(async () => {
      if (!stripe || !elements) {
        Toastify({ type: "error", value: "Une erreur est survenue" });
        return;
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        Toastify({ type: "error", value: "Une erreur est survenue" });
        cancelPending();
        return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
      });

      if (error) {
        Toastify({ type: "error", value: error.message });
        cancelPending();
        return;
      }
      // Créer un PaymentIntent
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          customerInfo: customerInfo,
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
        Toastify({
          type: "error",
          value: "Erreur de paiement. Veuillez nous contacter !",
        });
        cancelPending();
        return;
      }

      Toastify({
        type: "success",
        value: "Votre paiement a bien été traité. Merci pour votre achat !",
      });

      if (!customerInfo) {
        throw new Error("Cookie 'customerInfo' n'est pas trouvé.");
      }
      const cartData = Cookies.get("cart");
      if (!cartData) {
        // Gérer l'erreur, par exemple :
        throw new Error("Données 'cartData' ne sont pas trouvées.");
      }
      const orderResult = await createOrder(
        JSON.parse(customerInfo),
        JSON.parse(cartData),
        confirmPayment
      );
      if (!orderResult) {
        Toastify({
          type: "warning",
          autoClose: false,
          value:
            "Votre paiement a bien été enregistré, toutefois un problème est survenu lors de la création de votre commande, veuillez nous contacter !",
        });
       return router.push("/achat/validation/error/commande-reglee-mais-non-creee");
      }
      router.push("/achat/validation/succes/commande/" + orderResult);
    });
  };

  const THEME_STYLE = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="bg-app-100/50 text-center rounded-xl mb-10 pb-0 rounded-b-none shadow shadow-app-200">
            <CardTitle>
              <div className="flex flex-row justify-between items-center">
                <div>Paiement</div>
                <div className="flex flex-row items-center gap-x-5 justify-center">
                  <FontAwesomeIcon icon={faCcVisa} />
                  <FontAwesomeIcon icon={faCcAmex} />
                  <FontAwesomeIcon icon={faCcMastercard} />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerInfoForm
              setValidity={setAreFieldsValid}
              isDelivery={isDelivery}
            />
            <div className="grid w-full  items-center gap-3  md:mt-4 mt-5">
              <div className="separatorWithText">
                <div>
                  <span />
                </div>
                <div>
                  <span>
                    <span   
                    data-tooltip-id="dataSecure"
                    data-tooltip-content={`Paiement sécurisé`}>
                    <FontAwesomeIcon
                      icon={faLockKeyhole}
                      className="mx-2"
                    
                    />
                    <Tooltip id="dataSecure" />
                    </span>
                    Paiement
                  </span>
                </div>
              </div>
              <Suspense fallback={<Skeleton />}>
                <div className="flex flex-col gap-y-5">
                  <div className="flex flex-col gap-y-5 justify-between mt-5 p-5 bg-app-50 rounded-lg border border-app-200">
                    <div className="w-full grid  items-center gap-1.5">
                      <Label>Numéro de carte *</Label>
                      <CardNumberElement options={THEME_STYLE} />
                    </div>
                    <div className="flex md:flex-row flex-col gap-y-5 items-center justify-between gap-x-2">
                      <div className="md:w-6/12 w-full grid  items-center gap-1.5">
                        <Label>Date d&apos;expiration *</Label>
                        <CardExpiryElement id="cardExp" options={THEME_STYLE} />
                      </div>
                      <div className="md:w-6/12 w-full grid  items-center gap-1.5">
                        <Label>Code CCV *</Label>
                        <CardCvcElement options={THEME_STYLE} />
                      </div>
                    </div>
                  </div>
                </div>
              </Suspense>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableCGV"
                  checked={isCGVChecked}
                  onClick={(e) => {
                    handleCheckboxCGVChange(e);
                  }}
                />
                <label htmlFor="enableCGV">
                  J&apos;ai lu et j&apos;accepte les CGV *
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between -mt-5">
            <Suspense fallback={<Skeleton />}>
              <div
                className={`grid ${
                  activeMonthly
                    ? "md:grid-cols-2 grid-cols-1 gap-y-3"
                    : "grid-cols-1"
                } w-full gap-x-5 mt-5 items-center`}>
                <div
                  className="w-full"
                  data-tooltip-id="tooltipPay"
                  data-tooltip-content={`Certains champs obligatoires ne sont pas renseignés, ou des erreurs ont été détectées !`}>
                  <Button
                    type="submit"
                    className={`${
                      isPending && isTransitionActive.current
                        ? "disabled opacity-50 cursor-default"
                        : null
                    }`}
                    disabled={!areFieldsValid || !isCGVChecked || !stripe}>
                    {isPending && isTransitionActive.current ? (
                      <Loader className="mr-2 h-4 w-4" />
                    ) : null}{" "}
                    Régler {calculatedTotal}€
                  </Button>
                  {!areFieldsValid && (
                    <>
                      <Tooltip id="tooltipPay" className="tooltip" />
                    </>
                  )}
                </div>
                {activeMonthly && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className="w-full"
                          data-tooltip-id="tooltipMonthly"
                          data-tooltip-content={`Le paiement en plusieurs fois n'est activé qu'à partir de ${minMonthly}€`}>
                          <Button
                            type="button"
                            variant="outline"
                            disabled={
                              !areFieldsValid ||
                              !stripe ||
                              !isCGVChecked ||
                              calculatedTotal < minMonthly
                            }>
                            Par mensualités
                          </Button>
                          {calculatedTotal < minMonthly && (
                            <>
                              <Tooltip
                                id="tooltipMonthly"
                                className="tooltip"
                              />
                            </>
                          )}
                        </div>
                      </DropdownMenuTrigger>
                      {areFieldsValid && calculatedTotal >= minMonthly && (
                        <DropdownMenuContent className="flex flex-col">
                          {Array.from({
                            length: calculateInstallments({
                              total: calculatedTotal,
                            }),
                          }).map((_, index) => (
                            <DropdownMenuItem asChild key={index}>
                              <>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  className="w-auto"
                                  onClick={() =>
                                    handleSubscription({ months: index + 2 })
                                  }
                                  disabled={
                                    !areFieldsValid ||
                                    !stripe ||
                                    !isCGVChecked ||
                                    calculatedTotal < minMonthly
                                  }>
                                  {isPending && isTransitionActive.current ? (
                                    <Loader className="mr-2 h-4 w-4" />
                                  ) : null}{" "}
                                  {index + 2} mensualités (
                                  {(calculatedTotal / (index + 2)).toFixed(2)}
                                  €/mois)
                                </Button>
                              </>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                  </>
                )}
              </div>
            </Suspense>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
