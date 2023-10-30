import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "@/src/feature/layout/ecommerce/utils.server";
import { prisma } from "@/lib/prisma";
import { getOrder } from "@/src/query/order.query";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});


const retrieveCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");  // Gère les méthodes non prises en charge
    return;
  }

  const { sessionId, customerInfo, cart } = req.body;
try {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  try {
    // On vérifie que Prisma n'a pas déjà enregistré l'order
    const isOrderExist = await prisma.order.findFirst({
      where: {
        isSub: session.subscription?.toString(),
      },
    });
    let orderId;
    if (!isOrderExist) {
      const subscriptionNumber = session.metadata?.monthly ? Number(session.metadata?.monthly) : undefined;
      let amountTotal = 0
      if (subscriptionNumber && session.amount_total) {
        amountTotal = (session.amount_total * subscriptionNumber) || 0;
      }
      const corder = await createOrder(JSON.parse(customerInfo), JSON.parse(cart), undefined, session.subscription?.toString(), subscriptionNumber, amountTotal)
      res.json({status:"created", orderId:corder});
    } 
    // L'order a déjà été créé
    res.json({status:"exist", orderId:isOrderExist?.id});
  } catch (error) {
    // Erreur lors de la création du compte
    res.json({ status: "errAcc" })
  }
} catch (error) {
  // La commande n'existe pas
  res.status(500).json({ error: "Internal Server Error", message: error });
}


};

export default retrieveCheckoutSession;
