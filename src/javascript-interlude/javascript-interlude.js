//javascript.cs.lmu.edu/runner/

//  01 - var, let, const

var global = "global";
let local = "local";
const constant = "constant";

constant = "blabla";

if (true) {
  let global = "what is this?";
  console.log(global);
}
console.log(global);

constant = "you can modify a constant??";
console.log(constant);

// 02 Conditional (ternary) operator

let value = "what I need";
let condition;

if (condition == "what I need") {
  value = "something";
} else {
  value = "something else";
}

let value = condition == "what I need" ? "something" : "something else";

// 03 - Template literals

let value = 2018;

let rendered = `Current year: ${value}`;

// 04 - Object Initializer

let car = { color: "red", wheels: 4, isCool: true };

console.table(car);

// 05 - Arrow Function

function hello(who) {
  console.log(`hello ${who}`);
}

hello("world");

const hello = who => {
  console.log(`hello ${who}`);
};

hello("world");

function add(a, b) {
  return a + b;
}

const add = (a, b) => a + b;

console.log(add(1, 2));

const yell = () => console.log("EY!");

// 06 - Loops

let array = [1, 2, 3, 4, 5];

for (let i = 0; i < array.length; i++) {
  console.log(i);
}

array.forEach(function(i) {
  console.log(i);
});

array.forEach(i => {
  console.log(i);
});

for (let i of array) {
  console.log(i);
}

// 07 - Destructuring

let a, b, rest;

[a, b] = [10, 20];
[a, b, ...rest] = [10, 20, 30, 40, 50];
[a, , ...rest] = [10, 20, 30, 40, 50];

// 08 - Rest Parameters

const add = (...a) => {
  let total = 0;
  a.forEach(n => (total += n));
  return total;
};

console.log(add(1, 2, 3));

function add(...a) {
  let total = 0;
  a.forEach(n => (total += n));
  return total;
}

console.log(add(1, 2, 3));

// 09 - Spread Parameters

const add = (...a) => {
  let total = 0;
  a.forEach(n => (total += n));
  return total;
};

let numbers = [1, 2, 3];

console.log(add(...numbers));

// 10 - Array Functions

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// Array.push()
// Array.pop()
// Array.filter()
// Array.find()
// Array.forEach()
// Array.includes()
// Array.reduce()
// Array.slice()
// Array.some()
// ...

// 11 - Promises

const a = async () => {};

const b = await wait();

let c = null;

a().then(result => (c = result));
