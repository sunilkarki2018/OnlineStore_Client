import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../app/types/Category";
import apis from "../../app/apis/urls";

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const fetchAllCategoriesAsync = createAsyncThunk<Category[]>(
  "fetchAllProductsAsync",
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
    builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        state.categories = [];
      }
    });
    builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export const { test } = categorySlice.actions;
export default categoryReducer;
