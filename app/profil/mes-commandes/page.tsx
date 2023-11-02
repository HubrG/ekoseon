import React, { Suspense } from "react";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import { Orders } from "@/src/feature/layout/profil/orders/Orders";
import { getAuthSession } from "@/lib/auth";
import { getOrdersByUserId } from "@/src/query/order.query";
import { Card } from "@/components/ui/card";
import LoginPage from "@/src/feature/layout/auth/AuthForm";
import { Skeleton } from "@/components/ui/skeleton";

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
    orders = null;
  }

  

  
  return (
    <>
      {session ? (
        <>
          <div className="content">
            <h1>Mes commandes</h1>
            {orders ? (
              <Orders orders={orders} />
            ) : (
              <p className="text-center">Vous n&aposavez pas encore de commandes</p>
            )}
          </div>{" "}
          :
        </>
      ) : (
        <div className="content max-w-lg">
          <h1 className="text-center">Veuillez vous connecter</h1>
          <Card>
            <Suspense fallback={<Skeleton />}>
              <LoginPage />
            </Suspense>
          </Card>
        </div>
      )}
    </>
  );
}
