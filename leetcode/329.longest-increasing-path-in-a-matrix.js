/*
 * @lc app=leetcode id=329 lang=javascript
 *
 * [329] Longest Increasing Path in a Matrix
    Example 1:

    Input: nums = 
    [
      [9,9,4],
      [6,6,8],
      [2,1,1]
    ] 
    Output: 4 
    Explanation: The longest increasing path is [1, 2, 6, 9].
    Example 2:

    Input: nums = 
    [
      [3,4,5],
      [3,2,6],
      [2,2,1]
    ] 
    Output: 4 
    Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
 */
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
  let longestPath = 0;
  const memo = {};

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const tempPath = findLongestIncreasingPath([i, j], matrix, memo)
      if (tempPath > longestPath) {
        longestPath = tempPath;
      }
    }
  }

  return longestPath;
};

function findLongestIncreasingPath(pos, matrix, memo) {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];

  let path = 0;

  const [px, py] = pos

  const key = `${px}-${py}`
  if (memo[key]) {
    return memo[key]
  }

  const currentNum = matrix[px][py]
  directions.forEach(direction => {
    const [dx, dy] = direction
    const x = px + dx
    const y = py + dy

    if (isValidPosition([x, y], matrix) && matrix[x][y] > currentNum) {
      const tempPath = findLongestIncreasingPath([x, y], matrix, memo)

      memo[`${x}-${y}`] = tempPath
      if (tempPath > path) {
        path = tempPath
      }
    }
  })

  return path + 1;
}

function isValidPosition(pos, matrix) {
  const [x, y] = pos
  return x >= 0 && y >= 0 && x < matrix.length && y < matrix[x].length;
}

