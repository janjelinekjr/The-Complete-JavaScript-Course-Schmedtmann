'use strict' // for error messegaes in console

/////////////////////////////////////////////////////////////////////////////////////////
// function decleretaions
// may be call before define the function

/*
function logger() {
   console.log(`My name is Jan`)
}

// calling, running, invoking function
logger()
*/
/*
function logger(name) {
   console.log(`My name is ${name}`)
}

logger('Jan')
*/
/*
function fruitProccessor(applesNum, orangesNum){
   const juice = `Juice with ${applesNum} apples and ${orangesNum} oranges.`
   return juice
}

const appleJuice = fruitProccessor(5, 1)

console.log(appleJuice)

const appleOrangeJuice = fruitProccessor(2, 4)

console.log(appleOrangeJuice)
*/

/////////////////////////////////////////////////////////////////////////////////////////
// function expressions
// cannot be called before define the function

/*
const calcAge2 = function(birtheYear) {
   return 2022 - birtheYear
}

const age2 = calcAge2(1991)

console.log(age2)
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Arrow function

/*
// one line
const calcAge3 = birthYear => 2022 - birthYear
const age3 = calcAge3(1992)

console.log(age3)

// multiple line
const yearUntilRetirement = birthYear => {
   const age = 2022 - birthYear
   const retirement = 65 - age
   return retirement
}

console.log(yearUntilRetirement(1995))

*/
/*
// multiple parametrs
const yearUntilRetirement = (birthYear, fisrtName) => {
   const age = 2022 - birthYear
   const retirement = 65 - age
   return `${fisrtName} retire in ${retirement} years.`
}

console.log(yearUntilRetirement(1995, 'Jan'))
*/

/////////////////////////////////////////////////////////////////////////////////////////
// function calling other function

/*
function cutFruit(fruit) {
   return fruit * 4
}

function fruitProccessor(applesNum, orangesNum){
   const applePiecies = cutFruit(applesNum)
   const orangePiecies = cutFruit(orangesNum)

   const juice = `Juice with ${applePiecies} pices of apples and ${orangePiecies} pices of oranges.`
   return juice
}

console.log(fruitProccessor(2, 3))
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Challange #1

/*
const calcAvarage = (score1, score2, score3) => {
   const avgScore = (score1 + score2 + score3) / 3
   return avgScore
}
*/
/*
// or shorter version:
const calcAvarage = (a, b, c) => (a + b + c) / 3

let avgScoreDolphins = calcAvarage(44, 23, 71)
let avgScoreKoalas = calcAvarage(65, 54, 49)

const checkWinner = function(avgDolphins, avgKoalas){
   if(avgDolphins >= avgKoalas * 2) {
      console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`)
   } else if(avgKoalas >= avgDolphins * 2) {
      console.log(`Koalas win (${avgKoalas} vs ${avgDolphins})`)
   } else {
      console.log(`No one win!`)
   }
}

checkWinner(avgScoreDolphins, avgScoreKoalas)

avgScoreDolphins = calcAvarage(85, 54, 41)
avgScoreKoalas = calcAvarage(23, 34, 27)

checkWinner(avgScoreDolphins, avgScoreKoalas)
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Arrays
/*
// Literal sintax
const friends = ['Jan', 'Pepa', 'Linda']
// or
const years = new Array(1992, 2009, 1882, 2001)

console.log(years)

// we can change also when friends is const
friends[2] = 'Libor'
friends[3] = 'Anna'

console.log(friends)

const firstName = 'Jan'
const jan = [firstName, 'Jelinek', 2022 - 1995, friends]
console.log(jan)
*/
// exercise
/*
const calcAge = function(birtheYear) {
   return 2022 - birtheYear
}
const years = [1997, 1998, 1995, 2009]

const age1 = calcAge(years[0])
console.log(age1)

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])]

console.log(ages)
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Arrays methods
/*
const friends = ['Jan', 'Pepa', 'Linda']
friends.push('Anna')
console.log(friends)

// push method can be used for return lenght
console.log(friends.push())

// unshift method can be used for return lenght as well
friends.unshift('Petr')
console.log(friends)

// remove last element
friends.pop()
console.log(friends)

// pop method can be used to return removed element
const popeed = friends.pop()
console.log(popeed)

// remove first element
friends.shift()
console.log(friends)
// shift method can be used to return removed element as well

// indexOf element
console.log(friends.indexOf('Jan'))

// when elements is not in array will return -1
console.log(friends.indexOf('Bob'))

// icludes method
// check if element is in teh array or not return true or false
console.log(friends.includes('Jan'))
console.log(friends.includes('Bob'))

if(friends.includes('Jan')){
   console.log('Yes this name is in the array.')
}
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Challange #2
/*
const calcTip = function(billValue) {
   if(billValue >= 50 && billValue <= 300){
      const tip = billValue * 0.15
      return tip
   } else {
      const tip = billValue * 0.20
      return tip
   }
}
*/
// or shorter way with terner operator
/*
const calcTip = function(billValue) {
   return billValue >= 50 && billValue <=300 ? billValue * 0.15 : billValue * 0.2
}

const bills = [125, 555, 44]
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]

const total = [bills[0] + calcTip(bills[0]), bills[1] + calcTip(bills[1]), bills[2] + calcTip(bills[2])]

console.log(bills)
console.log(tips)
console.log(total)
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Objects

// const object = {key: value}
/*
const petr = {
   firstName: 'Peter',
   lastName: 'Novak',
   age: 2022 - 1995,
   friend: ['Jan', 'Pepa', 'Linda']
}

console.log(petr.lastName)
console.log(petr['lastName']) // in this case we can compute (use expresion):

const nameKey = 'Name'
console.log(petr['first' + nameKey])

const interestedIn = prompt('What do you want to know about Petr?')
console.log(petr.interestedIn) // dosnt work, will return undefined
console.log(petr[interestedIn]) // we havve to use [expresion] in this case
*/
/*
const jonas = {
   firstName: 'Jonas',
   lastName: 'Novak',
   age: 2022 - 1995,
   friend: ['Michael', 'Pepa', 'Linda']
}

console.log(`${jonas.firstName} has ${jonas.friend.length} friends, and his best friend is called ${jonas.friend[0]}`)
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Objects methods
/*
const jonas = {
   firstName: 'Jonas',
   lastName: 'Novak',
   birthYear: 1991,
   job: 'teacher',
   friends: ['Michael', 'Pepa', 'Linda'],
   hasDriversLicense: true,

   // calcAge: function(birtheYear) {
   //    return 2022 - birtheYear
   // }

   // calcAge: function() {
   //    return 2022 - this.birthYear
   // }

   calcAge: function() {
      this.age = 2022 - this.birthYear
      return this.age
   },

   getSummary: function() {
      return `${this.firstName} is a ${this.calcAge()}-yaers old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`
   }
}

// console.log(jonas.calcAge(1991))
// console.log(jonas['calcAge'](1991))

// or here we have to call function and calculate just one
/*
jonas.calcAge()
console.log(jonas.age)
console.log(jonas.age)
*/

