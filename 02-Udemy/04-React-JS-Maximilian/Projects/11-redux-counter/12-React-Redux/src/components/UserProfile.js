import classes from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <main className={classes.profile}>
      <h2>My User Profile</h2>
    </main>
  );
};

export default UserProfile;

// const redux = require("redux");

// // REDUCER:
// const counterReducer = (state = { counter: 0 }, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return { counter: state.counter + 1 };
//     case "DECREMENT":
//       return { counter: state.counter - 1 };
//     default:
//       return state;
//   }
// };

// // STABLISH STORE:
// const store = redux.createStore(counterReducer);

// // DISPLAY IT IN THE CONSOLE:
// const counterSubscriber = () => {
//   const latestState = store.getState();
//   console.log(latestState);
// };

// store.subscribe(counterSubscriber);

// // DISPATCH:
// store.dispatch(increment);
