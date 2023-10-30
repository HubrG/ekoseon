import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartProduct } from "@/lib/types/CartProduct";
import { createOrder } from "@/src/feature/layout/ecommerce/utils.server";
import { hashPassword } from '../../../src/feature/layout/ecommerce/utils.server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { items, months, customerInfo } = req.body;
    const customer = JSON.parse(customerInfo);
  
    const line_items = items.map((item: CartProduct) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: [item.img],
          description: `${Math.round(
            item.price / months
          )}€ durant ${months} mois — ${item.description} — Quantité : ${
            item.quantity
          }`,
        },
        unit_amount: Math.round((item.price * 100) / months),
        recurring: {
          interval: "month",
          interval_count: 1,
        },
      },
      quantity: 1,
    }));

    try {
      const sessionIntent = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_RELATIVE_URI}/achat/validation/succes/sub/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_RELATIVE_URI}/achat/validation`,
        metadata: {
          firstName: customer?.firstname,
          lastName: customer?.name,
          email: customer?.email,
          phone: customer?.phone,
          address: customer?.address,
          addressComp: customer?.addressComp,
          addressBilling: customer?.addressBilling,
          addressBillingComp: customer?.addresseBillingComp,
          monthly: months,
          hashedPassword: customer?.hashedPassword,
        },
      });

      res.status(200).json({ sessionId: sessionIntent.id});
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

export default createCheckoutSession;
