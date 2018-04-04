// The first two consecutive numbers to have two distinct prime factors are:

// 14 = 2 × 7
// 15 = 3 × 5

// The first three consecutive numbers to have three distinct prime factors are:

// 644 = 2² × 7 × 23
// 645 = 3 × 5 × 43
// 646 = 2 × 17 × 19.

// Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?

const isPrime = (num) => {
  for (let c = 2, e = Math.sqrt(num); c <= e; c++) {
    if (num % c === 0) return false;
  }

  return num !== 1;
};

const getFactors = (num, memo) => {
  if (num in memo) return memo[num];
  const factors = [];
  for (let i = 2, e = num / 2; i <= e; i++) {
    if (num % i === 0) factors.push(i);
  }
  return factors;
};

const uniqArray = (array) => {
  const obj = {};
  array.forEach( el => {
    obj[el] = true;
  });

  return Object.keys(obj).map(Number);
};

const primeFactors = (num, memo) => {
  if (num in memo) return memo[num];
  const prime = [];
  const factors = getFactors(num, memo);
  
  while (factors.length > 0) {
    let last = factors.pop();
    
    if (!isPrime(last)) {
      factors.push(...getFactors(last, memo));
    } else {
      prime.push(last);
    }
  }

  return uniqArray(prime);
};

const distinctConsecutivePrimeFactors = (n, memo = {}) => {
  let numArr = [];
  for (let c = 1; numArr.length < n; c++) {
    if (c % 1000 === 0) console.log(c);
    let distinctPrime;
    if (c in memo) {
      distinctPrime = memo[c];
    } else {
      distinctPrime = primeFactors(c, memo);
      memo[c] = distinctPrime;
    }
    // console.log(`${c} has [${distinctPrime}] distinct primes`);
    if (distinctPrime.length === n) {
      numArr.push(c);
    } else {
      numArr = [];
    }
  }
  console.log(memo);

  return numArr;
};

// This works but is slow as fuck if input is 4 or more
// use memoization for fix this
const input = Number(process.argv[2]);
console.log(distinctConsecutivePrimeFactors(input));