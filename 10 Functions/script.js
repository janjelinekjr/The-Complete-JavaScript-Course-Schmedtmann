'use strict';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Default parameters
/*
const bookings = []

const createBooking = function(flightNum, numPax = 1, price = 199 * numPax){
   const booking = {
      flightNum,
      numPax,
      price
   }
   console.log(booking);
   bookings.push(booking)
}

createBooking('LH123')
createBooking('LH123', 2)
createBooking('LH123', undefined, 1000)
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
/*
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function(flightNum, pax) {
   flightNum = 'LH999'
   pax.name = 'Mr. ' + pax.name

   if(pax.passport === 24739479284){
      alert('Checked in')
   } else {
      alert('Wrong passport!')
   }
}

// checkIn(flight, jonas)
// console.log(flight);
// console.log(jonas);

const newPassport = function(person) {
   person.passport = Math.trunc(Math.random() * 1000000000)
}

newPassport(jonas)
checkIn(flight, jonas)
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Higher function, function as argument
/*
const oneWord = function(str) {
   return str.replaceAll(' ', '').toLowerCase()
}

const upperFirstWord = function(str){
   const [first, ...others] = str.split(' ')
   return [first.toUpperCase(), ...others].join(' ')
}


// Higher-order function
const transformer = function(str, fn) {
   console.log(`original string: ${str}`);
   console.log(`Transformer string: ${fn(str)}`);

   console.log(`Transformed by: ${fn.name}`);
}

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions returning functions

// const greet = function(greeting){
//    return function(name){
//       console.log(`${greeting} ${name}`);
//    }
// }

// const greet = (greeting) => {
//    return (name) => console.log(`${greeting} ${name}`);
// }

//or
/*
const greet = greeting => name => console.log(`${greeting} ${name}`);


const greeterHey = greet('Hey')
greeterHey('Jonas')
greeterHey('Jan')

greet('Hello')('Jonas')
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// call() and apply() methods
/*
const lufthansa = {
   airline: 'Lufhtansa',
   iataCode: 'LH',
   booking: [],
   book(flightNum, paxName) {
      console.log(`${paxName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
      this.booking.push({flight: `${this.iataCode}${flightNum}`, paxName})
   },
}

lufthansa.book(239, 'Jan Jelinek')
lufthansa.book(635, 'John Smith')
console.log(lufthansa);

const eurowings = {
   airline: 'Eurowings',
   iataCode: 'EW',
   booking: [],
}

const book = lufthansa.book
// book(23, 'Sarah Williams') // doesnt work bcs this keyword in normal function will be undefined

book.call(eurowings, 23, 'Sarah Williams')

book.call(lufthansa, 239, 'Mary Cooper')
console.log(lufthansa);
console.log(eurowings);

const swiss = {
   airline: 'Swiss Air Lines',
   iataCode: 'LX',
   booking: [],
}

book.call(swiss, 583, 'Mary Cooper')
console.log(swiss);

// apply() method
const flightData = [583, 'George Cooper']
book.apply(swiss, flightData)
// or book.call(swiss, ...flightData)
console.log(swiss);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// bind() method --- bind() method gives a brand new specifik function based on previous

const bookEW = book.bind(eurowings)
bookEW(23, 'Steven Williams')

const bookEW23 = book.bind(eurowings, 23) // flightNum 23 is here preset
bookEW23('Jonas Randall')

// with eventListener
lufthansa.planes = 300
lufthansa.buyPlane = function(){
   console.log(this); // this keyword in evenListener points to element (here the button)

   this.planes++
   console.log(this.planes);
}

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane)
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))

// Partial application
const addTax = (rate, value) => value + value * rate
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23) // now 0.23 tax is preset
// addVAT = value => value + value * 0.23

console.log(addVAT(200))

// same exmaple with function returning other function
const addTaxRate = function(rate){
   return function(value){
      return value + value * rate
   }
}

const addVAT2 = addTaxRate(0.23)
console.log(addVAT2(200));
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challange #1
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNowAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'object') {
    if (type === 'object') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNowAnswer.bind(poll));

  poll.displayResults.call({answers: [5, 2, 3]}, 'string')
  poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, 'string')
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IIFE function
/*
const runOnce = function () {
  console.log('This will never run again');
};

// runOnce()


  
//IIFE

(function () {
    console.log('This will never run again');
})();


(() => console.log('This will also never run again'))();
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Closures
/*
const secureBooking = function() {
   let paxCount = 0

   return function() {
      paxCount++
      console.log(`${paxCount} passengers`);
   }
}

const booker = secureBooking() // will still have access to variables nad scope where this function was created, even when parent function will return

booker()
booker()
booker()

console.dir(booker);
*/

// Exmaple 1
/*
let f

const g = function() {
   const a = 23
   f = function(){
      console.log(a * 2);
   }
}

const h = function(){
   const b = 777
   f = function(){
      console.log(b * 2);
   }
}

g()
f()
// re-assigning f function
h()
f()
*/
// Exmaple 2
/*
const boardPax = function(n, wait) {
   const perGroup = n / 3

   setTimeout(function(){
      console.log(`We are now boarding all ${n} paxs.`);
      console.log(`There are 3 groups, each with ${perGroup} paxs.`);
   }, wait * 1000)

   console.log(`Will start boarding in ${wait} seconds`);
}

boardPax(180, 3)
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challange #2
/*
(function(){
   const header = document.querySelector('h1')
   header.style.color = 'red'

   document.querySelector('body').addEventListener('click', function(){
      header.style.color = 'blue'
   })
})()
*/

