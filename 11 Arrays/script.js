'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Arrays methods

// SLICE slice() (doesnt change original array and create new one)
/*
let arr = ['a', 'b', 'c', 'd', 'e']
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // start 2 end 4 = length of array wuill be 4-2
console.log(arr.slice(-2));
console.log(arr.slice(-1)); // last one
console.log(arr.slice(1, -2)); // start at 1 and omit last 2
console.log(arr.slice()); // shallow copy of array
console.log([...arr]); // shallow copy of array as well
console.log(arr); // still same

// SPLICE splice() (change/mutated original array)
// console.log(arr.splice(2));
arr.splice(-1)
console.log(arr); // original is mutated
arr.splice(1, 2) // will start at position 1 and wil remove 2 elements
console.log(arr);
*/
/*
// Reverse (mutate oroginal array) reverse()
let arr = ['a', 'b', 'c', 'd', 'e']
const arr2 = ['j', 'i', 'h', 'g', 'f']

console.log(arr2.reverse());
console.log(arr2); // is mutated

// CONCAT concat()
const letters = arr.concat(arr2)
console.log(letters);
console.log([...arr, ...arr2]); // same like this

// JOIN join()
console.log(letters.join('-'));
*/
/*
// AT at()
const arr = [23, 11, 64]

console.log(arr[0]);
console.log(arr.at(0)); // same like above
console.log(arr.at(-1)); // last element

// also work on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// forEach loop

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of loop
for (const move of movements) {
  if(move > 0){
    console.log(`You deposited ${move}`);
  } else {
    console.log(`Youwithdrew ${Math.abs(move)}`);
  }
}

// when we need index
for (const [i, move] of movements.entries()) {
  if(move > 0){
    console.log(`Movement ${i + 1}: You deposited ${move}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
  }
}

console.log('-----------------------------------------------------------');

// forEach loop
movements.forEach(function(move){
  if(move > 0){
    console.log(`You deposited ${move}`);
  } else {
    console.log(`Youwithdrew ${Math.abs(move)}`);
  }
})

// when we need index (order of function's parameters are 1. element, 2. index, 3. array)
movements.forEach(function(move, i, arr){
  if(move > 0){
    console.log(`Movement ${i + 1}: You deposited ${move}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
  }
})

*/

