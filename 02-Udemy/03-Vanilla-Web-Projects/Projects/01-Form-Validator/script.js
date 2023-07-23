/// // // // Selecting Elements: // // // ///
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const inputs = [form, username, email, password, password2];

/// // // // Geting fieldname: // // // ///
const getFieldName = input =>
  input.id.charAt(0).toUpperCase() + input.id.slice(1);

/// // // // Showing input error message: // // // ///
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'formControl error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

/// // // // Showing success outline: // // // ///
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'formControl success';
};

/// // // // Checking email is valid: // // // ///
const checkEmail = input => {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  reg.test(input.value.trim())
    ? showSuccess(input)
    : showError(input, 'Email is not valid');
};

/// // // // Checking required fields: // // // ///
const checkRequired = inputArr => {
  let isRequired = false;

  inputArr.forEach(input => {
    input.value.trim() === ''
      ? [
          showError(input, `${getFieldName(input)} is required`),
          (isRequired = true),
        ]
      : showSuccess(input);
  });

  return (isRequired = true);
};

/// // // // Checking input length: // // // ///
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

/// // // // Checking passwords match: // // // ///
const passwordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords don't match");
  }
};

/// /// /// /// Event listeners: /// /// /// ///
form.addEventListener('submit', e => {
  e.preventDefault();

  if (checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    passwordsMatch(password, password2);
  }
});
