import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductLine } from "../../types/ProductLine/ProductLine";
import axios, { AxiosError } from "axios";
import { ProductLineInitialState } from "../../types/ProductLine/ProductLineInitialState";
import { CreateProductLineInput } from "../../types/ProductLine/CreateProductLineInput";

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
    const response = await axios.get(
      "http://localhost:5238/api/v1/productlines"
    );
    const result: ProductLine[] = response.data;
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
    console.log("ProductLine_Id:", id);
    const response = await axios.get(
      `http://localhost:5238/api/v1/productlines/${id}`
    );
    const result: ProductLine = response.data;
    console.log("ProductLine_result:", result);
    return result;

    //http://localhost:5238/api/v1/products/088cd42b-8266-49ee-8823-3f52e412355d
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const createProductLineAsync = createAsyncThunk<
  ProductLine,
  CreateProductLineInput,
  { rejectValue: string }
>("createProductLineAsync", async (newProductLine, { rejectWithValue }) => {
  try {
    const access_token = localStorage.getItem("access_token");
    console.log("Before call:", newProductLine);
    const response = await axios.post(
      "http://localhost:5238/api/v1/productlines",
      newProductLine,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const result: ProductLine = response.data;
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
    //const result: boolean = await apis.Product.delete(id);
    const access_token = localStorage.getItem("access_token");
    const response = await axios.delete(
      `http://localhost:5238/api/v1/productlines/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const result: boolean = response.data;
    if (!result) {
      throw new Error("Cannot delete");
    }
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
    addProductLine: (state, action: PayloadAction<ProductLine>) => {
      //state.products.push(action.payload);
    },
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
  },
});

const productLineReducer = productLineSlice.reducer;
export const { addProductLine } = productLineSlice.actions;
export default productLineReducer;
