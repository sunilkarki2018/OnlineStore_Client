import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { User } from "../../types/User/User";
import { UserReducerState } from "../../types/User/UserReducerState";
import { CreateUserInput } from "../../types/User/CreateUserInput";
import { UpdateUserInput } from "../../types/User/UpdateUserInput";
import apis from "../../apis/urls";

interface UserCredential {
  email: string;
  password: string;
}

const initialState: UserReducerState = {
  users: [],
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
    const result = await apis.User.login(cred);
    const { access_token } = result;
    const authenticatedResult = await dispatch(
      authenticateUserAsync(access_token)
    );

    if (
      typeof authenticatedResult.payload === "string" ||
      !authenticatedResult.payload
    ) {
      throw Error(authenticatedResult.payload || "Cannot login");
    } else {
      localStorage.setItem("access_token", access_token);
      return authenticatedResult.payload as User;
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
    const result: User = await apis.User.profile(access_token);
    return result;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const createUserAsync = createAsyncThunk<
  User,
  CreateUserInput,
  { rejectValue: string }
>("createUserAsync", async (newUser, { rejectWithValue }) => {
  try {
    const result: User = await apis.User.add(newUser);
    return result;
  } catch (e) {
    const error = e as AxiosError;
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
  number,
  { rejectValue: string }
>("fetchProductAsync", async (id, { rejectWithValue }) => {
  try {
    /*  const result = await axios.get<User>(
      `https://api.escuelajs.co/api/v1/users/${id}`
    );
    return result.data; */
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
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(authenticateUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(authenticateUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.error = action.payload;
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
