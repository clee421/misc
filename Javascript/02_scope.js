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
// 'variableObject': {
//   // contains function arguments, inner variable and function declarations
// }

// Creation of the Scope Chain, and
// 'scopeChain': {
//   // contains its own variable object and other variable objects of the parent execution contexts
// }

// Setting of the value of context (this)
// executionContextObject = {
//   'scopeChain': {}, // contains its own variableObject and other variableObject of the parent execution contexts
//   'variableObject': {}, // contains function arguments, inner variable and function declarations
//   'this': valueOfThis
// }

// Code Execution Phase
// In the second phase of the execution context, that is the code execution phase, other values are assigned and the code is finally executed.
// A closure can not only access the variables defined in its outer function but also the arguments of the outer function.


// Public and Private Scope
var Module = (function() {
  function privateMethod() {
      // do something
  }

  return {
      publicMethod: function() {
          // can call privateMethod();
      }
  };
})();

// a more readable version
var Module = (function () {
  function _privateMethod() {
      // do something
  }
  function publicMethod() {
      // do something
  }
  return {
      publicMethod: publicMethod,
  }
})();

// Creating private variables in ES6
// https://medium.com/@davidrhyswhite/private-members-in-es6-db1ccd6128a5


// Changing Context with .call(), .apply() and .bind()
function introduce(name, interest) {
  console.log('Hi! I\'m '+ name +' and I like '+ interest +'.');
  console.log('The value of this is '+ this +'.')
}

introduce('Hammad', 'Coding'); // the way you usually call it
introduce.call(window, 'Batman', 'to save Gotham'); // pass the arguments one by one after the contextt
introduce.apply('Hi', ['Bruce Wayne', 'businesses']); // pass the arguments in an array after the context

// Call is slightly faster in performance than Apply.