import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "@/src/feature/layout/ecommerce/utils.server";
import { prisma } from "@/lib/prisma";
import { getOrder } from "@/src/query/order.query";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});


const retrievePiInfo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");  // Gère les méthodes non prises en charge
  }
    
  const { paymentIntentId } = req.body;
    // console.log(req.body)
try {
  
   // Récupérez les informations de la Payment Intent
   const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId?.toString()!);
    const receipt = await stripe.charges.retrieve(paymentIntent?.latest_charge?.toString()!);

    // Renvoyez les données récupérées en tant que réponse JSON
  
   res.status(200).json(receipt.receipt_url);
} catch (error) {
  // La commande n'existe pas
  return res.status(500).json({ error: "Internal Server Error", message: error });
}


};

export default retrievePiInfo;
