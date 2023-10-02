import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { User } from "../../types/User";

interface UserState {
  user: User | null;
  loggedIn: boolean;
  isAdmin: boolean;
  access_token: string | null;
  refresh_token: string | null;
  error: string | null;
}

interface UserFormData {
  email: string;
  password: string;
}

interface UserResponse {
  access_token: string;
  refresh_token: string;
}

const initialState: UserState = {
  user: null,
  loggedIn: false,
  isAdmin: false,
  access_token: null,
  refresh_token: null,
  error: null,
};

export const loginAsync = createAsyncThunk<UserResponse, UserFormData>(
  "loginAsync",
  async (data: UserFormData, { rejectWithValue }) => {
    try {
      const result: AxiosResponse<UserResponse> = await axios.post(
        `https://api.escuelajs.co/api/v1/auth/login`,
        data
      );
      console.log("result.data:", result.data);
      return result.data as UserResponse;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfileAsync = createAsyncThunk(
  "fetchUserProfileAsync",
  async (access_token: string, { rejectWithValue }) => {
    try {
      console.log("user fetch triggered: ");
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const userInfo = response.data as User;

      console.log("userInfo: ", userInfo);
      return userInfo;
    } catch (e) {
      const error = e as Error;
      console.log("userInfoerror: ", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        // Handle login failure
        state.error = action.payload as string; // This will be the error message
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      });
  },
});

export const { logout } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
