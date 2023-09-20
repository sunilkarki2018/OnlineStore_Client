import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apis from "../apis/urls";
import axios from "axios";
import { Product } from "../types/Product";

//const initialState: Product[] = [];

interface ProductState {
  productsList: Product[];
  productsSingle: Product|null;
  error: string|null;
  listLoading: boolean;
  singleLoading: boolean;
}

const initialState: ProductState = {
  productsList: [],
  productsSingle:null,
  listLoading: false,
  singleLoading: false,
  error:null
};

export const fetchAllProductsAsync = createAsyncThunk<Product[]>(
  "fetchAllProductsAsync",
  async () => {
    return await apis.Product.list();
  }
);

export const fetchSingleProductsAsync = createAsyncThunk<Product,{ productId: string }>(
  "fetchSingleProductsAsync",
  async ({productId}) => {
    return await apis.Product.details(productId);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      //state.products.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      return {
        ...state,
        listLoading: true,
      };
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          listLoading: false,
        };
      }
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        productsList: action.payload,
        listLoading: false,
      };
    });

    builder.addCase(fetchSingleProductsAsync.pending, (state, action) => {
      return {
        ...state,
        singleLoading: true,
      };
    });
    builder.addCase(fetchSingleProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          singleLoading: false,
          error:action.payload.message
        };
      }
    });
    builder.addCase(fetchSingleProductsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        productsSingle: action.payload,
        singleLoading: false,
      };
    });

  },
});

const productReducer = productsSlice.reducer;
export const { addProduct } = productsSlice.actions;
export default productReducer;
