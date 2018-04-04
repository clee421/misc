// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

const isPalindrome = num => {
  const stringNum = num.toString();
  let start = 0, 
      end = stringNum.length - 1;

  while (start <= end) {
    if (stringNum[start] !== stringNum[end]) return false;
    start++;
    end--;
  }
  return true;
};

const largestPalindromeProduct = digit => {
  const largestOfDigitSize = Math.pow(10, digit) - 1; 
  let left = largestOfDigitSize;
  let currentLargestPalindrome = -1;
  let pair = [-1, -1];
  while (left > 0) {
    let right = left;
    while (right > 0) {
      let product = left * right;
      if (isPalindrome(product) && product > currentLargestPalindrome) {
        currentLargestPalindrome = product;
        pair[0] = left;
        pair[1] = right;
      }
      right--;
    }
    left--;
  }
  return [...pair, currentLargestPalindrome];
};

const round = function(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};

let start, end, answer;

start = new Date().getTime() / 1000;
answer = largestPalindromeProduct(3);
end = new Date().getTime() / 1000;
console.log(`Brute force largest palindrome benchmark: ${round((end - start), 3)}s`);
console.log(`Largest 3 digit palindrome: ${answer[2]}`);
console.log(`Product of: ${answer[0]} x ${answer[1]}`);