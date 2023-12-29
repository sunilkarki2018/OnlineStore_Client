import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { OrderInitialState } from "../../types/Order/OrderInitialState";
import { Order } from "../../types/Order/Order";
import { CreateOrderInput } from "../../types/Order/CreateOrderInput";

const initialState: OrderInitialState = {
  orders: [],
  error: "",
  status: "",
  listLoading: false,
  singleLoading: false,
};
export const fetchAllOrdersAsync = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("fetchAllOrdersAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5238/api/v1/orders");
    const result: Order[] = response.data;
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const createOrderAsync = createAsyncThunk<
  Order,
  CreateOrderInput,
  { rejectValue: string }
>("createOrderAsync", async (newOrder, { rejectWithValue }) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.post(
      "http://localhost:5238/api/v1/orders",
      newOrder,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const result: Order = response.data;
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const fetchOrderByIdAsync = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("fetchOrderByIdAsync", async (id: string, { rejectWithValue }) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.get(
      `http://localhost:5238/api/v1/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const result: Order = response.data;
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const deleteOrderAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deleteOrderAsync", async (id: string, { rejectWithValue }) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.delete(
      `http://localhost:5238/api/v1/orders/${id}`,
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    test: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })

      .addCase(fetchOrderByIdAsync.pending, (state, action) => {
        return {
          ...state,
          singleLoading: true,
        };
      })
      .addCase(fetchOrderByIdAsync.rejected, (state, action) => {
        return {
          ...state,
          singleLoading: false,
          error: action.payload,
        };
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        return {
          ...state,
          order: action.payload,
          singleLoading: false,
        };
      })

      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.orders = state.orders.filter((p) => p.id != action.payload);
        state.error = "";
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {});
  },
});

const orderReducer = orderSlice.reducer;
export const { test } = orderSlice.actions;
export default orderReducer;
