function showName() {
  console.log("First Name: " + name);
  var name = "Ford";
  console.log("Last Name: " + name);
}

showName();
// First Name: undefined
// Last Name: Ford

// The reason undefined prints first is because the local variable name was hoisted to the top of the function
// Which means it is this local variable that get calls the first time.
// This is how the code is actually processed by the JavaScript engine:
  
function showName () {
  var name; // name is hoisted (note that is undefined at this point, since the assignment happens below)
  console.log ("First Name: " + name); // First Name: undefined

  name = "Ford"; // name is assigned a value

  // now name is Ford
  console.log ("Last Name: " + name); // Last Name: Ford
}

 // Both the variable and the function are named myName
 var myName;
 function myName() {
  console.log ("Rich");
 }
 
 // The function declaration overrides the variable name
 console.log(typeof myName); // function