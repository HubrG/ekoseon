export interface CartProduct {
  id: string;
  name: string;
  price: number | string | any;
  quantity: number;
  products?: CartProduct[];
  img?: string;
  description?:string;
}
