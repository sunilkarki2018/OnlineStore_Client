import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loggedIn: boolean;
  isAdmin: boolean;
  role: string;
}

const initialState: UserState = {
  loggedIn: false,
  isAdmin: false,
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
      state.isAdmin = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.isAdmin = false;
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { login, logout, setAdmin } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