// forEach loop Maps and Sets
/*
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// (order of function's parameters are 1. value, 2. key, 3. map)
currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
})

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])

console.log(currenciesUnique);

currenciesUnique.forEach(function(value, _, map){
  console.log(`${value}: ${value}`);
})
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// inserting accounts movements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // Sort movements
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// calculation and dispaly balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${account.balance}€`;
};

// calculation and dispaly summary
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// computing user names
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name.at(0);
      })
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

// Event handlers Login
let currentAccount;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '100';

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // updateUI function
    updateUI(currentAccount);
  }
});

// request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);
    // update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// Event handlers CLose account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // delet account
    accounts.splice(index, 1);
    // hide UI
    containerApp.style.opacity = '0';
  }

  // clear input fields
  inputCloseUsername.value = inputLoginPin.value = '';
  inputClosePin.blur();
});

// Event handlers Sort movements
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// Transfering
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  // console.log(amount, transferTo);

  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge #1
/*
const dogsJulia = [3, 5, 2, 12, 7]
const dogsKate = [4, 1, 15, 8, 3]

const checkDogs = function(arrJulia, arrKate){
  const juliaDogsCorrected = arrJulia.slice(1, arrJulia.length - 2)
  const allDogs = [...juliaDogsCorrected, ...arrKate]

  allDogs.forEach(function(dogAge, i){
    console.log(dogAge >= 3 ? `Dog number ${i + 1} is an adult, and is ${dogAge} years old` : `Dog number ${i + 1} is still a puppy 🐶`);
  })
}

checkDogs(dogsJulia, dogsKate)
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAP method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1

// const movementsUSD = movements.map(function(mov){
//   return mov * eurToUsd
// })

// arrow function
const movementsUSD = movements.map(mov => mov * eurToUsd)

console.log(movements);
console.log(movementsUSD);

const movementsDescript = movements.map((move, i, arr) => {
  if(move > 0){
    return `Movement ${i + 1}: You deposited ${move}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(move)}`;
  }
})

console.log(movementsDescript);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Filter method

const deposit = movements.filter(function(mov){
  return mov > 0
})

console.log(movements); // original all values
console.log(deposit); // filtered values > 0

const withdrawals = movements.filter(function(mov){
  return mov < 0
})

console.log(movements);
console.log(withdrawals);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reduce method

const balance = movements.reduce(function(accumulator, current, index, array){
  return accumulator + current
}, 0) // 0 here is starter value of accumulator

console.log(balance);

// Maximum value of the array with reduce
const max = movements.reduce(function(acc, mov){
  if(acc > mov){
    return acc
  } else {
    return mov
  }
}, movements[0])

console.log(max);
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge #2
/*
const dogsJulia = [5, 2, 4, 1, 15, 8, 3]
const dogsKate = [16, 6, 10, 5, 6, 1, 4]
const allDogs = [...dogsJulia, ...dogsKate]

const calcAverageHumanAge = function(arr){
  const humanAge = arr.map(age => {
    if(age <= 2){
      return age * 2
    } else if(age > 2){
      return 16 + age * 4
    }
  })
  console.log(humanAge);
  
  const filteredAges = humanAge.filter(age => age >= 18)
  console.log(filteredAges);

  const avgAges = filteredAges.reduce((acc, age) => acc + age / filteredAges.length, 0)
  console.log(avgAges);
  
  return avgAges
  
}

calcAverageHumanAge(dogsJulia)
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Chaining methods
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1

// Pipline
const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0)

console.log(totalDepositsUSD);
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge #3
/*
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// const calcAverageHumanAge = function(arr){
//   const humanAge = arr.map(age => {
//     if(age <= 2){
//       return age * 2
//     } else if(age > 2){
//       return 16 + age * 4
//     }
//   })
//   console.log(humanAge);
  
//   const filteredAges = humanAge.filter(age => age >= 18)
//   console.log(filteredAges);

//   const avgAges = filteredAges.reduce((acc, age) => acc + age / filteredAges.length, 0)
//   console.log(avgAges);
  
//   return avgAges
// }

// shorter version by arrow functions and chaining
const calcAverageHumanAge = arr => arr.map(age => age <= 2 ? age * 2 : 16 + age * 4).filter(age => age >= 18).reduce((acc, age, i, arr) => acc + age / arr.length, 0)

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Find method (first find element will be returned)
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(function(mov){
  return mov < 0
})

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// some and every methods

// some()
// equality
console.log(movements.includes(-130));

// condition
const anyDeposites = movements.some(mov => mov > 1500)
console.log(anyDeposites);

// every()
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callcback
const deposit = mov => mov > 0
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// flat flatMap methods


// flat() - will remove nested elements and join them together
const arr = [[1, 2, 3], [4, 5, 6], 7, 8]

console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8]
console.log(arrDeep.flat()); // doesnt work (default is 1 level of dept)
console.log(arrDeep.flat(2)); // 2 levels deep

const accountMovements = accounts.map(acc => acc.movements)
const allMovements = accountMovements.flat()
console.log(allMovements);
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance);

// or we can use chaining
const overalBalance2 = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance2);

// flatMap() - combination of map() and flat(), but it goes only 1 level deep and cannot be changed
const overalBalance3 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance3);
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sorting method (mutate original array)
/*
// sorting strings
const owners = ['Jonas', 'Yach', 'Adam', 'Marta']
console.log(owners.sort());

// sorting numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);
console.log(movements.sort()); // sort numbers as they were stirngs
// we can fix it
// how it works: when return < 0 then A, B (keep order)
//               when return > 0 then B, A (switch order)

// Ascending sort
movements.sort(function(a, b){
  if(a > b){
    return 1 // then sort will be B, A
  } else if(b > a){
    return -1 // sort will be A, B
  }
})

// shorter same version
movements.sort((a, b) => a - b)

// Descending sort
movements.sort(function(a, b){
  if(a > b){
    return -1 
  } else if(b > a){
    return 1 
  }
})

// shorter same version
movements.sort((a, b) => b - a)


console.log(movements);
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fill method
/*
const x = new Array(7);
console.log(x); // empty array with lenght 7

// we can use only fill method on this array

// x.fill(1) // fill the array with 1 over all lenght
console.log(x);

x.fill(1, 3, 5); // will fill to the array 1 and start at index 3 and finish at index 5
console.log(x);

const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 2, 6) // will mutate oririganl array
console.log(arr);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// From method
const y = Array.from({length: 7}, () => 1) // will create array with lenght 7 and all elements 1
console.log(y);

const z = Array.from({length: 7}, (current, index) => index + 1)
console.log(z);


labelBalance.addEventListener('click', function(e){
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')))
  console.log(movementsUI);

})
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Array Methods Practice
/*
// ex. 1

// const bankDepositSum = accounts.map(acc => acc.movements).flat()
// const bankDepositSum = accounts.flatMap(acc => acc.movements) // same as above
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0)
console.log(bankDepositSum)

// ex. 2

// const numDeposit1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length
const numDeposit1000 = accounts.flatMap(acc => acc.movements).reduce((count, curr) => curr >= 1000 ? count + 1 : count, 0)
console.log(numDeposit1000);

// ex. 3

const sums = accounts.flatMap(acc => acc.movements).reduce((sums, curr) => {
  curr > 0 ? sums.deposits += curr : sums.withdrawals += curr
  return sums
}, {deposits: 0, withdrawals: 0})

console.log(sums);

const {deposits, withdrawals} = accounts.flatMap(acc => acc.movements).reduce((sums, curr) => {
  curr > 0 ? sums.deposits += curr : sums.withdrawals += curr
  return sums
}, {deposits: 0, withdrawals: 0})

console.log(deposits, withdrawals);

// ex. 4

// convert - this is a nice title -> This Is a Nice Title
const convertTitleCase = function(title){
  const capitalize = str => str[0].toUpperCase() + str.slice(1)
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with']

  const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ')
  return capitalize(titleCase)
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('and here is another example with THIS title'));
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge #4
/*
// 1
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];


dogs.forEach(function(dog, i){

  dog.recomendedFood = Math.trunc(dog.weight ** 0.75 * 28)

  dog.curFood >= dog.recomendedFood * 0.9 && dog.curFood <= dog.recomendedFood * 1.1 ? dog.eatingWell = true : dog.eatingWell = false
  
})

console.log(dogs);

// 2
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'))
const sarahsDogEating = `Sarah's dog eat ${sarahsDog.curFood > sarahsDog.recomendedFood ? 'too much' : 'too little'}.`
console.log(sarahsDogEating);

// 3
// const ownersEatTooMuch = []
// const ownersEatTooLittle = []

// dogs.forEach(function(dog, i){
//   if(dog.curFood > dog.recomendedFood) {
//     ownersEatTooMuch.push(dog.owners.join(' and '))
//   } else if(dog.curFood < dog.recomendedFood){
//     ownersEatTooLittle.push(dog.owners.join(' and '))
//   }
// })

// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);

//or
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recomendedFood).map(dog => dog.owners).flat()
const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recomendedFood).map(dog => dog.owners).flat()
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat too much!`);;
console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little!`);;

// 5
console.log(dogs.some(dog => dog.curFood === dog.recomendedFood));

// 6
console.log(dogs.some(dog => dog.eatingWell === true));

// 7

console.log(dogs.filter(dog => dog.eatingWell));

// 8
const dogsSorted = dogs.slice().sort((a, b) => a.recomendedFood - b.recomendedFood)
console.log(dogsSorted);
*/




