// JavaScript has 5 data types that are copied by value: Boolean, null, undefined, String, and Number. We’ll call these primitive types.
// JavaScript has 3 data types that are copied by having their reference copied: Array, Function, and Object.

let a = 'abc';
let b = 123;
let c = null;
let d = true;
let e = undefined;

let newA = a;
let newB = b;
let newC = c;
let newD = d;
let newE = e;

a = 'edf';
b = 532;
c = 'not null';
d = false;
e = 'defined';

console.log(newA, newB, newC, newD, newE);
// Output => abc 123 null true undefined
// This has to do so with that these 3 data types are immutable.
// In ruby a string is considered mutable.

let arr = [];
let newArr = arr;

arr.push(1);
newArr.push(2);
console.log(newArr);
// Output => [ 1, 2 ]
// newArr and arr are both pointing to the same array in memory and thus modifying
// one will modify the other. (Mutate)

arr = ['a', 'b'];
arr.push('c');
arr.push('c');
console.log(arr);
console.log(newArr);
// Output => [ 'a', 'b', 'c', 'c' ]
// Output => [ 1, 2 ]
// arr has been reassigned and no longer pointing at the same array
// newArr is pointing to

let obj = {};
let newObj = obj;

obj['first'] = 1;
console.log(obj);
obj = {
  second: 2
};
console.log(obj);
// Output => { first: 1 }
// Output => { second: 2 }
// obj was mutated and then reassigned

let testA = [1];
let testB = testA;

console.log(testA === testB);
// Output => true
// The === operator checks for the same reference

testB = [1];
console.log(testA === testB);
// Output => false
// Although both testA and tetsB have the value of [1]
// they are not pointing at the same reference


// https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons
// The identity (===) operator behaves identically to the equality (==) operator except no type conversion is done, 
// and the types must be the same to be considered equal.

// Reference: Javascript Tutorial: Comparison Operators

// The == operator will compare for equality after doing any necessary type conversions. The === operator will not 
// do the conversion, so if two values are not the same type === will simply return false. Both are equally quick.

// To quote Douglas Crockford's excellent JavaScript: The Good Parts,

// JavaScript has two sets of equality operators: === and !==, and their evil twins == and !=. 
// The good ones work the way you would expect. If the two operands are of the same type and 
// have the same value, then === produces true and !== produces false. The evil twins do the 
// right thing when the operands are of the same type, but if they are of different types, they 
// attempt to coerce the values. the rules by which they do that are complicated and unmemorable. 
// These are some of the interesting cases:

// '' == '0'           // false
// 0 == ''             // true
// 0 == '0'            // true

// false == 'false'    // false
// false == '0'        // true

// false == undefined  // false
// false == null       // false
// null == undefined   // true

// ' \t\r\n ' == 0     // true
// The lack of transitivity is alarming. My advice is to never use the evil twins. Instead, always 
// use === and !==. All of the comparisons just shown produce false with the === operator.

// Update:

// A good point was brought up by @Casebash in the comments and in @Phillipe Laybaert's answer 
// concerning reference types. For reference types == and === act consistently with one another 
// (except in a special case).

// var a = [1,2,3];
// var b = [1,2,3];

// var c = { x: 1, y: 2 };
// var d = { x: 1, y: 2 };

// var e = "text";
// var f = "te" + "xt";

// a == b            // false
// a === b           // false

// c == d            // false
// c === d           // false

// e == f            // true
// e === f           // true
// The special case is when you compare a literal with an object that evaluates to the same literal, 
// due to its toString or valueOf method. For example, consider the comparison of a string literal 
// with a string object created by the String constructor.

// "abc" == new String("abc")    // true
// "abc" === new String("abc")   // false
// Here the == operator is checking the values of the two objects and returning true, but the === is 
// seeing that they're not the same type and returning false. Which one is correct? That really 
// depends on what you're trying to compare. My advice is to bypass the question entirely and just 
// don't use the String constructor to create string objects.

// Reference
// http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3

// Writing your own object equality
// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// https://stackoverflow.com/questions/1068834/object-comparison-in-javascript/1144249#1144249

const modifyPerson = (person) => {
  person.age = person.age + 3;
  return person;
};

const alex = {
  name: 'Alex',
  age: 25
};

const changedAlex = modifyPerson(alex);

console.log(alex);
console.log(changedAlex);
// Output
// { name: 'Alex', age: 28 }
// { name: 'Alex', age: 28 }
// alex was passed as a reference and then modified in the function

const newPerson = (person) => {
  person = JSON.parse(JSON.stringify(person));
  person.age = person.age + 3;
  return person;
};

const steve = {
  name: 'Steve',
  age: 18
};

const newSteve = newPerson(steve);

console.log(steve);
console.log(newSteve);
// output
// { name: 'Steve', age: 18 }
// { name: 'Steve', age: 21 }
// steve was not modified because a new person was created