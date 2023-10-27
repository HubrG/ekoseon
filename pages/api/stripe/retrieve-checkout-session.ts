import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "@/src/feature/layout/ecommerce/utils.server";
import { prisma } from "@/lib/prisma";

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
    // 
    if (!isOrderExist) {
      const subscriptionNumber = session.metadata?.monthly ? Number(session.metadata?.monthly) : undefined;
      let amountTotal = 0
      if (subscriptionNumber && session.amount_total) {
        amountTotal = (session.amount_total * subscriptionNumber)/100 || 0;
      }
      const corder = await createOrder(JSON.parse(customerInfo), JSON.parse(cart), undefined, session.subscription?.toString(), subscriptionNumber, amountTotal)
      return res.json(null)
    } 
    // L'order a déjà été créé
    return res.json("exist");
  } catch (error) {
    // Erreur lors de la création du compte
    res.json("errAcc")
  }
} catch (error) {
  // La commande n'existe pas
  res.status(500).json({ error: "Internal Server Error", message: error });
}


};

export default retrieveCheckoutSession;
