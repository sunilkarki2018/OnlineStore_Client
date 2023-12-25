import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductLine } from "../../types/Product/ProductLine";
import axios, { AxiosError } from "axios";
import { ProductLineInitialState } from "../../types/ProductLine/ProductLineInitialState";

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
    const response = await axios.get('http://localhost:5238/api/v1/productlines');    
    const result: ProductLine[] =response.data
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
    console.log("ProductLine_Id:",id);
    const response = await axios.get(`http://localhost:5238/api/v1/productlines/${id}`);    
    const result: ProductLine =response.data
    console.log("ProductLine_result:",result);
    return result;

    //http://localhost:5238/api/v1/products/088cd42b-8266-49ee-8823-3f52e412355d
   
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
  



    },
  });
  
  const productLineReducer = productLineSlice.reducer;
  export const { addProductLine } = productLineSlice.actions;
  export default productLineReducer;
