"use client";

import React, { useState, useTransition } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Order, OrderItem, Payment, Product } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faEye,
  faSort,
  faReceipt,
} from "@fortawesome/pro-solid-svg-icons";
import { faSortDown, faSortUp } from "@fortawesome/pro-duotone-svg-icons";
import Image from "next/image";

interface CustomOrderItem extends OrderItem {
  product: Product;
}

interface ConvertedProduct extends Omit<Product, 'price'> {
  price: number;
}

interface ConvertedOrderItem extends Omit<OrderItem, 'amount'> {
  amount: number;
  product: ConvertedProduct;
}

interface ConvertedPayment extends Omit<Payment, 'amount'> {
  amount: number;
}

interface ConvertedOrderItems extends Omit<Order, 'amount'> {
  amount: number;
  items: ConvertedOrderItem[];
  payments: ConvertedPayment[];
}



interface OrdersProps {
  orders: ConvertedOrderItems[];
}

type SortKey = "orderRef" | "date" | "amount";

export const Orders: React.FC<OrdersProps> = ({ orders: initialOrders }) => {
 
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [orders, setOrders] = useState<ConvertedOrderItems[]>(initialOrders);
  const [sortType, setSortType] = useState("date");
  const [sortDirections, setSortDirections] = useState<
    Record<SortKey, "asc" | "desc">
  >({
    orderRef: "asc",
    date: "desc",
    amount: "asc",
  });
  const handleSort = (sortBy: SortKey) => {
    const newSortDirection = sortDirections[sortBy] === "asc" ? "desc" : "asc";
    setSortDirections({
      ...sortDirections,
      [sortBy]: newSortDirection,
    });
    setSortType(sortBy);

    const sortedOrders = [...orders].sort((a, b) => {
      if (sortBy === "date") {
        return newSortDirection === "asc"
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime();
      }
      if (sortBy === "amount") {
        return newSortDirection === "asc"
          ? Number(a.amount) - Number(b.amount)
          : Number(b.amount) - Number(a.amount);
      }
      if (sortBy === "orderRef") {
        return newSortDirection === "asc"
          ? (a.orderRef || "").localeCompare(b.orderRef || "")
          : (b.orderRef || "").localeCompare(a.orderRef || "");
      }
      return 0;
    });
    setOrders(sortedOrders);
  };

  const handleFetch = async (
    event: React.MouseEvent,
    pi: { paymentIntent: string }
  ) => {
    // prevent default
    event.preventDefault();

    try {
      startTransition(async () => {
        // Remplacez l'URL et les options de requête selon vos besoins
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
    <div>
      <Accordion type="single"  collapsible className="w-full relative">
        <div className="shadow-sm  px-2 grid sticky top-[4.5rem] z-10 bg-white py-5 rounded-lg grid-cols-3 text-center mb-5 md:text-base text-sm text-app-800 font-bold cursor-pointer select-none ">
          <div
            className="text-left flex flex-row gap-x-2 items-center"
            onClick={() => handleSort("orderRef")}>
            Référence{" "}
            {sortType === "orderRef" ? (
              sortDirections.orderRef === "asc" ? (
                <FontAwesomeIcon size="xs" icon={faSortUp} />
              ) : (
                <FontAwesomeIcon size="xs" icon={faSortDown} />
              )
            ) : (
              <FontAwesomeIcon size="xs" icon={faSort} className="opacity-25" />
            )}
          </div>
          <div
            className=" flex flex-row  justify-center gap-x-2 items-center"
            onClick={() => handleSort("date")}>
            Date{" "}
            {sortType === "date" ? (
              sortDirections.date === "asc" ? (
                <FontAwesomeIcon size="xs" icon={faSortUp} />
              ) : (
                <FontAwesomeIcon size="xs" icon={faSortDown} />
              )
            ) : (
              <FontAwesomeIcon size="xs" icon={faSort} className="opacity-25" />
            )}
          </div>
          <div
            className=" flex flex-row justify-center gap-x-2 items-center"
            onClick={() => handleSort("amount")}>
            Montant total{" "}
            {sortType === "amount" ? (
              sortDirections.amount === "asc" ? (
                <FontAwesomeIcon size="xs" icon={faSortUp} />
              ) : (
                <FontAwesomeIcon size="xs" icon={faSortDown} />
              )
            ) : (
              <FontAwesomeIcon size="xs" icon={faSort} className="opacity-25" />
            )}
          </div>
        </div>
        {orders.map((order: any) => (
          <AccordionItem
            value={`item-${order.id}`}
            key={order.id}
            className="accordionTrigger">
            <AccordionTrigger
              className={` rounded-t-lg ${
                selectedRow === `item-${order.id}` ? "selectedRow" : null
              } px-2 grid grid-cols-3 text-center`}
              onClick={() => {
                selectedRow !== `item-${order.id}`
                  ? setSelectedRow(`item-${order.id}`)
                  : setSelectedRow("");
              }}>
              <div className="text-left">#{order.orderRef}</div>
              <span>
                Le {order.date
                  ? new Date(order.date.toString()).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    ) +
                    " à " +
                    new Date(order.date.toString()).toLocaleTimeString(
                      "fr-FR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )
                  : null}
              </span>
              <span>{order.amount / 100}€</span>
            </AccordionTrigger>
            <AccordionContent className="bg-app-50 border-t rounded-b-lg border-app-400 p-10 pt-3">
              <div className="flex flex-col">
                <div className="flex flex-row gap-x-2">
                  <div
                    className={`p-2 rounded-lg grid ${
                      order.addressBillingName
                        ? " md:grid-cols-3"
                        : " md:grid-cols-2"
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
                              <span>
                                Montant total : {orderIt.amount / 100}€
                              </span>
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
                        Vous avez opté pour un paiement en {order.monthly}{" "}
                        mensualités
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
        ))}
      </Accordion>
    </div>
  );
};
