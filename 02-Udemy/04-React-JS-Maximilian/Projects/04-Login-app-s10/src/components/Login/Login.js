import { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import Input from '../UI/Inputs/Input';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  switch (action.type) {
    case 'USER-INPUT':
      return { value: action.validate, isValid: action.validate.includes('@') };
    case 'ON-BLUR':
      return {
        value: state.value,
        isValid: state.value.includes('@'),
      };

    default:
      return {
        value: '',
        isValid: false,
      };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'USER-INPUT':
      return {
        value: action.validate,
        isValid: action.validate.trim().length > 6,
      };
    case 'ON-BLUR':
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };

    default:
      return {
        value: '',
        isValid: false,
      };
  }
};

const Login = () => {
  const ctx = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = event => {
    dispatchEmail({ type: 'USER-INPUT', validate: event.target.value });
  };

  const passwordChangeHandler = event => {
    dispatchPassword({ type: 'USER-INPUT', validate: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'ON-BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'ON-BLUR' });
  };

  const submitHandler = event => {
    event.preventDefault();

    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          label="E-Mail"
          ref={emailInputRef}
          isValid={emailIsValid}
          value={emailState.value}
          onBlur={validateEmailHandler}
          onChange={emailChangeHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          ref={passwordInputRef}
          isValid={passwordIsValid}
          value={passwordState.value}
          onBlur={validatePasswordHandler}
          onChange={passwordChangeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
