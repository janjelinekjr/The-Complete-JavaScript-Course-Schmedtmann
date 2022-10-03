// Remember, we're gonna use strict mode in all scripts now!
'use strict'

const x = 'Pepa'

////////////////////////////////////////////////////////////////////////////////////////////
// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."
/*
const temperatures1 = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5]
const temperatures2 = [7, -2, -6, -1, 9, 1, 12, 38, 0, 4, 9]
*/
// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what do do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

// console.log(Math.max(...temperatures)) // find max value of array
// merge arrays:
/*
const array1 = [9, 5, 3, 0]
const array2 = [3, 67, 32, 1]

const bothArrays = [...array1, ...array2]

console.log(bothArrays);
*/
/*
const calcTempAmplitude = function (t1, t2) {
  const temps = t1.concat(t2)

  let max = temps[0]
  let min = temps[0]
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== 'number') continue

    if (temps[i] > max) {
      max = temps[i]
    }
    if (temps[i] < min) {
      min = temps[i]
    }
  }
  return max - min
}

const amplitude = calcTempAmplitude(temperatures1, temperatures2 )
console.log(amplitude)
*/

/*
const calcTempAmplitude = function (t1, t2) {
  const t1NoError = []
  const t2NoError = []

  for (let i = 0; i < t1.length; i++) {
    if (typeof t1[i] !== 'number') continue

    t1NoError.push(t1[i])
  }

  for (let i = 0; i < t2.length; i++) {
    if (typeof t2[i] !== 'number') continue

    t2NoError.push(t2[i])
  }

  const temps = [...t1NoError, ...t2NoError]

  const max = Math.max(...temps)
  const min = Math.min(...temps)

  return max - min
}

const tempAmplitude = calcTempAmplitude(temperatures1, temperatures2)
console.log(tempAmplitude)
*/

// Debugging
/*
const measureKelvin = function() {
  const measurment = {
    type: 'temp',
    unit: 'celsius',
    // C) fix
    value: Number(prompt('Degrees celsius'))
  }

  // B) find
  // console.log(measurment);
  // console.table(measurment);

  // console.log(measureKelvin.value);
  // console.warn(measureKelvin.value)
  // console.error(measureKelvin.value)

  const kelvin = measurment.value + 273
  return kelvin
}

// A) identify
console.log(measureKelvin())
*/


// using a debugger
/*
const temperatures1 = [3, -2, -7, -1, 'error', 9, 13, 17, 15, 14, 9, 5]
const temperatures2 = [7, -2, -6, -1, 9, 1, 12, 38, 0, 4, 9]

const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2)

  let max = 0
  let min = 0
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== 'number') continue

    if (temps[i] > max) {
      max = temps[i]
    }
    if (temps[i] < min) {
      min = temps[i]
    }
  }
  console.log(max, min);
  return max - min
}

const amplitudeBug = calcTempAmplitudeBug(temperatures1, temperatures2 )
console.log(amplitudeBug)
*/

////////////////////////////////////////////////////////////////////////////////////////////
// Challange #1

// console.log(`... ${arr[0]} C in 1 days ... ${arr[1]} C in 2 days ...${arr[2]} C in 3 days`)
/*
const temperatures = [17, 21, 23]
const temperatures2 = [12, 5, -5, 0, 4]

const printForecast = function(arr) {
  let forecastString = ""

  for(let i = 0; i < arr.length; i++){
    forecastString += ` ... ${arr[i]}°C in ${i + 1} ${i + 1 > 1 ? "days" : "day"}`
  }
  console.log(forecastString)
}

printForecast(temperatures2)
*/
