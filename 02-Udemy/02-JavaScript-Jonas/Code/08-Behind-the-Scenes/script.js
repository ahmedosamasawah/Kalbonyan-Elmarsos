'use strict';

/*
///////////////////////////////////////
function calcAge(birthYear) {
  const age = 2023 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Zead';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
  }
  printAge();
  return age;
}
calcAge(2002);
///////////////////////////////////////

///////////////////////////////////////
console.log(me);
var me = 'Ahmed';
let job = 'Student';
const year = 2002;


console.log(addDecl(2, 3));
console.log(addArrow);

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

console.log(undefined);
if (!numProducts) deleteShoppingCart();

var numProducts = 20;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 0;
let y = 1;
const z = 2;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
///////////////////////////////////////

///////////////////////////////////////
console.log(this);

const calcAge = function (birthYear) {
  console.log(2023 - birthYear);
  console.log(this);
};
calcAge(2002);

const calcAgeArrow = birthYear => {
  console.log(2023 - birthYear);
  console.log(this);
};
calcAgeArrow(2002);

const Ahmed = {
  year: 2002,
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year);
  },
};
Ahmed.calcAge();

const Fatema = {
  year: 2019,
};

Fatema.calcAge = Ahmed.calcAge;
Fatema.calcAge();

const f = Ahmed.calcAge;
f();
///////////////////////////////////////

///////////////////////////////////////
const Ahmed = {
  firstName: 'Ahmed',
  year: 2002,
  calcAge: function () {
    console.log(2023 - this.year);

    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
Ahmed.greet();
Ahmed.calcAge();

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);
///////////////////////////////////////

///////////////////////////////////////
let age = 20;
let oldAge = age;
age = 21;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Ahmed',
  age: 20,
};
const friend = me;
friend.age = 23;
console.log('Friend:', friend);
console.log('Me:', me);
///////////////////////////////////////

///////////////////////////////////////
let lastName = 'Sawah';
let oldLastName = lastName;
lastName = 'Rokh';
console.log(lastName, oldLastName);

const Fatota = {
  firstName: 'Fatota',
  lastName: 'Sawah',
  age: 23,
};
const marriedFatota = Fatota;
marriedFatota.lastName = 'Rokh';
console.log('Before marriage:', Fatota);
console.log('After marriage: ', marriedFatota);

const Fatota2 = {
  firstName: 'Fatota',
  lastName: 'Sawah',
  age: 23,
  family: ['Mona', 'Amna'],
};

const FatotaCopy = Object.assign({}, Fatota2);
FatotaCopy.lastName = 'Rokh';

FatotaCopy.family.push('Ahmed');
FatotaCopy.family.push('Zead');

console.log('Before marriage:', Fatota2);
console.log('After marriage: ', FatotaCopy);
///////////////////////////////////////
*/
