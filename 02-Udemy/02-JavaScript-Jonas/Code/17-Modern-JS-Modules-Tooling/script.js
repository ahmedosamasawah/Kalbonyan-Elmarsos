///////////////////////////////////////
// Exporting and Importing in ES6 Modules:-

// Importing module:
/*
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
addToCart('bread', 5);
console.log(price, tq);

console.log('Importing module');
console.log(shippingCost);

import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);

import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
console.log(price);
*/

/*
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);
/*


///////////////////////////////////////
// Top-Level Await (ES2022)
/*
console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('Something');
*/

/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost); // returns a promise

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

///////////////////////////////////////
// The Module Pattern
/*
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };


  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); // returns undefined
*/

///////////////////////////////////////
// CommonJS Modules
// Export
/*
export.addTocart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
  );
};

// Import
const { addTocart } = require('./shoppingCart.js');
*/

///////////////////////////////////////
// Introduction to NPM:-
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es';
// import cloneDeep from 'lodash'; // not working!

const state = {
  cart: [
    { product: 'milk', quantity: '3' },
    { product: 'water', quantity: '2' },
  ],

  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(state, stateClone, stateDeepClone);

// module.hot && module.hot.accept();
// if (module.hot) module.hot.accept();

class Person {
  #greeting = 'Hello';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const ahmed = new Person('ahmed');

console.log('Ahmed' ?? null);

// all of them not working.
/*
// import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';


import 'regenerator-runtime/runtime';
*/
