import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/Category/Category";
import axios, { AxiosError } from "axios";
import { CategoryInitialState } from "../../types/Category/CategoryInitialState";
import apis from "../../apis/urls";

const initialState: CategoryInitialState = {
  categories: [],
  status: "idle",
  error: "",
};
export const fetchAllCategoriesAsync = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("fetchAllCategoriesAsync", async (_, { rejectWithValue }) => {
  try {
    const result: Category[] = await apis.Category.list();
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    test: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

const categoryReducer = categorySlice.reducer;
export const { test } = categorySlice.actions;
export default categoryReducer;
