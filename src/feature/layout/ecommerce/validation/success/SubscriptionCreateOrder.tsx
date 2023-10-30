import { cookies } from "next/headers";

export const SubscriptionCreateOrder = async (session: string) => {
  const cookieStore = cookies();

  const customerInfo = cookieStore.get("customerInfo");
  const cart = cookieStore.get("cart");
 
  // console.log(cart, session, customerInfo);
  const handleSub = async () => {
    const response = await fetch(
      `${process.env.NEXT_RELATIVE_URI}/api/stripe/retrieve-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: session,
          cart: cart?.value,
          customerInfo: customerInfo?.value,
        }),
      }
    );

    return await response.json();
  };
  return handleSub().then((result) => {
    console.log(result)
    if (result.status === "created") {
      return {
        type: "success",
        orderId: result.orderId,
        autoClose: 3000,
        value: "Votre paiement a bien été traité. Merci pour votre achat !",
      };
    } else if (result.status === "errAcc") {
      return {
        type: "warning",
        autoClose: 3000,
        value:"Votre paiement a bien été enregistré, toutefois un problème est survenu lors de la création de votre commande, veuillez nous contacter !"
      }
    } else if (result.status == "exist") {
      return {
        orderId: result.orderId,
      }
    } else {
      return {
        type: "error",
        autoClose: 3000,
        value:"Cette commande n'existe pas"
      }
    }
  });
};
