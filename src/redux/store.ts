import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";

const store = configureStore({
  reducer: {
     productReducer,
    //cart: cartReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

export default store;
