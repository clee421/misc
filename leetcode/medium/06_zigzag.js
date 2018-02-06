/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  let zigZag = "";
  if (numRows === 1) return s;
  
  let stepOne, stepTwo;
  let len = s.length;
  for (let i = 0; i < numRows; i++) {
      stepOne = 2 * (numRows - 1 - i);
      stepTwo = 2 * i;
      
      let pos = i
      if (pos < len) zigZag += s[pos]
      while (true) {
          
          pos += stepOne;
          if (pos >= len) break;
          if (stepOne) zigZag += s[pos]
          
          pos += stepTwo
          if (pos >= len) break;
          if (stepTwo) zigZag += s[pos]
      }
  }
  
  return zigZag
};