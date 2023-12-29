import {
  AnyAction,
  Reducer,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import cartReducer from "./reducers/cartReducer";
import { PersistConfig } from "redux-persist/lib/types";
import userReducer from "./reducers/userReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import productLineReducer from "./reducers/productLineReducer";
import productSizeReducer from "./reducers/productSizeReducer";
import orderReducer from "./reducers/orderReducer";

const persisConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: ["cart","user"],
  //blacklist: ["productReducer", "usersReducer"] "product",
};

const rootReducer = combineReducers({
  productLine: productLineReducer,
  product: productReducer,
  productSize:productSizeReducer,
  cart: cartReducer,
  user: userReducer,
  category: categoryReducer,
  order:orderReducer
});

const persistedReducer: Reducer<AppState, AnyAction> = persistReducer(
  persisConfig,
  rootReducer
);

/* const store = configureStore({
  reducer: {
    product:productReducer,
    cart: cartReducer,
    user:userReducer
  },
}); */

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PAUSE, REGISTER],
        },
      }),
  });
};

const store = createStore();

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
