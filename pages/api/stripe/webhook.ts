// /pages/api/webhook.js
import { prisma } from "@/lib/prisma";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

interface Invoice {
  // ... autres propriétés
  subscription: string;
  payment_intent: string;
}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const endpointSecret = process.env.STRIPE_SIGNIN_SECRET;
if (!endpointSecret) {
  throw new Error("STRIPE_SIGNIN_SECRET is not defined.");
}
export const config = {
  api: {
    bodyParser: false,
  },
};

async function cancelSubscriptionAtPeriodEnd(subscriptionId: any) {
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    if (typeof sig !== "string") {
      res.status(400).send("Invalid Stripe signature format");
      return;
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        endpointSecret
      );
    } catch (err) {
      if (err instanceof Error) {
          res.status(400).send(`Webhook Error: ${err.message}`);
      } else {
          res.status(400).send(`Webhook Error: An unknown error occurred`);
      }
      return;
    }
    
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (event.type === "invoice.payment_succeeded") {
      // NOTE : PAYMENT INTENT SUBSCRIPTION
      const invoice = event.data.object as Invoice;
      const subId = invoice.subscription;
      const paymentIntent = invoice.payment_intent;
      // 
          await delay(10000);
  
      // On recherche l'ID de la commande
      const orderId = await prisma.order.findFirst({
        where: {
          isSub: subId,
        },
      });
      // Si elle existe...
      if (paymentIntent) {
          await prisma.payment.create({
            data: {
              status: "paid",
              paymentIntent: paymentIntent,
              orderId: orderId?.id,
              amount: 100,
            },
          });
          // On vérifie avec Prisma combien il y a de subscribeId
          // const count = await prisma.invoices.count({
          //   where: {
          //     subscribeId: subId,
          //     paymentIntent: {
          //       not: null,
          //     },
          //   },
          // });
          // if (count > 1) {
          //   // On recherche le customer via son subscribeId sur Prisma
          //   const customer = await prisma.order.findUnique({
          //     where: {
          //       stripePaymentIntent: subId,
          //     },
          //   });
          //   // ON récupère stripeSubscriptionMonth avec Prisma
          //   const stripeSubscriptionMonth = customer.stripeSubscriptionMonth;
          //   if (count == stripeSubscriptionMonth) {
          //     cancelSubscriptionAtPeriodEnd(subId);
          //   }
          // }
        
      }
    }

  

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhookHandler;
