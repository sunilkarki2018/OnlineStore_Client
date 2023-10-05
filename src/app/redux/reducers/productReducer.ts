import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apis from "../../apis/urls";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { boolean } from "yup";
import { Product } from "../../types/Product/Product";
import { CreateProductInput } from "../../types/Product/CreateProductInput";
import { UpdateProductInput } from "../../types/Product/UpdateProductInput";

interface ProductState {
  productsList: Product[];
  productsSingle: Product | null;
  error: string | null;
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

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/products`
      );
      const products: Product[] = await result.data;
      return products;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, string>(
  "fetchProductAsync",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "createProductAsync",
  async (newProduct: CreateProductInput, { rejectWithValue }) => {
    try {
      console.log("fetch start");
      const result = await axios.post<Product>(
        "https://api.escuelajs.co/api/v1/products/",
        newProduct
      );
      console.log("fetch end", result);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      console.log("error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number, { rejectWithValue }) => {
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
  }
);

export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async ({ id, update }: UpdateProductInput, { rejectWithValue }) => {
    try {
      console.log("id:", id);
      console.log("update:", update);
      const result = await axios.put<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        update
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      console.log("update:", error.message);
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
      if (action.payload instanceof Error) {
        return {
          ...state,
          singleLoading: false,
          error: action.payload.message,
        };
      }
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
      state.error = action.payload as string;
    });

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.productsList = state.productsList.filter(
        (p) => p.id != action.payload
      );
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const foundIndex = state.productsList.findIndex(
        (p) => p.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.productsList[foundIndex] = action.payload;
      }
    });
  },
});

const productReducer = productsSlice.reducer;
export const { addProduct } = productsSlice.actions;
export default productReducer;
