import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product/Product";
import { CreateProductInput } from "../../types/Product/CreateProductInput";
import { UpdateProductInput } from "../../types/Product/UpdateProductInput";

interface ProductState {
  productsList: Product[];
  productsSingle: Product | null;
  error?: string | null;
  listLoading: boolean;
  singleLoading: boolean;
}

const initialState: ProductState = {
  productsList: [],
  productsSingle: null,
  listLoading: false,
  singleLoading: false,
  error: null,
};

export const fetchAllProductsAsync = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("fetchAllProductsAsync", async (_, { rejectWithValue }) => {
  try {
    const result = await axios.get(`https://api.escuelajs.co/api/v1/products`);
    const products: Product[] = await result.data;
    return products;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const fetchProductAsync = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("fetchProductAsync", async (id, { rejectWithValue }) => {
  try {
    const result = await axios.get<Product>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const createProductAsync = createAsyncThunk<
  Product,
  CreateProductInput,
  { rejectValue: string }
>("createProductAsync", async (newProduct, { rejectWithValue }) => {
  try {
    const result = await axios.post<Product>(
      "https://api.escuelajs.co/api/v1/products/",
      newProduct
    );
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const deleteProductAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("deleteProductAsync", async (id: number, { rejectWithValue }) => {
  try {
    const result = await axios.delete<boolean>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    if (!result.data) {
      throw new Error("Cannot delete");
    }
    return id;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const updateProductAsync = createAsyncThunk<
  Product,
  UpdateProductInput,
  { rejectValue: string }
>(
  "updateProductAsync",
  async ({ id, update }: UpdateProductInput, { rejectWithValue }) => {
    try {
      const result = await axios.put<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        update
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
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
      return {
        ...state,
        listLoading: false,
        error: action.payload,
      };
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        productsList: action.payload,
        listLoading: false,
      };
    });

    builder.addCase(fetchProductAsync.pending, (state, action) => {
      return {
        ...state,
        singleLoading: true,
      };
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      return {
        ...state,
        singleLoading: false,
        error: action.payload,
      };
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      return {
        ...state,
        productsSingle: action.payload,
        singleLoading: false,
      };
    });

    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.productsList.push(action.payload);
    });
    builder.addCase(createProductAsync.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.productsList = state.productsList.filter(
        (p) => p.id != action.payload
      );
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const foundIndex = state.productsList.findIndex(
        (p) => p.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.productsList[foundIndex] = action.payload;
      }
    });
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

const productReducer = productsSlice.reducer;
export const { addProduct } = productsSlice.actions;
export default productReducer;
