// To explain what new does, let’s start with just a normal function, called 
// without new. We want to write a function that will create “person” 
// objects. It’ll give these objects name and age properties based on 
// parameters that it takes in.
function personFn(name, age) {
  var personObj = {};
  personObj.name = name;
  personObj.age = age;
  
  return personObj;
}
var alex = personFn('Alex', 30);
// -> { name: 'Alex', age: 30 }

// Let’s create a function that does the same thing, but we want it to be 
// invoked using new. This function will create the same object as the one 
// above. Common practice is to make functions that are meant to be invoked 
// with new start with a capital letter. These functions are also referred 
// to as constructors

function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}
var alex = new PersonConstructor('Alex', 30);
// -> { name: 'Alex', age: 30 }

// The new keyword invokes a function in a special way. It adds some implicit 
// code that we don’t see. Let’s expand the above function to show everything 
// that’s happening. The commented lines are pseudocode representing 
// functionality that is implicitly added by the JS engine when using new.

function PersonConstructor(name, age) {
  // this = {};
  // this.__proto__ = PersonConstructor.prototype;
  // Set up logic such that: if
  // there is a return statement
  // in the function body that
  // returns anything EXCEPT an
  // object, array, or function:
  //     return 'this' (the newly
  //     constructed object)
  //     instead of that item at
  //     the return statement;
  this.name = name;
  this.age = age;
  // return this;
}

// Let’s break it down. new:
// 1. Creates a new object and binds it to the this keyword.
// 2. Sets the object’s internal [[Prototype]] property, __proto__, to be the prototype 
// of the constructing function. This also makes it so the constructor of the new object 
// is prototypically inherited.
// 3. Sets up logic such that if a variable of any type other than object, array, or 
// function is returned in the function body, return this, the newly constructed object, 
// instead of what the function says to return.
// 4. At the end of the function, returns this if there is no return statement in the 
// function body.
// Let’s show that these statements are valid, one by one.

function Demo() {
  console.log(this);
  this.value = 5;
  return 10;
}
/*1*/ var demo = new Demo(); // -> {}
/*2*/ console.log(demo.__proto__ === Demo.prototype); // -> true
    console.log(demo.constructor === Demo); // -> true
/*3*/ console.log(demo); // -> { value: 5 }
function SecondDemo() {
  this.val = '2nd demo';
}
/*4*/ console.log(new SecondDemo()); // -> { val: '2nd demo' }

// Calling a non-constructor with new
// What happens if we invoke a normal function like personFn using new? Nothing 
// special. The same rules apply. in the case of personFn, we see nothing 
// explicitly happening.


// The implicit code is still added in:
//  - It binds this to a new object and sets its constructor and prototype.
//  - It adds logic that will return this instead of a non-object.
//  - It adds an implicit return this statement at the end.
// This doesn’t affect our code, since we don’t use the this keyword in our code.
//  We also explicitly return an object, personObj, so the returning logic and the 
//  return this line have no use. Effectively, using new to invoke our function 
//  here has no effect on the output. If we were using this or if we weren’t 
//  returning an object, the function would have different effects when invoked 
