import { User } from "../User/User";
import { OrderItem } from "./OrderItem";

export interface Order {
    Id:string
    orderStatus: string;
    user: User;
    orderNumber:string;
    orderItems: OrderItem[];
  }