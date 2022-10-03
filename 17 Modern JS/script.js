// Importing module
// import { addToCart, totalPrice as price, totalQuantity } from './shoppingCart.js';

// addToCart('bread', 12)

// console.log(price, totalQuantity);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import all

console.log('Importing module');

import * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('bread', 5);
ShoppingCart.addToCart('pizza', 2);
ShoppingCart.addToCart('apples', 3);

console.log(ShoppingCart.cart);

// import default
// import add from './shoppingCart.js'

// add('pizza', 2)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Top-level await (without async function) - but thi will block rest of code

// console.log('start')
// const res = await fetch('https://jsonplaceholder.typicode.com/posts')
// const data = await res.json()
// console.log(data)
// console.log('end')
/*
console.log('start');
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //   console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

getLastPost();
console.log('end');

const lastPost = getLastPost();
console.log(lastPost); // promise (async function will always return promise)

const dataOfLast = await lastPost;
console.log(dataOfLast);
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Module pattern
/*
const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} Order from supplier`);
  };

  return {
   addToCart,
   cart,
   totalPrice,
   totalQuantity
  }
})();

ShoppingCart2.addToCart('apple', 4)
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import from lodash library

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

// copy deeply nested object using javascript
const stateClone = Object.assign({}, state);
console.log(stateClone);

// copy deeply nested object using lodash function cloneDeep

const stateCloneDeep = cloneDeep(state);
console.log(stateCloneDeep);

state.user.loggedIn = false; // some change in object

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parcel bundling modules

// code for dont reload the page
// if (module.hot) {
//   module.hot.accept();
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuring Babel and Polyfilling

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

// polyfilling
import 'core-js/stable'

// import 'core-js/stable/array/find' // for only one method

// polyfilling async funcitons
import 'regenerator-runtime/runtime'
