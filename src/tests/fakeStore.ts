//let store = createStore();

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/reducers/productReducer";
import userReducer from "../redux/reducers/userReducer";
import cartReducer from "../redux/reducers/cartReducer";
import { productsData } from "./data/productsData";
import { usersData } from "./data/usersData";
import categoryReducer from "../redux/reducers/categoryReducer";
import { categoriesData } from "./data/catagoriesData";
import productLineReducer from "../redux/reducers/productLineReducer";
import { productLinesData } from "./data/productLinesData";

export const fakeStore = () => {
  return configureStore({
    reducer: {
      productReducer,
      productLineReducer,
      userReducer,
      cartReducer,
      categoryReducer
    },
    preloadedState: {
      productLineReducer: {
        productLinesList: productLinesData,
        productLineSingle: productLinesData[0],
        listLoading: false,
        singleLoading: false,
        error: null,
      },
      userReducer:{
        users:usersData,
        user:undefined,
        currentUser:undefined,
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
