// __proto__ === null
// |
// |
// __proto__ === Object.prototype
// |
// |
// { object literal }

// When we call a function with new, it sets the returned object’s __proto__ 
// property equal to the function’s prototype property. This is the key to inheritance.

// function Fn() {}
// var obj = new Fn();
// console.log(obj.__proto__ === Fn.prototype);
// // -> true
// console.log(obj.__proto__.__proto__=== Object.prototype);
// // -> true
// console.log(obj.__proto__.__proto__.__proto__ === null);
// // -> true
// console.log(Object.prototype.__proto__=== null);

// const iterations = 700000;

// let run = [];
// for (let i = 0; i < iterations; i++) {
//   run.push(new ExampleFnSlow());
// }
// for (let i = 0; i < iterations; i++) {
//   run.push(new ExampleFnFast());
// }

// let slow = [];
// function ExampleFnSlow() {
//   this.print = function() {
//     console.log("Calling print");
//   };
// }

// console.time('Slow');

// for (let i = 0; i < iterations; i++) {
//   slow.push(new ExampleFnSlow());
// }

// console.timeEnd('Slow');

// let fast = [];
// function ExampleFnFast() {}

// ExampleFnFast.prototype.print = function() {
//   console.log("Calling print");
// };

// console.time('Fast');

// for (let i = 0; i < iterations; i++) {
//   fast.push(new ExampleFnFast());
// }

// console.timeEnd('Fast');

var obj = {};
var arr = [];
function fn() {}
console.log(obj.__proto__ === Object.prototype); // -> true
console.log(arr.__proto__ === Array.prototype); // -> true
console.log(fn.__proto__ === Function.prototype); // -> true

function Fn() {};
var normalObj = {};
var fnObj = new Fn();
console.log(normalObj.constructor);
// -> ƒ Object() { [native code] }
console.log(fnObj.constructor);
// -> ƒ Fn() {}

var prototypeObj = {
  testValue: 'Hello!'
};
var obj = Object.create(prototypeObj);
console.log(obj); // -> {}
console.log(obj.__proto__ === prototypeObj); // -> true
console.log(obj.testValue); // -> 'Hello!'