import { useState } from "react";

const useInput = (validateValue) => {
  const [value, setValue] = useState("");
  const [valueTouched, setValueTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const valueIsInvalid = valueTouched && !valueIsValid;

  const valueBlurHandler = () => setValueTouched(true);
  const valueChangeHandler = (e) => setValue(e.target.value);

  const reset = () => {
    setValue("");
    setValueTouched(false);
  };
  return {
    reset,
    value: value,
    valueIsInvalid,
    valueBlurHandler,
    valueChangeHandler,
    isValid: valueIsValid,
  };
};

export default useInput;
