/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
  const sol = []
  let n = s.length
  let count = words.length
  if (n <= 0 || count <= 0) return sol
  
  const dict = {}
  for(let i = 0; i < words.length; i++) {
      if(dict.hasOwnProperty(words[i])) {
          dict[words[i]]++
      } else {
          dict[words[i]] = 1
      }
      
  }
  
  const wordLength = words[0].length
  for(let i = 0; i < wordLength; i++) {
      let left = i
      let tcount = 0
      let tdict = {}
      for(let j = i; j <= n - wordLength; j += wordLength) {
          let str = s.substring(j, j + wordLength)
          if (dict.hasOwnProperty(str)) {
              if(tdict.hasOwnProperty(str)) {
                  tdict[str]++
              } else {
                  tdict[str] = 1
              }
              if(tdict[str] <= dict[str]) {
                  tcount++
              } else {
                  while(tdict[str] > dict[str]) {
                      let tstr = s.substring(left, left + wordLength)
                      tdict[tstr]--
                      if (tdict[tstr] < dict[tstr]) tcount--
                      left += wordLength
                  }
              }
              
              if (tcount === count) {
                  sol.push(left)
                  let tstr = s.substring(left, left + wordLength)
                  tdict[tstr]--
                  tcount--
                  left += wordLength
              }
          } else {
              tdict = {}
              tcount = 0
              left = j + wordLength
          }
      }
  }
  
  return sol
};