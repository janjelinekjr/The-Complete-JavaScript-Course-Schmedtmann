//////////////////////////////////////////////////////////////////////////

// typeof datat type
/*
console.log(typeof true)
console.log(typeof 23)
console.log(typeof 'JS')

let type = 23
type = 'JS'
console.log(typeof type)

let year
console.log(year)
console.log(typeof year)

year = 2022
console.log(year)
*/

//////////////////////////////////////////////////////////////////////////

// let, const, var
/*
//can be changed
let age = 27
age = 28
console.log(age)

// cannot be changed
const birthYear = 1995
*/

//////////////////////////////////////////////////////////////////////////

// Operators
/*
const now = 2022
const agePepa = now - 1997
const ageNimrod = now - 1965

console.log(agePepa * 2, ageNimrod / 3, 2 ** 3)
// 2 ** 3 means 2*2*2

let x = 10
x /= 2
console.log(x)
*/

// two variables in the same times
/*
let x, y
x = y = 25-10-5
console.log(x, y)
*/

//////////////////////////////////////////////////////////////////////////

// Challange #1
/*
let weightMark = 78
let heightMark = 1.69

let weightJohn = 92
let heightJohn = 1.95

let marksBMI = weightMark / heightMark ** 2
let johnsBMI = weightJohn / heightJohn ** 2

let markHigherBMI = marksBMI > johnsBMI

console.log(markHigherBMI)
*/

/////////////////////////////////////////////////////////////////////////

// Strings, template strings
/*
// multiple lines with '' or "" and \n\:
console.log('String with \n\
multiple \n\
lines')
// or better way with ``
console.log(`String
multiple
lines`)
*/

/////////////////////////////////////////////////////////////////////////

// if, else if, else
/*
const birthYear = 1998
let century

if(birthYear >= 1900 && birthYear <= 2000) {
   century = 20
} else if (birthYear > 2000 && birthYear < 2100) {
   century = 21
} else {
   console.log(other)
}

console.log(century)
*/
// Challange #2
/*
let weightMark = 78
let heightMark = 1.69

let weightJohn = 92
let heightJohn = 1.95

let marksBMI = weightMark / heightMark ** 2
let johnsBMI = weightJohn / heightJohn ** 2

let markHigherBMI = marksBMI > johnsBMI

if(marksBMI > johnsBMI) {
   console.log(`Mark's BMI ${marksBMI} is higher then John's BMI ${johnsBMI}`)
} else if(johnsBMI > marksBMI) {
   console.log(`John's BMI ${johnsBMI} is higher then Mark's BMI ${marksBMI}`)
}
*/

/////////////////////////////////////////////////////////////////////////

// Type Conversion (manualy) and Coercion (automaticaly)
/*
// Conversion
// String to Number
const inputYear = '1991' // string
console.log(Number(inputYear)) // number

console.log(inputYear + 18) // still string
console.log(Number(inputYear) + 18) // number

// Number to String
console.log(String(23))

// Coercion
// + triggers coercion numbers to string and -,*,/ triggers opposite strings to numbers
console.log('I am ' + 23 + ' years old')
console.log('23' - '10' - 3) // 10

let n = '1' + 1
n = n -1
console.log(n)
*/

// Falsy Thruty rules
// 5 falsy values: 0, '', undefined, null, NaN
/*
// Convert to Boolean:
console.log(Boolean(0))
console.log(Boolean(''))
console.log(Boolean(undefined))
console.log(Boolean(null))
console.log(Boolean(NaN))


const money = 0

if(money) {
   console.log('let money is true/truty value')
} else {
   console.log('let money is false/falsy value')
}
*/

/////////////////////////////////////////////////////////////////////////

// Equality operators
/*
const age = 18

if(age === 18) console.log('dont need {} when if is only one line')

console.log(18 === '18')
console.log(18 == '18')

// === is strict equal operator type is included ex. 18 === '18' is false
// == is loose equal operator doesnt include value type ex. 18 == '18' is true

// const favourite = prompt('Type your favourite number.') 
const favourite = Number(prompt('Type your favourite number.')) // need to be converted to number due to === 

if(favourite === 23) {
   console.log('23 is good one!')
}
*/

/////////////////////////////////////////////////////////////////////////

// Loguical operators

// AND, OR, NOT
// &&, ||, !
/*
let hasDriversLicences = true
let hasGoodVision = false

console.log(hasDriversLicences && hasGoodVision)
console.log(hasDriversLicences || hasGoodVision)
console.log(!hasDriversLicences)
console.log(!hasDriversLicences || hasGoodVision)
*/

//////////////////////////////////////////////////////////////////////////

// Challange #3
/*
const doplhinsAVGScore = (97 + 112 + 10) / 3;
const koalasAVGScore = (109 + 95 + 123) / 3;

console.log(`Dolphins score: ${doplhinsAVGScore}`);
console.log(`Koalas score: ${koalasAVGScore}`);

if (doplhinsAVGScore > koalasAVGScore && doplhinsAVGScore >= 100) {
  console.log("Dolphins team is winner! 🏆");
} else if (koalasAVGScore > doplhinsAVGScore && koalasAVGScore >= 100) {
  console.log("Koalas team is winner! 🏆");
} else if (
  doplhinsAVGScore === koalasAVGScore &&
  doplhinsAVGScore >= 100 &&
  koalasAVGScore >= 100
) {
  console.log("It is draw! Both are winner! 🏆🏆");
} else {
  console.log("No one win the trohpy! 😐");
}
*/

//////////////////////////////////////////////////////////////////////////

// Switch statements
/*
const day = "monday";

switch (day) {
  case "monday": // day === monday
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory course");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend");
    break;
  default:
    console.log("Not as valid day");
}

if (day === "monday") {
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory course");
} else if (day === "wednesday || day === thursday") {
  console.log("Write code examples");
}
*/

//////////////////////////////////////////////////////////////////////////

// Conditional (ternary) operator
/*
const age = 23
age >= 18 ? console.log('I like to drink wine') : console.log('I like to drinkas water')

// we can define ternary operator in variables
const drink = age >= 18 ? 'wine' : 'water'
console.log(drink)

// but normal if statements must be outside of variables
let drink2
if(age >= 18){
   drink2 = 'wine'
} else {
   drink2 = 'water'
}

console.log(drink2)

// ternary operator can be placed into template string bcs it is expresions
console.log(`I like to drink ${age >= 18 ? 'wine' : 'water'}`)
*/

//////////////////////////////////////////////////////////////////////////

// Challange #4
/*
const bill = 430

let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`)
*/