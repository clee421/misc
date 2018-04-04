// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

// Using prime numbers only makes more sense, but this is more applicable only
// at larger ranges of numbers. At lower ranges it just takes more work
// to check primes than to check modulo in multiple of range
const isPrime = num => {
  for (let i = 2, e = Math.sqrt(num); i <= e; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const multipleOfRange = (num, start, end) => {
  for (let n = start; n <= end; n++) {
    if (num % n !== 0) return false;
  }
  return true;
};

const smallestMultipleSlow = (start, end) => {
  let largestMultiple = 1;
  for (let i = start; i <= end; i++) {
    largestMultiple *= i;
  }

  for (let s = end; s <= largestMultiple; s++) {
    if (multipleOfRange(s, start, end)) return s;
  }
};

const smallestMultipleFast = (start, end) => {
  let largestMultiple = 1;
  for (let i = start; i <= end; i++) {
    largestMultiple *= i;
  }

  for (let s = end; s <= largestMultiple; s += end) {
    if (multipleOfRange(s, start, end)) return s;
  }
};

let start, end, answer;

start = new Date().getTime() / 1000;
answer = smallestMultipleFast(1, 20);
end = new Date().getTime() / 1000;
console.log(`Optimized smallest multiple benchmark: ${end - start}s`);
console.log(`Smallest multiple of range 1-20: ${answer}`);

start = new Date().getTime() / 1000;
answer = smallestMultipleSlow(1, 20);
end = new Date().getTime() / 1000;
console.log(`Brute force smallest multiple benchmark: ${end - start}s`);
console.log(`Smallest multiple of range 1-20: ${answer}`);

