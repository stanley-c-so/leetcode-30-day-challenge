// --- Day 1: Single Number ---

// Given a non-empty array of integers, every element appears twice except for one. Find that single one.

// Note:

// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Example 1:

// Input: [2,2,1]
// Output: 1
// Example 2:

// Input: [4,1,2,1,2]
// Output: 4

// ----------

function solution_1 (nums) {
  const set = new Set();
  for (const num of nums) {
      if (set.has(num)) {
          set.delete(num);
      } else {
          set.add(num);
      }
  }
  return [...set][0];
}

// to do it without extra space, initialize `currentNum` at 0 and then run bitwise xor (^ symbol) through all the numbers. the odd number out will remain.

function solution_2 (nums) {
  let currentNum = 0;
  for (const num of nums) {
    currentNum = currentNum ^ num;
  }
  return currentNum;
}

// one liner - reduce is handy, and you don't even need a starting value since the array is guaranteed to be non-empty

var solution_3=N=>N.reduce((c,n)=>c^n)

const singleNumber = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = singleNumber;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [2, 2, 1],
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [4, 1, 2, 1, 2],
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: