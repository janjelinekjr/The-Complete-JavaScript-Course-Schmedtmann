'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 enhanced object literals
  openingHours,

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // New syntax of writting methods
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient);
    console.log(otherIngredient);
  },
};

/*
restaurant.orderDelivery({time: '22:30', address: 'Via del Sole, 21', mainIndex: 2, starterIndex: 2})


////////////////////////////////////////////////////////////////////////////////////
// Destructuring Objects

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// renaming new variables
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// default values
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

// Mutating variables

let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };
({a, b} = obj) // we need ()
console.log(a, b);

// Nested objects
const {fri} = openingHours
console.log(fri);

const {fri: {open, close}} = openingHours
console.log(open, close);
*/
////////////////////////////////////////////////////////////////////////////////////
// Destructuring Arrays
/*
let [first, second] = restaurant.categories
let [first1, , third] = restaurant.categories
console.log(first, second);
console.log(first1, third);

// switching variables 
[first, second] = [second, first]

console.log(first, second);


// recieve 2 return values from a function
const [starter, main] = restaurant.order(2, 0)
console.log(starter, main);


// nested array
const nested = [2, 4, [5, 6]]
// const [i, , j] = nested // when we need 0 index and 2 index
// console.log(i, j);

// destructuriong inside of distructuring
const [i, , [j, k]] = nested
console.log(i, j, k); // 3 separate variables

// dwfault values
// const [p, q, r] = [8, 9]
// console.log(p, q, r) // r is undefined
// but we can set default values
const [p=1, q=1, r=1] = [8, 9]
console.log(p, q, r) // now r is 1
*/

////////////////////////////////////////////////////////////////////////////////////
// Spread operator ... (unpack an array) and it is on right side of =
/*
const arr = [7, 8, 9]
const newArr = [1, 2, ...arr]
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci']
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu] // shallow coopy of array

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
console.log(menu);

// spread operator works on all iterables
// Iterables = arrays, string, maps, sets, but not objects
const str = 'Jonas'
const letters = [...str, '', 'S.']
console.log(letters);

// use in function as argument
const ingredients = [prompt('Let\'s make pasta! Ingerient 1?'), prompt('Ingerient 2?'), prompt('Ingerient 3?')]
console.log(ingredients);

restaurant.orderPasta(...ingredients)
*/
/*
// Objects
const newRestaurant = {...restaurant, founder: 'Guiseppe'}
console.log(newRestaurant);

// Shallow copy
const restaurantCopy = {...restaurant}
restaurantCopy.name = "Ristirante Roma"
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

////////////////////////////////////////////////////////////////////////////////////
// Rest Pattern (pack to an array) and it is on the left side of =
/*
// Rest bcs it is on the left side of =
const [a, b, ...others] = [1, 2, 3, 4, 5]
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood);

// Objects
const {sat, ...weekDays} = restaurant.openingHours
console.log(weekDays);

// in functions (rest parameters)
const add = function(...numbers) {
  let sum = 0
  for(let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }
  console.log(sum);
}

add(2, 3)
add(5, 3, 7, 2)
add(2, 8, 5, 6, 3, 2, 1, 9)

const x = [23, 5, 7]
add(...x)

const hours = function(...min){
  let sum = 0
  for(let i = 0; i < min.length; i++){
    sum += min[i] / 60
  }
  console.log(sum);
}

const restMin = [16,4,12,15,7,7,16,10,15,13,14,13,10,10,17,22,22,15,17]
hours(...restMin)



restaurant.orderPizza('ketchup', 'cheese', 'onion', 'spinach')
*/

////////////////////////////////////////////////////////////////////////////////////
// Short Circuititng && ||
/*
// can use end return any data type
console.log(3 || 'Jonas'); // will return first value if it is truthy
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

const guest = restaurant.numGuests || 10
console.log(guest);

console.log('------ AND ------')

console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'Jonas');

// practical ex.
if(restaurant.orderPizza){
  restaurant.orderPizza('salam', 'spinach')
}

restaurant.orderPizza && restaurant.orderPizza('salam', 'spinach')
*/

