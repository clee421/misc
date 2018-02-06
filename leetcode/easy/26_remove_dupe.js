/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
  if (nums.length < 2) return 1;
  let length = 1;
  let index = 1;
  while (index < nums.length) {
      if (nums[index] > nums[length - 1]) {
          nums[length] = nums[index];
          length++;
      }
      index++;
  }
  return length;
};