// Rules
// 1 - If the new keyword is used when calling the function, this inside the function is a brand new object created by the JavaScript engine.

function ConstructorExample() {
  console.log(this);
  this.value = 10;
  console.log(this);
}

new ConstructorExample();

// -> ConstructorExample {}
// -> ConstructorExample { value: 10 }

// 2 - If apply, call, or bind are used to call a function, this inside the function is the object that is passed in as the argument.
function fn() {
  console.log(this);
}

var obj = {
  value: 5
};

var boundFn = fn.bind(obj);

boundFn(); // -> { value: 5 }
fn.call(obj); // -> { value: 5 }
fn.apply(obj); // -> { value: 5 }

// 3 - If a function is called as a method — that is, if dot notation is used to invoke 
// the function — this is the object that the function is a property of. In other words, 
// when a dot is to the left of a function invocation, this is the object to the left
//  of the dot. (ƒ symbolizes function in the code blocks)
var obj = {
  value: 5,
  printThis: function() {
    console.log(this);
  }
};

obj.printThis(); // -> { value: 5, printThis: ƒ }

// 4 - If a function is invoked as a free function invocation, meaning it was invoked 
// without any of the conditions present above, this is the global object. In a browser, 
// it’s window.
function fn() {
  console.log(this);
}

// In browser:
// console.log(fn === window.fn); // -> true
// In node window does not exist
// To set a global variable, use global instead of window.
// global["myvar"] = value

// 5 - If multiple of the above rules apply, the rule that is higher wins and will set the this value.
var obj = {
  value: 'hi',
  printThis: function() {
      console.log(this);
  }
};

var print = obj.printThis;

obj.printThis(); // -> {value: "hi", printThis: ƒ}
print(); // -> Window {stop: ƒ, open: ƒ, alert: ƒ, ...}

// If rules 1 and 3 both apply, rule 1 takes precendence.
var obj1 = {
  value: 'hi',
  print: function() {
      console.log(this);
  },
};

new obj1.print(); // -> print {}

// Libraries will sometimes intentionally bind the value of this inside their functions. 
// this is bound to the most useful value for use in the function. jQuery, for example, 
// binds this to the DOM element triggering an event in the callback to that event. If a 
// library has an unexpected this value that doesn’t seem to follow the rules, check its
//  documentation. It’s likely being bound using bind.