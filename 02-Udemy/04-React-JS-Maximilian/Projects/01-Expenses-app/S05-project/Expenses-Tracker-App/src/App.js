import { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpenses from './components/NewExpenses/NewExpenses';

const DUMMY_EXPENSES = [
  // {
  //   id: 'e1',
  //   title: 'Apple IPhone',
  //   amount: 450,
  //   date: new Date(2023, 1, 7),
  // },
  // {
  //   id: 'e2',
  //   title: 'New House',
  //   amount: 1000,
  //   date: new Date(2022, 9, 7),
  // },
  // {
  //   id: 'e3',
  //   title: 'Car Insurance',
  //   amount: 294.67,
  //   date: new Date(2021, 1, 7),
  // },
  // {
  //   id: 'e4',
  //   title: 'New Desk (Wooden)',
  //   amount: 450,
  //   date: new Date(2020, 3, 7),
  // },
];

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = expense => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses];
    });
  };

  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement(Expenses, { expenses: expenses })
  // );

  return (
    <div>
      <NewExpenses onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
