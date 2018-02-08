// Runtime Limit exceeded
// var longestValidParentheses = function(s) {
//   if (validParen(s)) return s.length
  
//   const leftStr = s.substring(0, s.length - 1)
//   const left = longestValidParentheses(leftStr)
  
//   const rightStr = s.substring(1)
//   const right = longestValidParentheses(rightStr)
  
//   return Math.max(left, right)
// };

// const validParen = str => {
//   let count = 0
//   for (let i = 0; i < str.length; i++) {
//       if (str[i] === "(") count++
//       if (str[i] === ")") {
//           if (count < 1) return false
//           count--
//       }
//   }
  
//   return count === 0
// }

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  const size = s.length
  let res = 0
  if (size < 2) return res
  
  const stack = []
  for (let i = 0; i < size; i++) {
      if (s[i] === '(') {
          stack.push(i)
      } else {
          if (stack.length === 0) {
              stack.push(i)
          } else {
              let len = stack.length
              let lastCharInStack = s[stack[len - 1]]
              if (lastCharInStack === '(') {
                  stack.pop()
                  let tempMax = i - (stack.length === 0 ? -1 : stack[stack.length - 1])
                  res = Math.max(tempMax, res)
              } else {
                  stack.push(i)
              }
          }
      }
  }
  
  return res
};