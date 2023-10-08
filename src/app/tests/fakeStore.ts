//let store = createStore();

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/reducers/productReducer";
import userReducer from "../redux/reducers/userReducer";
import cartReducer from "../redux/reducers/cartReducer";
import { productsData } from "./data/productsData";
import { usersData } from "./data/usersData";

export const fakeStore = () => {
  return configureStore({
    reducer: {
      productReducer,
      userReducer,
      cartReducer,
    },
    preloadedState: {
      productReducer: {
        productsList: productsData,
        productsSingle: productsData[0],
        listLoading: false,
        singleLoading: false,
        error: null,
      },
      userReducer:{
        users:usersData,
        error: "",
        loading: false,
      }
    },
  });
};
