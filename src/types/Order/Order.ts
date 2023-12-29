import { User } from "../User/User";
import { OrderItem } from "./OrderItem";

export interface Order {
    id:string
    orderStatus: string;
    user: User;
    orderNumber:string;
    orderItems: OrderItem[];
  }