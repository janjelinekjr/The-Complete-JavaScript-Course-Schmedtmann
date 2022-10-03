'use strict';

/*
function calAge(birthYear) {
   const age = 2037 - birthYear
   
   function printAge() {
      const output = `${fisrtName}, you are ${age}, born in ${birthYear}`
   }
   printAge()

   return age
}

const fisrtName = 'Jonas'
calAge(1991)
*/

///////////////////////////////////////////////////////////////////////////////
// this keyword
/*
console.log(this);

const calAge = function (birthYear) {
   console.log(2037 - birthYear)
   console.log(this); // undefined
}

calAge(1991)

const calAgeArrow = birthYear => {
   console.log(2037 - birthYear)
   console.log(this); // window
}

calAgeArrow(1995)

const jonas = {
   year: 1991,
   calAge: function() {
      console.log(this); // object jonas (object who calls the metod)
      console.log(2037 - this.year);
   }
}
jonas.calAge()

const matilda = {
   year: 2017,
}

matilda.calAge = jonas.calAge
matilda.calAge()
*/
/*
const jonas = {
   firstName: 'Jonas',
   year: 1991,
   calAge: function() {
      console.log(this);
      console.log(2037 - this.year);
   },
   greet: () => console.log(`hey ${this.firstName}`), // dont use arrow function as a method due to this keyword problem, but it will need to be used as a function inside method, bcs this keyword in arrow f will inherit from parent
}

jonas.greet()
*/
// argument keyword


// primitive types
let lastName = 'Williams'
let oldLastName = lastName
lastName = 'Davis'
console.log(lastName, oldLastName)


// reference types
const jessica = {
   firstName: 'Jessica',
   lastName: 'Williams',
   age: 27,
}

const merriedJessica = jessica
merriedJessica.lastName = 'Davis'

console.log('Before', jessica);
console.log('after', merriedJessica);


// copying objects
const jessica2 = {
   firstName: 'Jessica',
   lastName: 'Williams',
   age: 27,
}

const jessicaCopy = Object.assign({}, jessica2) // shallow copy (only in fisrt level)
console.log('Before', jessica2);
console.log('after', merriedJessica);