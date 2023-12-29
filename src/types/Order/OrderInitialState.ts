import { Order } from "./Order";

export interface OrderInitialState {
    orders: Order[];
    error?:string | null;
    status:string;
    listLoading: boolean;
    singleLoading: boolean;
  }