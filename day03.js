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

// minor improvement on thomas luo's solution - since .forEach returns a falsey value, and we want to return a primitive number, we can use bitwise `|` instead of `||`!
var solution_4=(N,r=-Infinity,c=0)=>N.forEach(n=>{c=n>c+n?n:c+n;r=r>c?r:c})|r

// even better improvement on thomas luo's solution - the return value of the HOF doesn't matter, so i chose .map for brevity. by adding `&&r` it still returns `r` in the end
var solution_5=(N,r=-Infinity,c=0)=>N.map(n=>{c=n>c+n?n:c+n;r=r>c?r:c})&&r

// it turns out any bitwise operator coerces an object into `undefined`, so we can use `|r` to save one more character!
var solution_6=(N,r=-Infinity,c=0)=>N.map(n=>{c=n>c+n?n:c+n;r=r>c?r:c})|r

const maxSubArray = solution_6;

// const specialTest = (...args) => {
// };

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

// INITIALLY FAILED THESE TEST CASES: