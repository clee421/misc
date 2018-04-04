// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
// What is the 10 001st prime number?

const isPrime = num => {
  for (let i = 2, e = Math.sqrt(num); i <= e; i++) {
    if (num % i === 0) return false;
  }
  return num !== 1;
};

const nthPrimeNumber = n => {
  let primeCount = 0;
  let count = 1;
  while (true) {
    if (isPrime(count)) primeCount++;
    if (primeCount >= n) return count;
    count++;
  }
};


let start, end, answer;

start = new Date().getTime() / 1000;
answer = nthPrimeNumber(10001);
end = new Date().getTime() / 1000;
console.log(`Brute force 10,001 prime benchmark: ${end - start}s`);
console.log(`The 10,001 prime is: ${answer}`);