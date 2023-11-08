import {
  faReceipt,
  faSpinner,
  faEye,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order, OrderItem, Payment, Product } from "@prisma/client";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React, { startTransition, useState, useTransition } from "react";

interface ConvertedProduct extends Omit<Product, "price"> {
  price: number;
}

interface ConvertedOrderItem extends OrderItem {
  amount: number;
  product: ConvertedProduct;
}

interface ConvertedPayment extends Payment {
  amount: number;
}

interface ConvertedOrderItems extends Order {
  amount: number;
  items: ConvertedOrderItem[];
  payments: ConvertedPayment[];
}

interface OrdersProps {
  order: ConvertedOrderItems;
  isSelected: boolean;
  onSelectRow: () => void;
}

export const OrdersItem =  ({ order, onSelectRow, isSelected }: OrdersProps) => {
  const [isPending, startTransition] = useTransition();
  const [selectedRow, setSelectedRow] = useState<string>("");
  const handleFetch = async (
    event: React.MouseEvent,
    pi: { paymentIntent: string }
  ) => {
    // prevent default
    event.preventDefault();

    try {
      startTransition(async () => {
        const response = await fetch("/api/stripe/retrieve-pi-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: pi.paymentIntent,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        // On ouvre un nouvel onglet avec l'URL qui se trouve dans la réponse :
        window.open(data, "_blank");
      });
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  return (
    <AccordionItem
      value={`item-${order.id}`}
      key={order.id}
      className="accordionTrigger">
      <AccordionTrigger
        className={`w-full rounded-t-lg ${isSelected ? "selectedRow" : ""} px-2  grid grid-cols-3 text-base text-center py-3`}
        onClick={onSelectRow}>
        <div className="text-left font-medium">#{order.orderRef}</div>
        <span>
          Le{" "}
          {order.date
            ? new Date(order.date.toString()).toLocaleDateString("fr-FR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              }) +
              " à " +
              new Date(order.date.toString()).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : null}
        </span>
        <span>{order.amount / 100}€</span>
      </AccordionTrigger>
      <AccordionContent className="bg-app-50 border-t rounded-b-lg border-app-400 p-10 pt-3">
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-2">
            <div
              className={`p-2 rounded-lg grid ${
                order.addressBillingName ? " md:grid-cols-3" : " md:grid-cols-2"
              } grid-cols-1 gap-y-5 gap-x-4 w-full justify-between`}>
              <div>
                <h4 className="mb-0">Vous</h4>
                <p>
                  {order.firstName} {order.lastName}
                  <br />
                  {order.phone}
                </p>
              </div>
              <div>
                <h4 className="mb-0">Livraison</h4>
                <p>
                  {order.addressName}
                  <br />
                  {order.address}
                  <br />
                  {order.addressComp ? order.addressComp : null}
                </p>
              </div>
              {order.addressBillingName && (
                <>
                  <div>
                    <h4 className="mb-0">Facturation</h4>
                    <p>
                      {order.addressBillingName}
                      <br />
                      {order.addressBilling}
                      <br />
                      {order.addressBillingComp
                        ? order.addressBillingComp
                        : null}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-1 gap-5 px-2">
            <Separator />
            <div className="flex  flex-col gap-4 w-full md:justify-start justify-center ">
              <h4 className="mb-0 -mt-4">
                Produit{order.items.length > 1 ? "s" : null}
              </h4>
              <div className="flex md:flex-wrap flex-nowrap md:flex-row flex-col gap-4 w-full md:justify-start justify-center">
                {/* On boucle les orderItem */}
                {order.items.map((orderIt: any) => (
                  <div
                    key={orderIt.id}
                    className={`rounded-lg p-5 shadow-sm shadow-app-300 bg-app-100 w-1/${order.items.length}`}>
                    <div className="rounded-full h-14 w-14 mx-auto mb-2">
                      <Image
                        className="object-cover rounded-full "
                        src={orderIt.product.imageUrl}
                        alt={orderIt.title}
                        width="60"
                        height="60"
                      />
                    </div>
                    <div>
                      <h5 className="mb-0 font-semibold text-center text-lg">
                        {orderIt.title}
                      </h5>
                      <p className="text-center flex flex-col text-sm">
                        <span>Quantité : {orderIt.quantity}</span>
                        <span>Montant total : {orderIt.amount / 100}€</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="mb-0 -mt-5">
                Facture{order.payments.length > 1 ? "s" : null}
              </h4>
              {order.monthly && (
                <p className="italic">
                  Vous avez opté pour un paiement en {order.monthly} mensualités
                </p>
              )}
              <div className="pt-3">
                {order.payments.map((invoiceIt: Payment) => (
                  <div
                    key={invoiceIt.id}
                    onClick={(event) => handleFetch(event, invoiceIt)}
                    className="p-2 cursor-pointer rounded-lg flex md:flex-row flex-col mb-2 justify-between hover:bg-app-200">
                    <div className="flex flex-row items-center gap-x-3">
                      <FontAwesomeIcon icon={faReceipt} />
                      <span className="font-bold text-base">
                        {Number(invoiceIt.amount) / 100}€
                      </span>
                    </div>
                    <div>
                      <span>
                        Réglée le{" "}
                        {invoiceIt.date
                          ? new Date(
                              invoiceIt.date.toString()
                            ).toLocaleDateString("fr-FR", {
                              year: "2-digit",
                              month: "2-digit",
                              day: "2-digit",
                            }) +
                            " à " +
                            new Date(
                              invoiceIt.date.toString()
                            ).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                          : null}
                      </span>
                    </div>
                    <div
                      className={`flex flex-row hover:no-underline items-center gap-x-2 cursor-pointer font-semibold ${
                        isPending ? "opacity-50" : null
                      }`}>
                      {isPending ? (
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                      <span>voir la facture</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
