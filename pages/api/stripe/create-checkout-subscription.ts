import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartProduct } from "@/lib/types/CartProduct";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { items } = req.body;

    

      const line_items = items.map((item: CartProduct) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [item.img],
            description:`${Math.round((item.price) / 3)}€ durant 3 mois — ${item.description} — Quantité : ${item.quantity}`,
          },
          unit_amount: Math.round((item.price * 100) / 3),
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      }));
    console.log(line_items)
      try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_RELATIVE_URI}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_RELATIVE_URI}/achat/validation`,
      });

        res.status(200).json({ sessionId: session.id });
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
