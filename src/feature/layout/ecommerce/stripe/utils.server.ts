"use server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});


interface PaymentIntent {
  amount: number;
  id: string;
  status:string
}
interface PaymentIntentData {
  paymentIntent: PaymentIntent;
  // Ajoutez d'autres champs si nécessaire
}


export const retrieveCheckoutSession = async (sessionId: string) => {

  // console.log(sessionId);
  // return;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId.toString());

    return session;
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    return error;
  }
}



