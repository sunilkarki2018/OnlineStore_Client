import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ProductSizeInitialState } from "../../types/ProductSize/ProductSizeInitialState";
import { ProductSize } from "../../types/Product/ProductSize";
import apis from "../../apis/urls";

const initialState: ProductSizeInitialState = {
  productSizes: [],
  status: "idle",
  error: "",
};
export const fetchAllProductSizesAsync = createAsyncThunk<
  ProductSize[],
  void,
  { rejectValue: string }
>("fetchAllProductSizesAsync", async (_, { rejectWithValue }) => {
  try {
    const result: ProductSize[] = await apis.ProductSize.list();
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

const productSizeSlice = createSlice({
  name: "productSize",
  initialState,
  reducers: {
    test: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductSizesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductSizesAsync.fulfilled, (state, action) => {
        state.productSizes = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAllProductSizesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

const productSizeReducer = productSizeSlice.reducer;
export const { test } = productSizeSlice.actions;
export default productSizeReducer;
