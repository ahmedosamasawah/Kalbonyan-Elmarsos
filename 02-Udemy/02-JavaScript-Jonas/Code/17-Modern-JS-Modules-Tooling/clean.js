'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'ahmed' },
  { value: -45, description: 'Groceries 🥑', user: 'ahmed' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'ahmed' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'ahmed' },
  { value: -1100, description: 'New iPhone 📱', user: 'ahmed' },
  { value: -20, description: 'Candy 🍭', user: 'fatema' },
  { value: -125, description: 'Toys 🚂', user: 'fatema' },
  { value: -1800, description: 'New Laptop 💻', user: 'ahmed' },
]);

const spendingLimits = Object.freeze({
  ahmed: 1500,
  fatema: 100,
});
// spendingLimits.jay = 200;

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function :D
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'ahmed'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Fatema'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses2 = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);

  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

// logBigExpenses(finalBudget, 500);

// const sum = (num1, num2, num3) => num1 + num2 + num3;

// const values = [1, 5];

// console.log(sum(1, ...values));