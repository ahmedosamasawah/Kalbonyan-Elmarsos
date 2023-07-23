import { useState } from "react";
import ExpenseFrom from "./ExpenseForm";
import "./NewExpenses.css";

const NewExpenses = (props) => {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    props.onAddExpense(expenseData);
  };

  const [isEditing, setIsEditing] = useState(false);

  const startEdintingHandler = () => setIsEditing(true);
  const stopEdintingHandler = () => setIsEditing(false);

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEdintingHandler}>Add Expense</button>
      )}
      {isEditing && (
        <ExpenseFrom
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEdintingHandler}
        />
      )}
    </div>
  );
};

export default NewExpenses;
