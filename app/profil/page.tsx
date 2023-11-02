import React from "react";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import { Profil } from "@/src/feature/layout/profil/Profil";
import { getAuthSession } from "@/lib/auth";
import { getOrdersByUserId } from "@/src/query/order.query";
import { redirect } from 'next/navigation'


export const metadata: Metadata = {
  title: Meta("title", "Vos commandes"),
  description: "Ekoseon",
};

export default async function Profile() {

  let orders;
  const session = await getAuthSession();
  if (session?.user.id) {
    orders = await getOrdersByUserId({ userId: session.user.id });
  } else {
    return redirect("/connexion")
  }

  return (
    <>
      <div className="content">
        <h1>Mes commandes</h1>
        <Profil orders={orders} />
      </div>
    </>
  );
}
