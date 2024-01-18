import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "../../types/User/User";
import { UserReducerState } from "../../types/User/UserReducerState";
import { UpdateUserInput } from "../../types/User/UpdateUserInput";
import apis from "../../apis/urls";
import { UserCredential } from "../../types/User/UserCredential";

const initialState: UserReducerState = {
  users: [],
  currentUser: undefined,
  error: "",
  loading: false,
};

export const fetchUsersAsync = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("fetchUsersAsync", async (_, { rejectWithValue }) => {
  try {
    const result: User[] = await apis.User.list();
    return result;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const loginUserAsync = createAsyncThunk<
  User,
  UserCredential,
  { rejectValue: string }
>("loginUserAsync", async (cred, { rejectWithValue, dispatch }) => {
  try {
    const result = await axios.post("https://ecommerce2024v1.azurewebsites.net/api/v1/auth", cred);
    const authenticatedResult = await dispatch(
      authenticateUserAsync(result.data)
    );

    if (
      typeof authenticatedResult.payload === "string" ||
      !authenticatedResult.payload
    ) {
      throw Error(authenticatedResult.payload || "Cannot login");
    } else {
      localStorage.setItem("access_token", result.data);
      return authenticatedResult.payload;
    }
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const authenticateUserAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("authenticateUserAsync", async (access_token, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      "https://ecommerce2024v1.azurewebsites.net/api/v1/auth/get-profile",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const result: User = response.data;
    return result;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const createUserAsync = createAsyncThunk<
  User,
  FormData,
  { rejectValue: string }
>("createUserAsync", async (newUser, { rejectWithValue }) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.post(
      "http://localhost:5238/api/v1/users/create-users",
      newUser,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const result: User = response.data;
    return result;
  } catch (e) {
    const error = e as AxiosError;
    console.log("error.message:", error.message);
    return rejectWithValue(error.message);
  }
});

export const updateUserAsync = createAsyncThunk<
  User,
  UpdateUserInput,
  { rejectValue: string }
>(
  "updateUserAsync",
  async ({ id, update }: UpdateUserInput, { rejectWithValue }) => {
    try {
      const result = await apis.User.update(id, update);
      return result;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("fetchProductAsync", async (id, { rejectWithValue }) => {
  try {
    const result = await apis.User.details(id);
    return result;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = "";
        state.loading = false;
      })
      .addCase(fetchUsersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.error = "";
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(authenticateUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(authenticateUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.error = "";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.error = "";
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        return {
          ...state,
          user: action.payload,
        };
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const foundIndex = state.users.findIndex(
          (u) => u.id === action.payload.id
        );
        if (foundIndex >= 0) {
          state.users[foundIndex] = action.payload;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
