// /pages/api/webhook.js
import { buffer } from "micro";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const endpointSecret = process.env.STRIPE_SIGNIN_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function cancelSubscriptionAtPeriodEnd(subscriptionId) {
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
  // console.log(updatedSubscription);
}

const webhookHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        endpointSecret
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "invoice.payment_succeeded") {
      // NOTE : FACTURE SUBSCRIPTION
      const invoice = event.data.object;
      const invoiceUrl = invoice.hosted_invoice_url;
      const subId = invoice.subscription;
        const paymentIntent = invoice.payment_intent;
        if (paymentIntent != null) {
            // On vérifie avec Prisma combien il y a de subscribeId
            await prisma.invoices.create({
                data: {
                    invoiceUrl: invoiceUrl,
                    status: "paid",
                    paymentIntent: paymentIntent,
                    subscribeId: subId,
                    amount: invoice.amount_due / 100,
                },
            });
            const count = await prisma.invoices.count({
                where: {
                    subscribeId: subId,
                    paymentIntent: {
                        not: null
                    }
                },
            });
            if (count > 1) {
                // On recherche le customer via son subscribeId sur Prisma
                const customer = await prisma.order.findUnique({
                    where: {
                        stripePaymentIntent: subId,
                    },
                });
                // ON récupère stripeSubscriptionMonth avec Prisma
                const stripeSubscriptionMonth = customer.stripeSubscriptionMonth;
                if (count == stripeSubscriptionMonth) {
                    cancelSubscriptionAtPeriodEnd(subId);
                }
            }
        }
    }
      
   
      
     
      
    // if (event.type === "charge.succeeded") {
    //   // NOTE : FACTURE CLASSIQUE
    //   const charge = event.data.object;
    //   if (charge.description == null) {
    //     const chargeId = charge.payment_intent;
    //     //   console.log(chargeId);
    //     const invoiceUrl = charge.receipt_url;
    //     // On cherche la commande dans la base de données, table ORDER, avec le stripePaymentIntent
    //     await prisma.invoices.create({
    //       data: {
    //         invoiceUrl: invoiceUrl,
    //         status: "paid",
    //         paymentIntent: chargeId,
    //         amount: charge.amount / 100,
    //       },
    //     });
    //   }
    // }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhookHandler;
