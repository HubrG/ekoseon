import { prisma } from "@/lib/prisma";
import { Prisma, Order } from "@prisma/client";
interface ModifiedOrder extends Omit<Order, 'amount'> {
  amount: string;
}
export const getOrder = async (id?: string): Promise<Order | null> => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        items: {
            include: {
                product: true,
            },
        },
        payments: true,
    },
    });
   
    return order;
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande:", error);
    return null;
  }
};


export type OrderInfo = NonNullable<Prisma.PromiseReturnType<typeof getOrder>>;
