/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const hashMap = {}
  let i = 0
  let j = 0
  let max = 0
  
  while (j < s.length) {
      if ( !hashMap[s[j]]) {
          hashMap[s[j]] = true
          max = Math.max(max, Object.keys(hashMap).length)
          j++
      } else {
          delete hashMap[s[i]]
          i++
      }
  }
  
  return max
};