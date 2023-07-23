'use strict';

/*
///////////////////////////////////////
// Activating Strict Mode
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio';
// const private = 534;


///////////////////////////////////////
// Functions
function logger() {
  console.log('My name is ahmed');
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number('23');


///////////////////////////////////////
// Function Declarations vs. Expressions

// Function declaration
function calcAge1(birthYeah) {
  return 2037 - birthYeah;
}
const age1 = calcAge1(2002);

// Function expression
const calcAge2 = function (birthYeah) {
  return 2037 - birthYeah;
}
const age2 = calcAge2(2002);

console.log(age1, age2);


///////////////////////////////////////
// Arrow functions

const calcAge3 = birthYeah => 2037 - birthYeah;
const age3 = calcAge3(2002);
console.log(age3);

const yearsUntilRetirement = (birthYeah, firstName) => {
  const age = 2037 - birthYeah;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(2002, 'ahmed')); console.log(yearsUntilRetirement(1980, 'Bob'));


///////////////////////////////////////
// Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));


///////////////////////////////////////
// Reviewing Functions
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}

const yearsUntilRetirement = function (birthYeah, firstName) {
  const age = calcAge(birthYeah);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
}

console.log(yearsUntilRetirement(2002, 'ahmed'));
console.log(yearsUntilRetirement(1950, 'Mike'));
*/

///////////////////////////////////////

///////////////////////////////////////
// Introduction to Arrays
/*
const friend1 = 'Maher';
const friend2 = 'Moaz';
const friend3 = 'Anas';

const friends = ['Maher', 'Moaz', 'Anas'];
console.log(friends);

const y = new Array(2002, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);
// friends = ['Bob', 'Alice']

const firstName = 'ahmed';
const ahmed = [firstName, 'Schmedtmann', 2037 - 2002, 'student', friends];
console.log(ahmed);
console.log(ahmed.length);

// Exercise
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);


///////////////////////////////////////
// Basic Array Operations (Methods)
const friends = ['Maher', 'Moaz', 'Anas'];

// Add elements
const newLength = friends.push('Jay');
console.log(friends);
console.log(newLength);

friends.unshift('John');
console.log(friends);

// Remove elements
friends.pop(); // Last
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // First
console.log(friends);

console.log(friends.indexOf('Moaz'));
console.log(friends.indexOf('Bob'));

friends.push(23);
console.log(friends.includes('Moaz'));
console.log(friends.includes('Bob'));
console.log(friends.includes(23));

if (friends.includes('Moaz')) {
  console.log('You have a friend called Moaz');
}

///////////////////////////////////////




///////////////////////////////////////
// Introduction to Objects
const ahmedArray = [
  'ahmed',
  'Schmedtmann',
  2037 - 2002,
  'student',
  ['Maher', 'Anas', 'Moaz']
];

const ahmed = {
  firstName: 'ahmed',
  lastName: 'Schmedtmann',
  age: 2037 - 2002,
  job: 'student',
  friends: ['Maher', 'Anas', 'Moaz']
};


///////////////////////////////////////
// Dot vs. Bracket Notation
const ahmed = {
  firstName: 'ahmed',
  lastName: 'Schmedtmann',
  age: 2037 - 2002,
  job: 'student',
  friends: ['Maher', 'Anas', 'Moaz']
};
console.log(ahmed);

console.log(ahmed.lastName);
console.log(ahmed['lastName']);

const nameKey = 'Name';
console.log(ahmed['first' + nameKey]);
console.log(ahmed['last' + nameKey]);

// console.log(ahmed.'last' + nameKey)

const interestedIn = prompt('What do you want to know about ahmed? Choose between firstName, lastName, age, job, and friends');

if (ahmed[interestedIn]) {
  console.log(ahmed[interestedIn]);
} else {
  console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}

ahmed.location = 'Portugal';
ahmed['twitter'] = '@ahmedschmedtman';
console.log(ahmed);

// Challenge
// "ahmed has 3 friends, and his best friend is called Maher"
console.log(`${ahmed.firstName} has ${ahmed.friends.length} friends, and his best friend is called ${ahmed.friends[0]}`);


///////////////////////////////////////
// Object Methods

const ahmed = {
  firstName: 'ahmed',
  lastName: 'Schmedtmann',
  birthYeah: 2002,
  job: 'student',
  friends: ['Maher', 'Anas', 'Moaz'],
  hasDriversLicense: true,

  // calcAge: function (birthYeah) {
  //   return 2037 - birthYeah;
  // }

  // calcAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYeah;
  // }

  calcAge: function () {
    this.age = 2037 - this.birthYeah;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${ahmed.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
  }
};

console.log(ahmed.calcAge());

console.log(ahmed.age);
console.log(ahmed.age);
console.log(ahmed.age);

// Challenge
// "ahmed is a 46-year old student, and he has a driver's license"
console.log(ahmed.getSummary());
*/

///////////////////////////////////////

/*

///////////////////////////////////////
// Iteration: The for Loop

// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');
// console.log('Lifting weights repetition 9 🏋️‍♀️');
// console.log('Lifting weights repetition 10 🏋️‍♀️');

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}


///////////////////////////////////////
// Looping Arrays, Breaking and Continuing
const ahmed = [
  'ahmed',
  'Schmedtmann',
  2037 - 2002,
  'student',
  ['Maher', 'Anas', 'Moaz'],
  true
];
const types = [];

// console.log(ahmed[0])
// console.log(ahmed[1])
// ...
// console.log(ahmed[4])
// ahmed[5] does NOT exist

for (let i = 0; i < ahmed.length; i++) {
  // Reading from ahmed array
  console.log(ahmed[i], typeof ahmed[i]);

  // Filling types array
  // types[i] = typeof ahmed[i];
  types.push(typeof ahmed[i]);
}

console.log(types);

const years = [2002, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

// continue and break
console.log('--- ONLY STRINGS ---')
for (let i = 0; i < ahmed.length; i++) {
  if (typeof ahmed[i] !== 'string') continue;

  console.log(ahmed[i], typeof ahmed[i]);
}

console.log('--- BREAK WITH NUMBER ---')
for (let i = 0; i < ahmed.length; i++) {
  if (typeof ahmed[i] === 'number') break;

  console.log(ahmed[i], typeof ahmed[i]);
}


///////////////////////////////////////
// Looping Backwards and Loops in Loops
const ahmed = [
  'ahmed',
  'Schmedtmann',
  2037 - 2002,
  'student',
  ['Maher', 'Anas', 'Moaz'],
  true
];

// 0, 1, ..., 4
// 4, 3, ..., 0

for (let i = ahmed.length - 1; i >= 0; i--) {
  console.log(i, ahmed[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`-------- Starting exercise ${exercise}`);

  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
  }
}


///////////////////////////////////////
// The while Loop
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

let rep = 1;
while (rep <= 10) {
  // console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('Loop is about to end...');
}
*/

///////////////////////////////////////
