'use strict';

// OOP

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Constructor function
/*
const Person = function (firstName, birthYear) {
  // console.log(this);

  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create method inside constructor due to performance in huge amount of new instance, instead use prototype, like below
  // Because we will then create new function for every new object and this will have huge impact on performance, so we can create
  // only one function/method by prototype and then all object can use that method

  // this.calcAge = function(){
  //    console.log(2037 - this.birthYear);
  // }
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);
// Behide the scene happens:
// 1. New{object} is created
// 2. function is called and this keyword is this new empty object
// 3. new object is linked to prototype (will create __proto__ property and set it to Person.prototype)
// 4. function automatically return that object
const matilda = new Person('Matilda', 1998);
const jack = new Person('Jack', 1967);
console.log(matilda, jack);

console.log(jonas instanceof Person);
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Prototypes
/*
Person.prototype.clacAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(Person.prototype);

// Noew we can use this:
jonas.clacAge();
matilda.clacAge();

console.log(jonas.__proto__); // __proto__ is prototype of object jonas and always point to an objects prototype
console.log(Person.prototype); // here prototype is not a prototype of Person but of its linked objects (instances)
console.log(jonas.__proto__ === Person.prototype); // its true

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// We can set to a protoptype also properties like methods:
Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda);
// they are not own property of jonas and matilda but they are in prototype and they have access to it
console.log(jonas.species, matilda.species);
console.log(jonas.hasOwnProperty('firstName')); // true (own property of jonas)
console.log(jonas.hasOwnProperty('species')); // false (here jonas object have only access to this property)

// Protypes inheritance and chain
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__); // chain up to Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); // this is null bcs Object.prototype is last

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

// Prototypes of an array
const arr = [2, 2, 3, 4, 3, 6, 7];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__);

// new method put on prototype (but dont do this to much in practice)
Array.prototype.unique = function () {
  return [...new Set(this)];
};
// and then we can use unique method on any array
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challange #1
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} accelerated to ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} decelerated to ${this.speed}km/h`);
};

const volvo = new Car('Volvo', 100);
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.brake();
bmw.accelerate();

mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();

volvo.accelerate();
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ES6 Classes
// in JS classes arent like a normal classes in other programming languages, but they are just better syntax (simular to classes in other prog.lang.) of constructor function to understand. So behind the scenes classes are just special functions
/*
// Class experession
const PersonCl1 = class {};

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // method will be adde to .prototype property just like in constructor function
  clacAge() {
    console.log(2037 - this.birthYear);
  }
  // getter
  get age() {
    return 2037 - this.birthYear;
  }
  // Set a property  that already exists
  //validation
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davison', 1996);
console.log(jessica);

jessica.clacAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype); // true

// 1. Classe are NOT hoisted (we cannot use them before they are declered)
// 2. Classes are first-class citizens just like functions (we can pass them to a function and return them from a function)
// 3. Classes are executed in strict mode always
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Setters and Getters
// they essentialy allow us to work with methods like with properties

// const walter = new PersonCl('Walter', 1997)
/*
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],
  get latestMov() {
    return this.movements.slice(-1).pop();
  },

  set latestMov(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latestMov); // we dont call the method by () and write it just like a property due to get keyword

account.latestMov = 50; // again we dont writ it like latestMov(50), but insted like change a property
console.log(account.movements);
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Static methods
/*
// from() we cannot call this method on an array, bcs it is not on their prototype, so it wont be inhereted
console.log(Array.from(document.querySelectorAll('h1'))); // from node list to array

PersonCl.hey(); // works
//jonas.hey() // doesnt work, bcs hey() is not inhereted by instances
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Object.create()
// Object.create will create new object and set their prototype as an object in ()
/*
const PersonProto = {
  clacAge() {
    console.log(2037 - this.birthYear);
  },

  // just function for set property on sara object
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // will link steven objects prototype as PersonPro object
console.log(steven);
// set propery in basic/manual way
steven.name = 'Steven';
steven.birthYear = 2002;

steven.clacAge();

console.log(steven.__proto__); // object PersonPro

const sara = Object.create(PersonProto);
// set property programaticaly
sara.init('Sara', 1979);
sara.clacAge();
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challange #2

// const Car = function (make, speed) {
//    this.make = make;
//    this.speed = speed;
//  };

//  Car.prototype.accelerate = function () {
//    this.speed += 10;
//    console.log(`${this.make} accelerated to ${this.speed}km/h`);
//  };

//  Car.prototype.brake = function () {
//    this.speed -= 5;
//    console.log(`${this.make} decelerated to ${this.speed}km/h`);
//  };

//  const volvo = new Car('Volvo', 100);
//  const bmw = new Car('BMW', 120);
//  const mercedes = new Car('Mercedes', 95);
/*
class Car1 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} accelerated to ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} decelerated to ${this.speed}km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car1('Ford', 120);

console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Inheritance Between "Classes": with Constructor Functions
/*
const Person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person1.prototype.clacAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// to inherit from person prototype / linking prototypes
Student.prototype = Object.create(Person1.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'IT');
console.log(mike);
mike.introduce();
mike.clacAge();

console.log(mike instanceof Student);
console.log(mike instanceof Person1);
console.log(mike instanceof Object);

console.dir(Student.prototype.constructor);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Challange #3
/*
// from chalange #1:
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} accelerated to ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} decelerated to ${this.speed}km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototype
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} accelerated to ${this.speed}km/h with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.brake();
console.log(tesla);
tesla.chargeBattery(90)
console.log(tesla);
tesla.accelerate();
tesla.accelerate();
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Inheritance Between "Classes": with ES6 Classes
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  clacAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // needs to happends first, bcs it creates this keyword and subclass
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'IT');
martha.introduce()
martha.clacAge()
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Inheritance Between "Classes": with Object.create
/*
const PersonProto = {
  clacAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto); // StudentProto inheriting from PersonProto
StudentProto.init = function(firstName, birthYear, course){
   PersonProto.init.call(this, firstName, birthYear)
   this.course = course
}

StudentProto.introduce = function () {
   console.log(`My name is ${this.firstName} and I study ${this.course}`);
 };

const jay = Object.create(StudentProto); // object jay inheriting from StudentProto and then also from PersonProto
jay.init('Jay', 2010, "IT")
console.log(jay);
jay.introduce()
jay.clacAge()
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Another class example + Encapsulation: Protected Properties and Methods falsy by _
// And Private Class Fields and Methods thruly by #
/*
// Public fields
// Private fields
// Public methods
// Private methods
// (there is also statis version)

class Account {
  // Public fields (will be on all instances not on prototype) and have to be outside of contructor
  locale = navigator.language;
  // Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected propety, but not in real
    this.#pin = pin; // we can access #pin in private field and set it to a pin value
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening account, ${this.owner}`);
  }
  // Private methods
  _approveLoan(val) {
    return true;
  }

  // #approveLoan(val) {
  //   return true;
  // }

  // Public methods / interface of our object (API)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this // for chaining methods (epsecially methods which set somthing)
  }

  withdraw(val) {
    this.deposit(-val);
    return this
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

console.log(acc1);

// console.log(acc1.#movements); // cannot acces variable from outside bcs it it now private
// console.log(acc1.#pin); // cannot acces variable from outside bcs it it now private

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Chaining methods by returning this in methods

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000)

console.log(acc1.getMovements());
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challange #4
/*
class CarCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} accelerated to ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} decelerated to ${this.speed}km/h`);
    return this
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
*/
/*
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototype
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} accelerated to ${this.speed}km/h with a charge of ${this.charge}%`
  );
};
*/
/*
class EVCl extends CarCL {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.charge = chargeTo;
    return this
  }

  accelerate() {
    this.speed += 20;
    this.charge--;
    console.log(
      `${this.make} accelerated to ${this.speed}km/h with a charge of ${this.charge}%`
    );
    return this
  }
}

const rivian = new EVCl('Rivian', 120, 23)
console.log(rivian);

rivian.chargeBattery(100).accelerate().accelerate().brake().accelerate()
*/