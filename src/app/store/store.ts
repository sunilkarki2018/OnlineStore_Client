import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../features/products/productReducer";
import cartReducer from "../../features/cart/cartReducer";

const store = configureStore({
  reducer: {
    product:productReducer,
    cart: cartReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
