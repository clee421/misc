const compareArray = require('./helper/array_compare');
const { travelClockwise } = require('../travel');
const { solutionFiveEight } = require('./solution/solution_travel');

// TESTING STARTS HERE!!
const resultFiveEight = travelClockwise(5, 8, false);

const passFiveEight = compareArray(resultFiveEight, solutionFiveEight);
console.log(`Test 01, Travel clockwise W: 5, H: 8 - Result: ${passFiveEight}`);