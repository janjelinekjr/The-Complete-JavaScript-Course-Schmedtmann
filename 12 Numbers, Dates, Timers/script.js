'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-08-01T17:01:17.194Z',
    '2022-08-03T23:36:17.929Z',
    '2022-08-04T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-08-03T18:49:59.371Z',
    '2022-08-04T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) {
    return 'Today';
  } else if (daysPassed === 1) {
    return 'Yesterday';
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth()}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCur(
    Math.abs(out),
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // each call, print remaining time to user interface
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 sec, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    // decrease 1s
    time--;
  };

  // set tinmer to 5 minutes
  let time = 120;
  // call the timer every seconds
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// // fake always login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth()}`.padStart(2, 0);
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${month}/${year}/${hour}:${min}`;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //create current date and time
    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // or 'long' or '2-digit'
      year: 'numeric',
      // weekday: 'long', // or 'short' or 'narrow'
    };

    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth()}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}/${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if(timer) {
      clearInterval(timer)
    }
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer)
    timer = startLogoutTimer()
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // reset timer
  clearInterval(timer)
  timer = startLogoutTimer()

});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';


});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// Base 10 = 0 - 10
// Binary base 2 = 0, 1

console.log(0.1 + 0.2); // "error of javascript"
console.log(0.1 + 0.2 === 0.3); // false which is error

// convert number
// Number() or +
console.log(Number('23'));
console.log(+'23');

// Parasing number
// parseInt() - converting to number and omit symbols
console.log(Number.parseInt('30px')); // will try to omit symbols
console.log(Number.parseInt('20£'));
console.log(Number.parseInt('20£', 10)); // Base 10
console.log(Number.parseInt('20£', 2)); // Binary 2

// parseFloat() - converting to number and omit symbols and decimals
console.log(Number.parseFloat('2.5rem')); // able to read decimals

// isNaN() - bad way to chcek if a value is not a number
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20N')); // true
console.log(Number.isNaN(23 / 0)); // infinity so false

// isFinite() - checking if value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

// isInteger() check if a value is integer (cele cislo)
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0)); // 23.0 === 23
console.log(Number.isInteger(23 / 0));


// Math and rounding

// squer root
console.log(Math.sqrt(25));
console.log(25 ** (1/2)); // same
console.log(8 ** 1/3); // cubic root 

// Max Min
console.log(Math.max(5, 3, 6, 45, 21, 34));
console.log(Math.max(5, 3, 6, '45', 21, 34)); // work as well
console.log(Math.min(5, 3, 6, 45, 21, 34));

// PI
console.log(Math.PI);
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Random
console.log(Math.random()); // 0 to 1
console.log(Math.random() * 6); // 0 to 5
console.log(Math.trunc(Math.random() * 6)); // without decimals 0 - 5
console.log(Math.trunc(Math.random() * 6) + 1); // without decimals 1 - 6

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min
// 0...1 -> 0..(max -min) -> min...max
console.log(randomInt(10, 20));


// Rounding integers
console.log(Math.trunc(23.5655644)); // removes any decimal parts without rounding

console.log(Math.round(23.6655644)); // round up
console.log(Math.round(23.2655644)); // round down

console.log(Math.ceil(23.5655644)); // always rounded up
console.log(Math.ceil(23.2655644));


console.log(Math.floor(23.5655644)); // always rounded down
console.log(Math.floor(23.2655644));
console.log(Math.floor('23.26')); // work as well


console.log(Math.trunc(-23.2655644));
console.log(Math.floor(-23.2655644)); // beetter to use floor with negativ value

// Rounding decimals
console.log((2.7).toFixed(0)); // toFixed(how many decimals we want), but return is as string
console.log((2.7).toFixed(3));
console.log((2.732).toFixed(2));
console.log(+(2.73456).toFixed(2)); // converted to number

// Remainder operator
console.log(5 % 2); // result is 1 bcs 5 = 2 * 2 + 1
console.log(5 / 2);

console.log(8 % 3); // result 2 bcs 8 = 2 * 3 + 2
console.log(8 / 3);  

// even or odd numbers
console.log(6 % 2); // reminder 0 so even
console.log(6 / 2);

const isEven = n => n % 2 === 0

console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(231));

// somthing happen every Nth times
labelBalance.addEventListener('click', function(){
  [...document.querySelectorAll('.movements__row')].forEach(function(row, i){
    // 0, 2, 4, 6
    if(i % 2 === 0) {
      row.style.backgroundColor = 'orangered'
    }
    // 0, 3, 6, 9
    if(i % 3 === 0){
      row.style.backgroundColor = 'blue'
    }
  })

})



// Numeric separators _
const hardToRead = 287460000000 // 287,460,000,000
const diameter = 287_460_000_000 // result is stil 287460000000

const transferFree = 15_00
const transferFreeSame = 1_500

// converting string to a number
console.log(Number('230000')); // work fine
console.log(Number('230_000')); // NaN



// BigInt
console.log(2 ** 53 - 1); // biggest number that Js can safely represent 
console.log(Number.MAX_SAFE_INTEGER);

console.log(2867348777777777772999992803497802375023750); // inable to represent
console.log(2867348777777777772999992803497802375023750n); // now can
console.log(BigInt(28673487777777777729999));

// we can still do operations with bigint
console.log(100000n + 100000n);

// but cannot mix bigint with other types (normal number)
const huge = 233427894674598234n
const num = 23
// console.log( huge * num); // doesnt work
console.log(huge * BigInt(num)); // work

// this still work
console.log(20n > 15);
console.log(20n === 20); // doesnt work due to type
console.log(typeof 20n);
console.log(20n == 20); // work

// Dates and time

// create a date
const now = new Date()
console.log(now);

// parse
console.log(new Date('Aug 05 2022 10:13:49'));
console.log(new Date('December 24, 2015'));
console.log(new Date(0));

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // rr/mm/dd/hh/mm/ss

// working with dates
const future = new Date(2037, 10, 19, 15, 23, 5)
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); // day of the month
console.log(future.getDay()); // day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

// convert to international standard
console.log(future.toISOString());

console.log(future.getTime()); // milisecond since Thu Jan 01 1970 01:00:00
console.log(new Date(2142253385000)); // convert these milicseconds to date

console.log(Date.now());

future.setFullYear(2040)
console.log(future);
*/
/*
const future = new Date(2037, 10, 19, 15, 23, 5)
console.log(Number(future));
console.log(+future);

const daysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 *24)

const days1 = daysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4))
console.log(days1);
*/

// Fromating date for diferent countries and languages / Internationalizing Dates (Intl) API
/*
// Experimenting with API
const now1 = new Date();

// object for options to show
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric', // or 'long' or '2-digit'
  year: 'numeric',
  weekday: 'long', // or 'short' or 'narrow'
};

// To get data from users browser about lang and country
const locale = navigator.language;
console.log(locale);

const experiment = new Intl.DateTimeFormat('en-US').format(now1); // without time
const experiment1 = new Intl.DateTimeFormat('en-US', options).format(now1); // with all
const experiment2 = new Intl.DateTimeFormat(locale, options).format(now1); // with local date and time format

console.log(experiment);
console.log(experiment1);
console.log(experiment2);
*/

// Fromating numbers for diferent countries and languages / Internationalizing Numbers (Intl) API
/*
const num = 3889483.23

const options = {
  style: 'unit', // 'percent' or 'currency'
  unit: 'mile-per-hour', // 'celsius' etc..
  currency: 'EUR',
  // useGrouping: false
}

const US = new Intl.NumberFormat('en-US').format(num);
console.log(US);

const DE = new Intl.NumberFormat('de-DE').format(num);
console.log(DE);

const CS = new Intl.NumberFormat('cs-CZ').format(num);
console.log(CS);

const withOptions = new Intl.NumberFormat('cs-CZ', options).format(num);
console.log(withOptions);
*/

// Timers setTimout setInterval

// setTimeout() - in miliseconds 1000 = 1s

// setTimeout(function(){
//   return console.log('Here is some pizza');
// }, 3000)
/*
const ingredients = ['olives', 'spinach']

setTimeout(() => console.log('Here is some pizza'), 3000)
// using parameters as third and futher arguments
// setTimeout((ing1, ing2) => console.log(`Here is some pizza with ${ing1} and ${ing2}`), 3000, 'olives', 'spinach')
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is some pizza with ${ing1} and ${ing2}`), 3000, ...ingredients)
console.log('Waiting...');

// terminate timeout
if(ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer)
}

// setInterval()
setInterval(function(){
  const now = new Date()
  console.log(now);
}, 3000)
*/
