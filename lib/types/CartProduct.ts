export interface CartProduct {
  id: string;
  name: string;
  price: number | string | any;
  quantity: number;
  img?: string;
  description?: string;
  products?: CartProduct[]; // Si vous n'en avez pas besoin, vous pouvez l'omettre
  items?: CartItem[];
  display?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number | string | any;
  quantity: number;
  img?: string;
  description?: string;
  products?: CartProduct[]; // Si vous n'en avez pas besoin, vous pouvez l'omettre
  display?: boolean;
}
