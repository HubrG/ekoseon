"use server";
import { getOrder } from '@/src/query/order.query'
import { getProducts } from "@/src/query/product.query";
import { getUser } from "@/src/query/user.query";
import bcrypt from "bcrypt";
import { getUserLog } from "@/src/query/user.query";
import { CustomerCookie } from "@/lib/types/CustomerCookie";
import { CartProduct, CartItem } from "@/lib/types/CartProduct";
import { prisma } from "@/lib/prisma";

interface PaymentIntent {
  amount: number;
  id: string;
  status: string;
}
interface PaymentIntentData {
  paymentIntent: PaymentIntent;
  // Ajoutez d'autres champs si nécessaire
}

export const fetchProducts = async () => {
  return await getProducts();
};

export const isEmailExists = async (email: string) => {
  const user = await getUser(email);
  if (user) {
    // Vous pouvez retourner des données ou un booléen ici si nécessaire.
    return true;
  } else {
    return false;
  }
};

export const hashPassword = async (password: string) => {
  const hp = await bcrypt.hash(password, 10);
  return hp;
};

export const isUserLog = async () => {
  return await getUserLog();
};

function generateOrderRef() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export const createOrder = async (
  customerData: CustomerCookie,
  cartData: CartProduct,
  paymentIntentData?: PaymentIntentData,
  isSub?: string,
  monthly?: number,
  amountTotSub?:number
) => {

  //  On vérifie l'existence de l'utilisateur
  const user = await prisma.user.findUnique({
    where: {
      email: customerData.email,
    },
  });
  try {
    // Si l'utilisateur n'existe pas, on le créé
    let userId; // pour stocker l'ID de l'utilisateur
    // Si l'utilisateur n'existe pas, on le créé
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email: customerData.email,
          name: `${customerData.firstname} ${customerData.name}`,
          hashedPassword: customerData.hashedPassword,
        },
      });
      userId = newUser.id; // on extrait l'ID du nouvel utilisateur
    } else {
      userId = user.id; // sinon, on utilise l'ID de l'utilisateur existant
    }
    // On créé l'order
    let orderId: string;
    const newOrder = await prisma.order.create({
      data: {
        userId: userId,
        date: new Date(),
        orderRef:generateOrderRef(),
        firstName: customerData.firstname,
        lastName: customerData.name,
        addressName: customerData.deliveryName,
        addressBillingName: customerData.billingName,
        address: customerData.address,
        addressComp: customerData?.addressComp,
        phone: customerData.phone,
        addressBilling: customerData?.addressBilling,
        addressBillingComp: customerData?.addressBillingComp,
        amount: paymentIntentData
          ? paymentIntentData.paymentIntent.amount
          : amountTotSub,
        monthly: monthly ? monthly : null,
        isSub: isSub? isSub : null
      },
    });
    orderId = newOrder.id;
    // On créé les items
    const itemsToInsert =
      cartData.items?.map((item) => ({
        orderId: orderId,
        productId: item.id,
        quantity: item.quantity,
        title: item.name,
        amount: Number(item.price*100),
      })) || [];

    if (itemsToInsert.length > 0) {
      await prisma.orderItem.createMany({
        data: itemsToInsert,
      });
    }
    // On créé la première facture s'il ne s'agit pas d'une souscription
    if (!isSub) {
      const newBilling = await prisma.payment.create({
        data: {
          orderId: orderId,
          paymentIntent: paymentIntentData?.paymentIntent.id
            ? paymentIntentData.paymentIntent.id
            : "",
          status: paymentIntentData?.paymentIntent.status
            ? paymentIntentData.paymentIntent.status
            : "",
          amount: paymentIntentData
            ? paymentIntentData.paymentIntent.amount
            : 0,
        },
      });
    }
    return orderId;

  } catch (error) {
    console.error("Erreur", error);
    return false;
  }

};

export const getOrderInfo = async (id:string) => {
  const order = await getOrder(id)
  return order;
};