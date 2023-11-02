import { prisma } from "@/lib/prisma";
import { Prisma, Order, OrderItem, Product, Payment } from "@prisma/client";

interface CustomOrderItem extends OrderItem {
  product: Product;
}
interface OrderItems extends Order {
  items: CustomOrderItem[];
  payments: Payment[];
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

//  Récupérer tous les order d'un utilisateur via son ID :
export const getOrdersByUserId = async ({
  userId,
  sortBy = "desc",
  sort = "date",
}: {
  userId: string;
  sortBy?: string;
  sort?: string;
}): Promise<OrderItems[]> => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        [sort]: sortBy,
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
    return orders;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return [];
  }
};

export type OrderInfo = NonNullable<Prisma.PromiseReturnType<typeof getOrder>>;
export type OrdersInfo = NonNullable<
  Prisma.PromiseReturnType<typeof getOrdersByUserId>
>;
