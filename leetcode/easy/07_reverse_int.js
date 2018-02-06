/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let total = 0
  let sign = x < 0 ? -1 : 1
  x = Math.abs(x)
  
  while (x !== 0) {
      let lastDig = x % 10
      
      total = (total * 10) + lastDig
      if ( total > 2147483647 ) return 0

      x = Math.floor(x / 10)
  }
  
  return sign * total
};