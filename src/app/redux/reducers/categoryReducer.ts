import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";
import apis from "../../apis/urls";

interface CategoryState {
  categories: Category[];
  status: string;
  error: string;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle", // 'idle', 'loading', 'succeeded', or 'failed'
  error: "",
};

export const fetchAllCategoriesAsync = createAsyncThunk<Category[]>(
  "fetchAllCategoriesAsync",
  async () => {
    return await apis.Category.list();
  }
);

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
