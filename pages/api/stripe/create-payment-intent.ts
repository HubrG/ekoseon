// app/api/stripe/create-payment-intent.ts

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartProduct } from "@/lib/types/CartProduct";
import { CustomerCookie } from "@/lib/types/CustomerCookie";
import { parse } from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

const createPaymentIntent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { items, customerInfo } = req.body;
    const customer = JSON.parse(customerInfo);

    // Convertissez les articles en une chaîne représentant les noms des articles achetés
    const itemsDescription = items
    .map((item: CartProduct) => `[${item.name} x ${item.quantity} = ${item.price}]`)
    .join('\n');
  

    // Calculez le montant total à partir des articles du panier
    // const totalAmount = items.reduce((total: number, item: CartProduct) => {
    //   return total + parseFloat(item.price) * item.quantity;
    // }, 0);
    // DÉCOMMENTER SI NOUVELLE APP
   
    const totalAmount = items.reduce((total: number, item: CartProduct) => {
      return total + parseFloat(item.price); 
    }, 0);
    
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: "eur",
        payment_method_types: ["card"],
        description: itemsDescription, 
        metadata: {
          firstName: customer?.firstname,
          lastName: customer?.name,
          email: customer?.email,
          phone: customer?.phone,
          addressName: customer?.deliveryName,
          address: customer?.address,
          addressComp: customer?.addressComp,
          billingName: customer?.billingName,
          addressBilling: customer?.addressBilling,
          addressBillingComp: customer?.addresseBillingComp,
        },
        receipt_email: customer?.email
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ statusCode: 500, message: error.message });
      } else {
        res
          .status(500)
          .json({ statusCode: 500, message: "An unknown error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default createPaymentIntent;
