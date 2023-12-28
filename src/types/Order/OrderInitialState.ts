import { Order } from "./Order";

export interface OrderInitialState {
    orderStatus: string;
    orders: Order[];
    error?:string | null;
    status:string;
  }