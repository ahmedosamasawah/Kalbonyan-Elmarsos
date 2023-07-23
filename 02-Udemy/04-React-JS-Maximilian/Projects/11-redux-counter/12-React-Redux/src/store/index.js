import { configureStore, createSlice } from "@reduxjs/toolkit";

const redux = require("redux");

const counterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0, showCounter: true },
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const authSlice = createSlice({
  name: "authentication",
  initialState: { isAuthenticated: false },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const authActions = authSlice.actions;
export const counterActions = counterSlice.actions;
export default store;

// // REDUCER:
// const counterReducer = (state = { counter: 0, showCounter: true }, action) => {
//   switch (action.type) {
//     case "TOGGLE":
//       return { showCounter: !state.showCounter, counter: state.counter };
//     case "INCREMENT":
//       return { counter: state.counter + 1, showCounter: state.showCounter };
//     case "INCREASE":
//       return {
//         counter: state.counter + action.amount,
//         showCounter: state.showCounter,
//       };
//     case "DECREMENT":
//       return { counter: state.counter - 1, showCounter: state.showCounter };
//     default:
//       return state;
//   }
// };
