/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  const solutionSet = []
  const sortedNums = nums.sort((a, b) => a - b)
  
  for (let i = 0; i < sortedNums.length - 2; i++) {
      if (i === 0 || (sortedNums[i] !== sortedNums[i - 1])) {
          let indexStart = i + 1
          let indexEnd = sortedNums.length - 1
          const target = 0 - sortedNums[i]
          while (indexStart < indexEnd) {
              if (sortedNums[indexStart] + sortedNums[indexEnd] === target) {
                  solutionSet.push([sortedNums[i], sortedNums[indexStart], sortedNums[indexEnd]])
                  do {
                      indexStart++
                  } while (sortedNums[indexStart] === sortedNums[indexStart - 1])
                  do {
                      indexEnd--
                  } while (sortedNums[indexEnd] === sortedNums[indexEnd + 1])
              } else if (sortedNums[indexStart] + sortedNums[indexEnd] > target) {
                  indexEnd--
              } else {
                  indexStart++
              }
          }
      }
  }
  
  return solutionSet
};
