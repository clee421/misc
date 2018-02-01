/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const complimentHash = {}
    for (let i = 0; i < nums.length; i++) {
        if (complimentHash[target - nums[i]] === undefined) {
            complimentHash[nums[i]] = i
        } else {
            return [complimentHash[target - nums[i]], i]
        }
    }
    return []
};