// console.log(jonas.getSummary())

/////////////////////////////////////////////////////////////////////////////////////////
// Challange #3
/*
const mark = {
   firstName: 'Mark',
   lastName: 'Miller',
   mass: 78,
   height: 1.69,

   calcBMI: function(){
      this.BMI = this.mass / this.height ** 2
      return this.BMI
   }
}

const john = {
   firstName: 'John',
   lastName: 'Smith',
   mass: 92,
   height: 1.95,

   calcBMI: function(){
      this.BMI = this.mass / this.height ** 2
      return this.BMI
   }
}

mark.calcBMI()
john.calcBMI()

if(john.BMI > mark.BMI) {
   console.log(`${john.firstName} ${john.lastName}'s BMI (${john.BMI}) is higher then ${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI})!`)
} else if(john.BMI < mark.BMI){
   console.log(`${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI}) is higher then ${john.firstName} ${john.lastName}'s BMI (${john.BMI})!`)
}
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Loops
/*
const jonasArray = [
   'Jonas',
   'Novak',
   2022 - 1995, 
   'teacher',
   ['Michael', 'Pepa', 'Linda'],
   true
]

const types = []

for (let i = 0; i < jonasArray.length ; i++) {
   console.log(jonasArray[i], typeof jonasArray[i])

   // filling types array
   // types[i] = typeof jonasArray[i]
   types.push(typeof jonasArray[i])
}

console.log(types)

const years = [1991, 2007, 1969, 2020]
const ages = []

for (let i = 0; i < years.length; i++){
  ages.push(2030 - years[i])
}

console.log(ages)
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Loops continue and break
/*
// continue
const jonasArray = [
   'Jonas',
   'Novak',
   2022 - 1995, 
   'teacher',
   ['Michael', 'Pepa', 'Linda'],
   true
]

for (let i = 0; i < jonasArray.length ; i++) {
   if(typeof jonasArray[i] !== 'string') continue

   console.log(jonasArray[i], typeof jonasArray[i])
}

// break
for (let i = 0; i < jonasArray.length ; i++) {
   if(typeof jonasArray[i] === 'number') break

   console.log(jonasArray[i], typeof jonasArray[i])
}
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Loops backwards and loops in loops
/*
const jonasArray = [
   'Jonas',
   'Novak',
   2022 - 1995, 
   'teacher',
   ['Michael', 'Pepa', 'Linda'],
   true
]

for(let i = jonasArray.length - 1; i >= 0; i--){
   console.log(jonasArray[i], typeof jonasArray[i])
}

for (let exercise = 1; exercise < 4; exercise++){
   console.log(`-------------Starting exercise ${exercise} `)

   for(let rep = 1; rep < 6; rep++){
      console.log(`Exercise ${exercise}: Lifting weight repetition ${rep}`)
   }
}
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Loops While

// for(let rep = 1; rep <= 10; rep++){
//    console.log(`Lifting weight repetition ${rep}`)
// }
/*
let rep = 1

while (rep <=10) {
   console.log(`While: Lifting weight repetition ${rep}`)
   rep++
}
*/
/*
let dice = Math.trunc(Math.random() * 6) + 1 

while (dice !== 6){
   console.log(`You rolled a ${dice}`)
   dice = Math.trunc(Math.random() * 6) + 1

   if(dice === 6) console.log('Loop is about to stop.')
}
*/

/////////////////////////////////////////////////////////////////////////////////////////
// Challange #4
/*
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]
const tips = []
const totals = []


const calcTip = function(billValue) {
   if(billValue >= 50 && billValue <= 300){
      const tip = billValue * 0.15
      return tip
   } else {
      const tip = billValue * 0.20
      return tip
   }
}

for(let i = 0; i < bills.length; i++) {
   tips.push(calcTip(bills[i]))
   totals.push(bills[i] + tips[i])
}


const calcAvarage = function(arr){
   let sum = 0
   for(let i = 0; i < arr.length; i++){
   //   sum = sum + arr[i] / arr.length
     sum += arr[i] / arr.length
   }
   return sum
}


console.log(tips)
console.log(totals)

console.log(calcAvarage(totals))
*/