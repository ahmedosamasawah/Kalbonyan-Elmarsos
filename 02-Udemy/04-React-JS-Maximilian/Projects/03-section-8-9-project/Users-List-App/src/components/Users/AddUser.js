import Card from '../UI/Card';
import Button from '../UI/Button';
import Wrapper from './Helpers/Wrapper';
import { useState, useRef } from 'react';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = props => {
  const enteredNameRef = useRef();
  const enteredAgeRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = e => {
    e.preventDefault();

    const enteredName = enteredNameRef.current.value;
    const enteredAge = enteredAgeRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid Input!',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid Age!',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }

    props.onAddUser(enteredName, enteredAge);

    // Blur input fields
    enteredNameRef.current.value = '';
    enteredAgeRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="name">User Name</label>
          <input id="name" type="text" ref={enteredNameRef} />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={enteredAgeRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
