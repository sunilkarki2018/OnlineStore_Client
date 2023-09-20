import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: number;
  quantity: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Add a product to the cart
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      // Remove a product from the cart
    },
    updateCartItemQuantity: (state, action: PayloadAction<CartItem>) => {
      // Update the quantity of a product in the cart
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
