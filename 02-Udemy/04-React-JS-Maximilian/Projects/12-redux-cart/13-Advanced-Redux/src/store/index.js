import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;

// const store = configureStore({
//   reducer: { ui: uiSlice.reducer },
// });
