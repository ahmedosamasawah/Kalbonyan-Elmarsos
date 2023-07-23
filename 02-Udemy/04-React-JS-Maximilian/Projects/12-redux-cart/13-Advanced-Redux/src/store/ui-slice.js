import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

// const initialState = { cartIsVisible: false, quantity: 0, price: 0 };
// const uiSlice = createSlice({
//   name: "UI",
//   initialState: initialState,
//   reducers: {
//     toggleCart(state) {
//       state.cartIsVisible = !state.cartIsVisible;
//     },
//     increment(state) {
//       state.quantity > 0 && state.quantity++;
//     },
//     decrement(state) {
//       state.quantity > 0 && state.quantity--;
//     },
//     addToCart(state, action) {
//       state.price = action.payload;
//       state.quantity++;
//     },
//   },
// });
