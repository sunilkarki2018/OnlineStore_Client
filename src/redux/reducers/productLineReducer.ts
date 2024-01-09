import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductLine } from "../../types/ProductLine/ProductLine";
import axios, { AxiosError } from "axios";
import { ProductLineInitialState } from "../../types/ProductLine/ProductLineInitialState";
import apis from "../../apis/urls";

const initialState: ProductLineInitialState = {
  productLinesList: [],
  productLineSingle: null,
  listLoading: false,
  singleLoading: false,
  error: null,
};

export const fetchAllProductLinesAsync = createAsyncThunk<
  ProductLine[],
  void,
  { rejectValue: string }
>("fetchAllProductLinesAsync", async (_, { rejectWithValue }) => {
  try {
    const result: ProductLine[] = await apis.ProductLine.list();
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const fetchProductLineAsync = createAsyncThunk<
  ProductLine,
  string,
  { rejectValue: string }
>("fetchProductLineAsync", async (id, { rejectWithValue }) => {
  try {
    const response: ProductLine = await apis.ProductLine.details(id);
    return response;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const createProductLineAsync = createAsyncThunk<
  ProductLine,
  FormData,
  { rejectValue: string }
>("createProductLineAsync", async (newProductLine, { rejectWithValue }) => {
  try {
    const access_token = localStorage.getItem("access_token");
    if (access_token === null) {
      throw new Error("Access token is null");
    }
    const response = await apis.ProductLine.addWithToken(
      newProductLine,
      access_token
    );
    const result: ProductLine = response.data;
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const updateProductLineAsync = createAsyncThunk<
  boolean,
  FormData,
  { rejectValue: string }
>("updateProductLineAsync", async (updateProductLine, { rejectWithValue }) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const id = updateProductLine.get("id");
    const response = await axios.patch(
      "https://ecommerce2024v1.azurewebsites.net/api/v1/productlines",
      updateProductLine,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const result: boolean = response.data;
    if (!result) {
      throw new Error("Cannot update");
    }
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const deleteProductLineAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deleteProductLineAsync", async (id: string, { rejectWithValue }) => {
  try {
    const access_token = localStorage.getItem("access_token");

    if (access_token === null) {
      throw new Error("Access token is null");
    }
    const response: boolean = await apis.ProductLine.deletWithToken(
      id,
      access_token
    );
    return id;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

const productLineSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductLine: (state, action: PayloadAction<ProductLine>) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllProductLinesAsync.pending, (state, action) => {
      return {
        ...state,
        listLoading: true,
      };
    });
    builder.addCase(fetchAllProductLinesAsync.rejected, (state, action) => {
      return {
        ...state,
        listLoading: false,
        error: action.payload,
      };
    });
    builder.addCase(fetchAllProductLinesAsync.fulfilled, (state, action) => {
      return {
        ...state,
        productLinesList: action.payload,
        listLoading: false,
        error: "",
      };
    });

    builder.addCase(fetchProductLineAsync.pending, (state, action) => {
      return {
        ...state,
        singleLoading: true,
      };
    });
    builder.addCase(fetchProductLineAsync.rejected, (state, action) => {
      return {
        ...state,
        singleLoading: false,
        error: action.payload,
      };
    });
    builder.addCase(fetchProductLineAsync.fulfilled, (state, action) => {
      return {
        ...state,
        productLineSingle: action.payload,
        singleLoading: false,
      };
    });

    builder.addCase(createProductLineAsync.fulfilled, (state, action) => {
      state.productLinesList.push(action.payload);
    });
    builder.addCase(createProductLineAsync.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(deleteProductLineAsync.fulfilled, (state, action) => {
      state.productLinesList = state.productLinesList.filter(
        (p) => p.id != action.payload
      );
    });
    builder.addCase(deleteProductLineAsync.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(updateProductLineAsync.fulfilled, (state, action) => {
      console.log("after fulfilled,", action.payload);
      /*  
      const foundIndex = state.productLinesList.findIndex(
        (p) => p.id === action.payload.id
      );
   
    if (foundIndex >= 0) {
        state.productLinesList[foundIndex] = action.payload;
      }
      */
    });
    builder.addCase(updateProductLineAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const productLineReducer = productLineSlice.reducer;
export const { addProductLine } = productLineSlice.actions;
export default productLineReducer;