////////////////////////////////////////////////////////////////////////////////////
// Nulish operator ??
/*
restaurant.numGuests = 0
const guest = restaurant.numGuests || 10
console.log(guest); // wil return 10 instead of 0

// nullish = null nad undefined (not 0 or '')
const guestCorrect = restaurant.numGuests ?? 10
console.log(guestCorrect);
*/

////////////////////////////////////////////////////////////////////////////////////
// Or, Nullish, AND assigement operator ||=, ??=,
/*
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
}

const rest2 = {
  name: 'La Pizza',
  owner: 'G. Rossi',
}

// rest2.numGuests = rest2.numGuests || 10
// rest1.numGuests = rest1.numGuests || 10

// rest1.numGuests ||= 10 // problem when value is 0
// rest2.numGuests ||= 10

// solution nullish
rest1.numGuests ??= 10 
rest2.numGuests ??= 10

// rest1.owner = rest1.owner && '<annonymous>'
// rest2.owner = rest2.owner && '<annonymous>'

rest1.owner &&= '<annonymous>'
rest2.owner &&= '<annonymous>'

console.log(rest1);
console.log(rest2);
*/

////////////////////////////////////////////////////////////////////////////////////
// Challange #1
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1.
// const [players1] = game.players
// const [ ,players2] = game.players
const [players1, players2] = game.players
console.log(players1);
console.log(players2);
//2.
const [gk, ...fieldPlayers] = players1
console.log(gk);
console.log(fieldPlayers);
//3.
const allPlayers = [...players1, ...players2]
console.log(allPlayers);
//4.
const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic']
console.log(playersFinal);
//5.
const {team1, x: draw, team2} = game.odds
console.log(team1, draw, team2);
//6.
const printGoals = function(...players) {
  console.log(players, players.length);
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimich')
printGoals(...game.scored)
//7.
// console.log(team1 > team2 || `Team with ${team1} is more likely to win.`)
team1 < team2 && console.log('Team 1 is more likely to win.')
*/

////////////////////////////////////////////////////////////////////////////////////
// Looping over array in other way (for of loop)
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]

for(const item of menu) console.log(item)

