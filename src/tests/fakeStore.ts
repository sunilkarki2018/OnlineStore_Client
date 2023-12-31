//let store = createStore();

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/reducers/productReducer";
import userReducer from "../redux/reducers/userReducer";
import cartReducer from "../redux/reducers/cartReducer";
import { productsData } from "./data/productsData";
import { usersData } from "./data/usersData";
import categoryReducer from "../redux/reducers/categoryReducer";
import { categoriesData } from "./data/catagoriesData";

export const fakeStore = () => {
  return configureStore({
    reducer: {
      productReducer,
      userReducer,
      cartReducer,
      categoryReducer
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
      },
      categoryReducer:{
        categories:categoriesData,
        error: "",
        status:""
      }
    },
  });
};
