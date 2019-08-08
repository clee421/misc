/*
 * @lc app=leetcode id=581 lang=javascript
 *
 * [581] Shortest Unsorted Continuous Subarray
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
    const length = nums.length
    let start = 0;
    let end = -1;
    let min = nums[length - 1]
    let max = nums[0]

    for (let i = 0; i < length; i++) {
      if (max <= nums[i]) {
        max = nums[i]
      } else {
        end = i
      }

      const j = length - i - 1
      if (min >= nums[j]) {
        min = nums[j]
      } else {
        start = j
      }
    }

    return end - start + 1;
};

