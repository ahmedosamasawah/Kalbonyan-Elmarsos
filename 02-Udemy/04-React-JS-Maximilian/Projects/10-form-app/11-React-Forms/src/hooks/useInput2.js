import { useReducer } from "react";

const initialInput = {
  value: "",
  valueInputIsTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      valueInputIsTouched: state.valueInputIsTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      valueInputIsTouched: true,
      value: state.value,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      valueInputIsTouched: false,
    };
  }
  return initialInput;
};

const useInput2 = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialInput);

  const enteredValueIsValid = validateValue(inputState.value);
  const enteredValueIsInvalid =
    inputState.valueInputIsTouched && !enteredValueIsValid;

  const valueBlurHandler = () => dispatch({ type: "BLUR" });

  const valueChangeHandler = (event) =>
    dispatch({ type: "INPUT", value: event.target.value });

  const resetValue = () => {
    dispatch({ type: "RESET" });
  };

  return {
    resetValue,
    valueBlurHandler,
    valueChangeHandler,
    enteredValueIsValid,
    enteredValueIsInvalid,
    enteredValue: inputState.value,
  };
};

export default useInput2;
