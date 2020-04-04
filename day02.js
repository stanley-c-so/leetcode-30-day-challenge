// --- Day XX: Happy Number ---

// Write an algorithm to determine if a number is "happy".

// A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

// Example: 

// Input: 19
// Output: true
// Explanation: 
// 12 + 92 = 82
// 82 + 22 = 68
// 62 + 82 = 100
// 12 + 02 + 02 = 1

// ----------

function solution_1 (n) {
  function sumSquaresOfDigits (n) {
    return String(n)
      .split('')
      .map(digit => +digit)
      .reduce((sum, digit) => sum + digit ** 2, 0);
  }
  const seen = new Set([n]);                // this set is here to detect cycles
  let processedN = sumSquaresOfDigits(n)    // i introduce this variable here to avoid calculating it twice (in the while loop condition and in the subsequent line)
  while (processedN !== 1) {
    n = processedN;
    if (seen.has(n)) return false;
    seen.add(n);
    processedN = sumSquaresOfDigits(n);
  }
  return true;
}

// one-liner - i cut out the `processedN` and calculate `F(n)` twice to make the code shorter

var solution_2=(n,F=n=>`${n}`.split('').map(d=>+d).reduce((s,d)=>s+d**2,0))=>{const s=new Set([n]);while(F(n)!==1){n=F(n);if(s.has(n)){return !8}s.add(n)}return !0}

// thomas luo's solution:

var solution_3=(n,s={})=>{while(!s[n])s[n]=1,n=`${n}`.split('').reduce((a,e)=>a+e**2,0);return n===1}

const isHappy = solution_3;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = isHappy;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  n: 19,
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);