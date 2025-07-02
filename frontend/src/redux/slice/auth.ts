import { createSlice } from "@reduxjs/toolkit";
import type { IUserState } from "../types/auth";

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = auth.actions;

export default auth.reducer;
