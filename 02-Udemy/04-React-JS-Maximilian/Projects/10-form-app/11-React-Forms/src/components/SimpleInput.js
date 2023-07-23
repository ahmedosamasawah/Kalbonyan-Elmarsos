import useInput from "../hooks/useInput";

const SimpleInput = (props) => {
  // const [enteredName, setEnteredName] = useState("");
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const inputNameBlurHandler = () => setEnteredNameTouched(true);
  // const inputNameChangeHandler = (e) => setEnteredName(e.target.value);
  // const enteredNameIsValid = enteredName.trim() !== "";
  // const enteredNameIsInvalid = enteredNameTouched && !enteredNameIsValid;

  const {
    value: enteredName,
    reset: resetNameInput,
    isValid: enteredNameIsValid,
    valueIsInvalid: enteredNameIsInvalid,
    valueBlurHandler: inputNameBlurHandler,
    valueChangeHandler: inputNameChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    reset: resetEmailInput,
    isValid: enteredEmailIsValid,
    valueIsInvalid: enteredEmailIsInvalid,
    valueBlurHandler: inputEmailBlurHandler,
    valueChangeHandler: inputEmailChangeHandler,
  } = useInput((value) => value.includes("@"));

  const formIsValid = enteredNameIsValid && enteredEmailIsValid ? true : false;

  const submitHandler = (e) => {
    e.preventDefault();

    enteredNameIsValid && resetNameInput();
    enteredEmailIsValid && resetEmailInput();
  };

  const inputClasses =
    enteredNameIsInvalid && enteredEmailIsInvalid
      ? "form-control invalid"
      : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={inputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={enteredName}
          onBlur={inputNameBlurHandler}
          onChange={inputNameChangeHandler}
        />
        {enteredNameIsInvalid && (
          <p className="error-text">Email must not be empty.</p>
        )}
      </div>
      <div className={inputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          id="email"
          type="email"
          value={enteredEmail}
          onBlur={inputEmailBlurHandler}
          onChange={inputEmailChangeHandler}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
