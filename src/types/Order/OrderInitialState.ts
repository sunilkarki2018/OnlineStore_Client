import { Order } from "./Order";

export interface OrderInitialState {
    orders: Order[];
    order?:Order;
    error?:string | null;
    status:string;
    listLoading: boolean;
    singleLoading: boolean;
  }