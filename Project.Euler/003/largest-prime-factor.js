const isPrime = num => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num !== 1;
};

const questionNum = 600851475143;

let largestFactor;
for (let i = 1, e = Math.sqrt(questionNum); i <= e; i++) {
  if (isPrime(i) && questionNum % i === 0) largestFactor = i;
}

console.log(largestFactor);