import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apis from "../../apis/urls";
import axios from "axios";
import { ProductFormData } from "../../../features/products/ProductCreateForm";
import { toast } from "react-toastify";
import { boolean } from "yup";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
}

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

export const fetchAllProductsAsync = createAsyncThunk<Product[]>(
  "fetchAllProductsAsync",
  async () => {
    return await apis.Product.list();
  }
);

export const fetchProductAsync = createAsyncThunk<Product, string>(
  "fetchProductAsync",
  async (productId) => {
    return await apis.Product.details(productId);
  }
);

export const addProductAsync = createAsyncThunk<Product, ProductFormData>(
  "addProductAsync",
  async (data) => {
    return await apis.Product.add(data);
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number) => {
    try {
      const result = await apis.Product.delete(id.toString());
      if (!result) {
        throw new Error("Cannot delete");
      }
      return id;
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }
);

export const updateProductAsync = createAsyncThunk<
  Product,
  { id: string; data: ProductFormData }
>("updateProductAsync", async ({ id, data }) => {
  return await apis.Product.update(id, data);
});

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

    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      return {
        ...state,
      };
    });

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      if (typeof action.payload === "number") {
        state.productsList = state.productsList.filter(
          (p) => p.id != action.payload
        );
      }
    });

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      return {
        ...state,
      };
    });
  },
});

const productReducer = productsSlice.reducer;
export const { addProduct } = productsSlice.actions;
export default productReducer;
