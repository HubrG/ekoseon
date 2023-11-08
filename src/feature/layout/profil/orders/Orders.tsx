"use client";
import React, { useState, useTransition } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Order, Payment, OrderItem, Product } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/pro-solid-svg-icons";
import { faSortDown, faSortUp } from "@fortawesome/pro-duotone-svg-icons";
import { OrdersItem } from "./OrderItem";
import { v4 } from "uuid";

interface ConvertedProduct extends Product {
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
  orders: ConvertedOrderItems[];
}

type SortKey = "orderRef" | "date" | "amount";

export const Orders: React.FC<OrdersProps> = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState<ConvertedOrderItems[]>(initialOrders);
  const [sortType, setSortType] = useState("date");
  const [sortDirections, setSortDirections] = useState<
    Record<SortKey, "asc" | "desc">
  >({
    orderRef: "asc",
    date: "desc",
    amount: "asc",
  });
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

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

  return (
    <div>
      <Accordion type="single" collapsible className="w-full relative">
        <div className="border-b border-b-app-200   px-2 grid sticky top-[4.5rem] z-10 bg-white py-5 grid-cols-3 text-center mb-5 md:text-base text-sm text-app-800 font-bold cursor-pointer select-none ">
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
        {orders.map((order) => (
          <OrdersItem
            key={order.id} // Utilise l'ID de la commande comme clé, et non v4(), pour éviter les re-rendus inutiles
            order={order}
            isSelected={selectedRow === `item-${order.id}`}
            onSelectRow={() =>
              setSelectedRow(
                selectedRow !== `item-${order.id}` ? `item-${order.id}` : null
              )
            }
          />
        ))}
      </Accordion>
    </div>
  );
};
