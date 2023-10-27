import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "@/src/feature/layout/ecommerce/utils.server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

// interface PaymentIntent {
//   amount: number;
//   id: string;
//   status: string;
// }

// interface PaymentIntentData {
//   paymentIntent: PaymentIntent;
//   // Ajoutez d'autres champs si nécessaire
// }

const retrieveCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");  // Gère les méthodes non prises en charge
    return;
  }

  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // createOrder()
    res.json(session);  // Envoyez la session comme réponse JSON
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    res.status(500).send("Internal Server Error");  // Gère les erreurs du serveur
  }
};

export default retrieveCheckoutSession;
