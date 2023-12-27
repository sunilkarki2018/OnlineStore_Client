import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product/Product";
import { CreateProductInput } from "../../types/Product/CreateProductInput";
import { UpdateProductInput } from "../../types/Product/UpdateProductInput";
import apis from "../../apis/urls";
import { ProductInitialState } from "../../types/Product/ProductInitialState";

const initialState: ProductInitialState = {
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
    //const result: Product[] = await apis.Product.list();
    //return result;

    const response = await axios.get('http://localhost:5238/api/v1/products');    
    const result: Product[] =response.data
    return result;

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
    //const result: Product = await apis.Product.details(id);
    //return result;

    const response = await axios.get(`http://localhost:5238/api/v1/products/${id}`);    
    const result: Product =response.data
    return result;

    //http://localhost:5238/api/v1/products/088cd42b-8266-49ee-8823-3f52e412355d
   
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

    const access_token = localStorage.getItem("access_token");
    console.log("access_token: ",access_token);
    const response = await axios.post(
      "http://localhost:5238/api/v1/products",
      newProduct,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    debugger;
    console.log("response>",response);
    const result: Product = response.data;
    return result;
    //const result: Product = await apis.Product.add(newProduct);
    //return result;
  } catch (e) {
    const error = e as AxiosError;
    console.log("error.message:",error.message);
    return rejectWithValue(error.message);
  }
});

export const deleteProductAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deleteProductAsync", async (id: string, { rejectWithValue }) => {
  try {
    const result: boolean = await apis.Product.delete(id);
    if (!result) {
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
      const result: Product = await apis.Product.update(id, update);
      return result;
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
        error: "",
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
      debugger;
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
