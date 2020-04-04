// --- Day 3: Maximum Subarray ---

// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

// Example:

// Input: [-2,1,-3,4,-1,2,1,-5,4],
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.
// Follow up:

// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

// ----------

// kadane's algorithm

function solution_1 (nums) {
  let record = currentBest = nums[0];
  for (let i = 1; i < nums.length; i++) {
      currentBest = Math.max(currentBest + nums[i], nums[i]);
      record = Math.max(record, currentBest);
  }
  return record;
}

// one-liner - iterate through all nums in the array, but initialize `record` at -Infinity and `currentBest` at 0 so the logic holds for the first element

var solution_2=(N,r=-Infinity,c=0)=>{N.forEach(n=>{c=Math.max(c+n,n);r=Math.max(r,c)});return r}

// thomas luo's solution - it runs the .forEach first, but since .forEach always evaluates to undefined, the entire || expression will return the right side, which is `r` here

var solution_3=(N,r=-Infinity,c=0)=>N.forEach(n=>{c=n>c+n?n:c+n;r=r>c?r:c})||r

const maxSubArray = solution_3;

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = maxSubArray;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
};
expected = 6;
test(func, input, expected, testNum, lowestTest, highestTest);