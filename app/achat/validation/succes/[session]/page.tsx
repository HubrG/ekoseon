import React from 'react'
import { retrieveCheckoutSession } from '@/src/feature/layout/ecommerce/stripe/utils.server'
import PageTransition from '@/src/feature/layout/effects/PageTransition';

export default async function page({ params }: { params: { session: string } }) {
  
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';  // Utilisez votre propre logique pour définir l'URL de base
  
 // Créer un PaymentIntent
 const response = await fetch(`${baseUrl}/api/stripe/retrieve-checkout-session`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sessionId: params.session,
  }),
});

const responseData = await response.json(); // Convertir la réponse en JSON
console.log(responseData);
  
  return (
    <PageTransition>
    <div className="content">cgv</div>
  </PageTransition>  )
}
