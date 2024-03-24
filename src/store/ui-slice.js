import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartIsVisible: false };
const uiSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    cartToggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
