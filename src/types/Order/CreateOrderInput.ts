import { OrderItem } from "./OrderItem";

export interface CreateOrderInput {
    //orderStatus?: string;
    orderItems: OrderItem[];
  }