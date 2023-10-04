import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartItem";

interface CartState {
  cartItems: CartItem[];
  error: string | null;
  loading: boolean;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      let findIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );
      if (findIndex >= 0) {
        state.cartItems[findIndex].quantity += newItem.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ itemId: number; quantityToRemove: number }>
    ) => {
      const { itemId, quantityToRemove } = action.payload;
      const itemToRemove = state.cartItems.find((item) => item.id === itemId);
      if (itemToRemove) {
        itemToRemove.quantity -= quantityToRemove;
        if (itemToRemove.quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== itemId
          );
        }
      }
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },
    updateCartItemQuantity: (state, action: PayloadAction<CartItem>) => {
      // Update the quantity of a product in the cart
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
