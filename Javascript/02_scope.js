// In the JavaScript language there are two types of scopes:
//  - Global Scope
//  - Local Scope
// Variables defined inside a function are in local scope while variables 
// defined outside of a function are in the global scope. Each function when 
// invoked creates a new scope.

// https://stackoverflow.com/questions/3244361/can-i-access-variables-from-another-file

function testScope() {
  var test = 1;
}

// console.log(test);
// Output
// ReferenceError: test is not defined
// test is function scoped while using test in the global scope
// test has yet to be defined

var globalVar = 'global';

function funcScopeTest() {
  var localVar = 'local';
  if (true) {
    var localVar2 = 'local inside If'; // var is local scoped to the function
    let blockVar = 'block';
  }

  console.log(globalVar);
  console.log(localVar);
  console.log(localVar2);
  // console.log(blockVar); // blockVar no defined - outside block scope
}

funcScopeTest();

// Scope !== Context
// Context refers to `this`

// This is only for browser, in node this is empty
// logs: Window {speechSynthesis: SpeechSynthesis, caches: CacheStorage, localStorage: Storage…}
console.log(this);
console.log("******************");
function logFunction() {
    console.log(this);
}
// This is only for browser, in node this is empty
// logs: Window {speechSynthesis: SpeechSynthesis, caches: CacheStorage, localStorage: Storage…}
// because logFunction() is not a property of an object
logFunction(); 

class User {
  logName() {
    for (let key in this) {
      console.log(this[key]);
    }
  }
}

(new User).logName(); // logs User {}

// Execution Context
// refers to scope and not context
// Each function creates its own execution context
// There can only be one global context but any number of function contexts
// This has all the properties of a stack
// The execution context has two phases of creation and code execution

// Creation Phase

// The first phase that is the creation phase is present when a function is called 
// but its code is not yet executed. Three main things that happen in the creation phase are:

// Creation of the Variable (Activation) Object,
// Creation of the Scope Chain, and
// Setting of the value of context (this)