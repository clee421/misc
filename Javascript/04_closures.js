function showName (firstName, lastName) {
  var nameIntro = "Your name is ";
  // this inner function has access to the outer function's variables, including the parameter
  function makeFullName() {     
    return nameIntro + firstName + " " + lastName;
  }
  
  return makeFullName();
}
  
let name = showName("Michael", "Jackson"); // Your name is Michael Jackson
console.log(name);

// Closures’ Rules and Side Effects

// 1. Closures have access to the outer function’s variable even after the outer function returns:
// One of the most important and ticklish features with closures is that the inner function still 
// has access to the outer function’s variables even after the outer function has returned. Yep, you 
// read that correctly. When functions in JavaScript execute, they use the same scope chain that was 
// in effect when they were created. This means that even after the outer function has returned, the 
// inner function still has access to the outer function’s variables. Therefore, you can call the 
// inner function later in your program. This example demonstrates:

function celebrityName (firstName) {
  var nameIntro = "This celebrity is ";
  // this inner function has access to the outer function's variables, including the parameter
 function lastName (theLastName) {
      return nameIntro + firstName + " " + theLastName;
  }
  return lastName;
}

var mjName = celebrityName ("Michael"); // At this juncture, the celebrityName outer function has returned.

// The closure (lastName) is called here after the outer function has returned above
// Yet, the closure still has access to the outer function's variables and parameter
mjName ("Jackson"); // This celebrity is Michael Jackson

//2.  Closures store references to the outer function’s variables; they do not store the actual value. 
// Closures get more interesting when the value of the outer function’s variable changes before the 
// closure is called. And this powerful feature can be harnessed in creative ways, such as this 
// private variables example first demonstrated by Douglas Crockford:

function celebrityID () {
  var celebrityIDVar = 999;
  // We are returning an object with some inner functions
  // All the inner functions have access to the outer function's variables
  return {
    getID: function ()  {
      // This inner function will return the UPDATED celebrityIDVar variable
      // It will return the current value of celebrityIDVar, even after the changeTheID function changes it
      return celebrityIDVar;
    },
    setID: function (theNewID)  {
      // This inner function will change the outer function's variable anytime
      celebrityIDVar = theNewID;
    }
  }

}

var mjID = celebrityID (); // At this juncture, the celebrityID outer function has returned.
mjID.getID(); // 999
mjID.setID(567); // Changes the outer function's variable
mjID.getID(); // 567: It returns the updated celebrityId variable

// 3. Closures Gone Awry
// Because closures have access to the updated values of the outer function’s variables, 
// they can also lead to bugs when the outer function’s variable changes with a for loop. Thus:
// This example is explained in detail below (just after this code box).
function celebrityIDCreator (theCelebrities) {
  var i;
  var uniqueID = 100;
  for (i = 0; i < theCelebrities.length; i++) {
    // This does not work because a reference to i is held and
    // i will be 3 on any id invocation
    // theCelebrities[i]["id"] = function()  {
    //   return uniqueID + i;
    // }
    theCelebrities[i]["id"] = function (j)  {
      return function() {
        return uniqueID + j;
      }
    }(i)
  }
  
  return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];

var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

var stalloneID = createIdForActionCelebs [0];
console.log(stalloneID.id()); // 103 // Fixed with new code