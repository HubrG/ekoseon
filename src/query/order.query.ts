import { prisma } from "@/lib/prisma";
import { Prisma, Order, OrderItem, Product, Payment } from "@prisma/client";

interface CustomOrderItem extends OrderItem {
  product: Product;
}
interface OrderItems extends Order {
  items: CustomOrderItem[];
  payments: Payment[];
}

interface ConvertedProduct extends Omit<Product, 'price'> {
  price: number;
}

interface ConvertedOrderItem extends Omit<OrderItem, 'amount'> {
  amount: number;
  product: ConvertedProduct;
}

interface ConvertedPayment extends Omit<Payment, 'amount'> {
  amount: number;
}

interface ConvertedOrderItems extends Omit<Order, 'amount'> {
  amount: number;
  items: ConvertedOrderItem[];
  payments: ConvertedPayment[];
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
}): Promise<ConvertedOrderItems[]> => {
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
     // Convert Decimal to String or Number
     const convertedOrders = orders.map(order => ({
      ...order,
      amount: Number(order.amount),  // convert Decimal to String
      payments: order.payments.map(payment => ({
        ...payment,
        amount: Number(payment.amount),  // convert Decimal to String
      })),
      items: order.items.map(item => ({
        ...item,
        amount: Number(item.amount),  // convert Decimal to String
        product: {
          ...item.product,
          price: Number(item.product.price),  // convert Decimal to String
        },
      })),
     }));
  
    return convertedOrders;

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return [];
  }
};

export type OrderInfo = NonNullable<Prisma.PromiseReturnType<typeof getOrder>>;
export type OrdersInfo = NonNullable<
  Prisma.PromiseReturnType<typeof getOrdersByUserId>
>;