for(const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
*/

////////////////////////////////////////////////////////////////////////////////////
// Optional chaining ?.
/*
// normal
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

// with optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// optional chaining on methods

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRis?.(0, 1) ?? 'Method does not exist');

// optional chaining on arrays

const users = [{ name: 'Jonas', email: 'hello@pepa.com'}];
// const users = []

console.log(users[0]?.name ?? 'Users array empty');
*/

////////////////////////////////////////////////////////////////////////////////////
// Looping over objects
/*
// Property names
const properties = Object.keys(openingHours)
console.log(properties);

let openStr = `We are open on ${properties.length} days of week: `

for(const day of Object.keys(openingHours)) {
  openStr += `${day}, `
}
console.log(openStr);

// Property values
const values = Object.values(openingHours)
console.log(values);

// Entire object
const entries = Object.entries(openingHours)
console.log(entries);

// for(const x of entries) {
//   console.log(x);
// }

for(const [key, {open, close}] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`)
}
*/

////////////////////////////////////////////////////////////////////////////////////
// Challange #2
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
// for(let i = 0; i < game.scored.length; i++) {
//   console.log(`Goal ${i + 1}: ${game.scored[i]}`);
// }

for(const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// 2.
const values = Object.values(game.odds)
// console.log(values);

let avarage = 0
for(const [i, avg] of values.entries()) {
  avarage += avg / values.length
}

console.log(avarage);

// 3.
for(const [team, odd] of Object.entries(game.odds)){
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`
  console.log(`Odd of ${teamStr} ${odd}`);
}

// 4.
const scorers = {}

for(const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1)
}

console.log(scorers);
*/

////////////////////////////////////////////////////////////////////////////////////
// Sets
/*
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(orderSet);

// size of set
console.log(orderSet.size);
// if include
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));
// add
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
// delete
orderSet.delete('Risotto');
console.log(orderSet);

// delet all of elements
// orderSet.clear()

// loop over set
for (const order of orderSet) {
  console.log(order);
}

// Example
const staff = ['Waiter', 'Chief', 'Waiter', 'Manager', 'Chief', 'Waiter'];
// const staffUnique = new Set(staff)
// console.log(staffUnique);

// convert to array
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
*/
////////////////////////////////////////////////////////////////////////////////////
// Maps
/*
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Italy');
rest.set(2, 'Portugal');

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('closed', 23)
  .set(true, 'Opened')
  .set(false, 'Closed');

console.log(rest.get('name'))
console.log(rest.get(true))
console.log(rest.get(1))

const time = 21
console.log(rest.get(time > rest.get('open') && time < rest.get('closed')))

console.log(rest.has('categories'));

rest.delete(2)

rest.set([1, 2], 'Test')
rest.set(document.querySelector('h1'), 'Heading')
console.log(rest);

console.log(rest.size);
// rest.clear()

const quest = new Map([
  ['question', 'What is the best programming language?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
])

// convert objects to map
const hoursMap = new Map(Object.entries(openingHours))
console.log(hoursMap);

// quiz app
console.log(quest.get('question'));
for(const [key, value] of quest) {
  if(typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

const answer = Number(prompt('Your answer:'))
console.log(answer);

const finalMessage = quest.get(quest.get('correct') === answer)
console.log(finalMessage);

// Convert map to array
console.log(...quest);
console.log(...quest.entries());
console.log(...quest.keys());
console.log(...quest.values());
*/

////////////////////////////////////////////////////////////////////////////////////
// Challange #3
/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
// const events = new Set()

// for(const [key, value] of gameEvents) {
//   events.add(value)
// }

// console.log(events);

console.log(gameEvents.values());

const events = [...new Set(gameEvents.values())]
console.log(events);

// 2.
gameEvents.delete(64)
console.log(gameEvents);

// 3.
const eventMins = [...(gameEvents.keys())]
console.log(eventMins);
const lastEvent = eventMins.pop()
console.log(lastEvent);

console.log(`An event happened, on average, every ${lastEvent / gameEvents.size} minutes`);

// 4.

for(const [key, value] of gameEvents){
  console.log(`${key <= 45 ? '[First Half]' : '[Second Half]'} ${key}: ${value}.`)
}
*/

////////////////////////////////////////////////////////////////////////////////////
// Strings
/*
const airline = 'Tap Air Portugal'
const plane = 'A320'

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

// directly on a string
console.log('B737'[0]);
console.log('B737'.length);

// indexOf
console.log(airline.indexOf('r')); // position 6
console.log(airline.lastIndexOf('r')); // pos. 10

// slice
console.log(airline.slice(4)); // position where it will start
console.log(airline.slice(4, 7)); // (start, stop)

console.log(airline.slice(0, airline.indexOf(' '))); // first word if we dont know the lenght of string
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // last word if we dont know the lenght of string

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function(seat){
  // B and E are middle seats
  const s = seat.slice(-1)

  if(s === 'B' || s === 'E'){
    console.log('It is middle seat');
  } else {
    console.log('It is not middle seat');
  }
}

checkMiddleSeat('11B')
checkMiddleSeat('23C')
checkMiddleSeat('3E')

// Capitalization methods
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// fixing capitalization of string
const pax = 'jOnaS'

const paxLower = pax.toLowerCase()
const paxCorrect = paxLower[0].toUpperCase() + paxLower.slice(1)
console.log(paxCorrect);

// Comparing email
const email = 'hello@jonas.io'
const loginEmail = '   Hello@Jonas.Io \n'

const lowerEmail = email.toLowerCase()
// whitespaces of
const trimmedEmail = lowerEmail.trim()
console.log(trimmedEmail);
// or
const normalizedEmail = loginEmail.toLowerCase().trim()
console.log(normalizedEmail);

console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£'
const priceUS = priceGB.replace('£', '$').replace(',', '.')

console.log(priceUS);

const announcement = 'All pax come to door 23. Boarding door 23!'


console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
// or
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane2 = 'Airbus A320neo'
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));

console.log(plane2.startsWith('B'));
console.log(plane2.startsWith('Air'));
console.log(plane2.endsWith('neo'));

// exercise
const checkBaggage = function(items){
  const baggage = items.toLowerCase()
  if(baggage.includes('knife') || baggage.includes('gun')){
    console.log('Not allowed!');
  } else {
    console.log('Welcome!');
  }
}

checkBaggage('I have a Laptop, Food and pocket Knife')
checkBaggage('Socks and camera')
checkBaggage('Socks and camera and a gun')

// split() and join()

console.log('a+very+nice+string'.split('+')); // will return new array of strings btw +
console.log('Pepa Novak'.split(' '));

const [firstName, lastName] = 'Pepa Novak'.split(' ')
console.log(firstName);
console.log(lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ')
const newName1 = ['Mr.', firstName, lastName.toUpperCase()].join('----')
console.log(newName);
console.log(newName1);

const capitalizeName = function(name){
  const names = name.split(' ')
  const namesUpper = []

  for(const n of names){
    namesUpper.push(n[0].toUpperCase() + n.slice(1))
    // or
    // namesUpper.push(n.replace(n[0], n[0].toUpperCase()))
  }
  // console.log(namesUpper);
  console.log(namesUpper.join(' '));
}

capitalizeName('jessica ann smith davis')
capitalizeName('jan jelinek')

// Padding
const mess = 'Go to gate 23!'
console.log(mess.padStart(25, '+'));
console.log(mess.padEnd(35, '+'));
console.log(mess.padStart(20, '+').padEnd(30, '+'));

// ex. with credit card
const maskCreditcards = function(number) {
  const str = number + '' // will convert to string as String(number)
  const last = str.slice(-4)
  return last.padStart(str.length, '*')
}

console.log(maskCreditcards(43354968765138))
console.log(maskCreditcards('54895643354968765138'))

// repeat()
const message1 = 'Bed weather...All Dep..Delayed'
console.log(message1.repeat(5));

const planesInLine = function(n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
}

planesInLine(5)
planesInLine(7)
planesInLine(20)
*/

////////////////////////////////////////////////////////////////////////////////////
// Challange #4
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n')

  // to get acces to index of this loop we need entries()
  for(const [i, value] of rows.entries()){
    const trimmed = value.toLowerCase().trim()
    
    const [first, second] = trimmed.split('_')
    const camelCase = first + second[0].toUpperCase() + second.slice(1)

    const ticked = `${camelCase.padEnd(20)} ${'✅'.repeat(i + 1)}`
    console.log(ticked);
  }
});
*/

////////////////////////////////////////////////////////////////////////////////////
// Strings methods practice
/*
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const flightsArray = flights.split('+');
// console.log(flightsArray);

for (const flight of flightsArray) {
  const [type, from, to, time] = flight.split(';');
  // console.log(type, from, to, time);
  const correctedType = type.split('_').join(' ').slice(1);
  // console.log(correctedType);
  const correctedFrom = from.slice(0, 3).toUpperCase();
  // console.log(correctedFrom);
  const correctedTo = to.slice(0, 3).toUpperCase();
  // console.log(correctedTo);
  const correctedTime = time.replace(':', 'h');
  // console.log(correctedTime);
  const statement = `${
    correctedType.startsWith('Delayed') ? '🔴 ' + correctedType : correctedType
  } from ${correctedFrom} to ${correctedTo} (${correctedTime})`.padStart(50);
  console.log(statement);
}
*/
