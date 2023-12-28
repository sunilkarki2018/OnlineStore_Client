import { Product } from "../Product/Product";

export interface OrderItem {
    price: number;
    quantity: number;
    orderId: string;
    productId: string; 
    product: Product;
  }