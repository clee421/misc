// The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.
// There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.
// How many circular primes are there below one million?

const oneMillion = 1000000;

const isPrime = num => {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++)
    if(num % i === 0) return false; 
  return num !== 1;
};

const rotateNumber = num => {
  if (num <= 10) return num;
  const len = num.toString().length;
  const mod = Math.pow(10, (len - 1));
  const firstDigit = Math.floor(num / mod);
  const backHalf = num % mod;
  const missingZero = len - backHalf.toString().length - 1;
  return (backHalf * 10 + firstDigit) * Math.pow(10, missingZero);
};

const rotatePrime = num => {
  const original = num;
  do {
    if (!isPrime(num)) return false;
    num = rotateNumber(num);
  } while (num !== original);
  return true;
};

const rotatePrimeWithCheck = num => {
  const original = num;
  do {
    if (num < original || !isPrime(num)) return false;
    num = rotateNumber(num);
  } while (num !== original);
  return true;
};

const largestFirstDigitAndOdd = num => {
  const stringNum = num.toString();
  if (Number(stringNum[0]) % 2 === 0) return false;
  for (let i = 1; i < stringNum.length; i++) {
    if (stringNum[i] < stringNum[0]) return false;
    if (Number(stringNum[i]) % 2 === 0) return false;
  }
  return true;
};

// toString() only works up to 16 digit numbers
const allSameDigit = num => {
  const stringNum = num.toString();
  let count = 1;
  for (let i = 1; i < stringNum.length; i++) {
    if (stringNum[0] === stringNum[i]) count++;
  }
  return count === stringNum.length;
};


// largestFirstDigitAndOdd(i) reduces benchmark time by 90%
const optimizedPrimeCount = () => {
  let count = 1;
  for (let i = 3; i <= oneMillion; i += 2) {
    if (largestFirstDigitAndOdd(i) && rotatePrimeWithCheck(i)) {
      allSameDigit(i) ? count++ : count += i.toString().length;
    }
  }
  return count;
};

const slowPrimeCount = () => {
  let count = 1;
  for (let i = 3; i <= oneMillion; i += 2) {
    if (rotatePrime(i)) {
      count++;
    }
  }
  return count;
};

let start, count, end;

start = new Date().getTime() / 1000;
count = optimizedPrimeCount();
end = new Date().getTime() / 1000;
console.log(`Fast circular prime benchmark: ${end - start}s`);
console.log(`Total numbers of circular primes(fast): ${count}`);

start = new Date().getTime() / 1000;
count = slowPrimeCount();
end = new Date().getTime() / 1000;
console.log(`Slow circular prime benchmark: ${end - start}s`);
console.log(`Total numbers of circular primes(fast): ${count}`);