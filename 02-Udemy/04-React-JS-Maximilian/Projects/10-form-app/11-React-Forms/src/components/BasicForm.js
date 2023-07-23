import useInput2 from "../hooks/useInput2";

const BasicForm = (props) => {
  const {
    resetValue: resetName,
    enteredValue: enteredName,
    valueBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    enteredValueIsValid: enteredNameIsValid,
    enteredValueIsInvalid: enteredNameIsInvalid,
  } = useInput2((value) => value.trim() !== "");

  const {
    resetValue: resetLastName,
    enteredValue: enteredLastName,
    valueBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
    enteredValueIsValid: enteredLastNameIsValid,
    enteredValueIsInvalid: enteredLastNameIsInvalid,
  } = useInput2((value) => value.trim() !== "");

  const {
    resetValue: resetEmail,
    enteredValue: enteredEmail,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    enteredValueIsValid: enteredEmailIsValid,
    enteredValueIsInvalid: enteredEmailIsInvalid,
  } = useInput2((value) => value.includes("@"));

  const submissionHandler = (event) => {
    event.preventDefault();

    enteredNameIsValid && resetName();
    enteredEmailIsValid && resetEmail();
    enteredLastNameIsValid && resetLastName();
  };

  const formIsValid =
    enteredNameIsValid && enteredLastNameIsValid && enteredEmailIsValid
      ? true
      : false;

  const inputClasses =
    enteredNameIsInvalid && enteredEmailIsInvalid && enteredLastNameIsInvalid
      ? "form-control invalid"
      : "form-control";

  return (
    <form onSubmit={submissionHandler}>
      <div className="control-group">
        <div className={inputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            id="name"
            type="text"
            value={enteredName}
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
          />
          {enteredNameIsInvalid && (
            <p className="error-text">Name must not be empty.</p>
          )}
        </div>
        <div className={inputClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={enteredLastName}
            onBlur={lastNameBlurHandler}
            onChange={lastNameChangeHandler}
          />
          {enteredLastNameIsInvalid && (
            <p className="error-text">Last name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={inputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
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

export default BasicForm;
