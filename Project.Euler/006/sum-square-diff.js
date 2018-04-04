// The sum of the squares of the first ten natural numbers is,
// 1**2 + 2**2 + ... + 10**2 = 385

// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)**2 = 552 = 3025

// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

const sumSquares = (start, end) => {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += Math.pow(i, 2);
  }
  return sum;
};

const squareSum = (start, end) => {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += i;
  }
  return Math.pow(sum, 2);
};

const slowSumSquareDiff = (start, end) => {
  return squareSum(start, end) - sumSquares(start, end);
};

let start, end, answer;

start = new Date().getTime() / 1000;
answer = slowSumSquareDiff(1, 100);
end = new Date().getTime() / 1000;
console.log(`Brute force sum square difference benchmark: ${end - start}s`);
console.log(`The sum square difference of 1 to 100 is: ${answer}`);