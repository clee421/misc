const requestData = require('./RequestData.js');
const computeData = require('./ComputeData.js');

requestData().then(function(data) {
  const calculatedAssignments = computeData(data);
  sendData(calculatedAssignments);
})

// This will be a function that sends the data wherever it needs to go
const sendData = function(data) {
  console.log(data);
};