import { CartItem } from "./CartItem";

export interface CartInitialState {
    cartItems: CartItem[];
    error: string | null;
    loading: boolean;
  }