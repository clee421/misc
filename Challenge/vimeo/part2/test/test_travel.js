const compareArray = require('./helper/array_compare');
const { travelClockwise } = require('../travel');

const solutionFiveEight = 
  [ "0-0",
    "0-1",
    "0-2",
    "0-3",
    "0-4",
    "1-4",
    "2-4",
    "3-4",
    "4-4",
    "5-4",
    "6-4",
    "7-4",
    "7-3",
    "7-2",
    "7-1",
    "7-0",
    "6-0",
    "5-0",
    "4-0",
    "3-0",
    "2-0",
    "1-0",
    "1-1",
    "1-2",
    "1-3",
    "2-3",
    "3-3",
    "4-3",
    "5-3",
    "6-3",
    "6-2",
    "6-1",
    "5-1",
    "4-1",
    "3-1",
    "2-1",
    "2-2",
    "3-2",
    "4-2",
    "5-2" ];

const resultFiveEight = travelClockwise(5, 8, false);

const passFiveEight = compareArray(resultFiveEight, solutionFiveEight);
console.log(`Test 01, Travel clockwise W: 5, H: 8 - Result: ${passFiveEight}`);