// --- Day 13: Contiguous Array ---

// Given a binary array, find the maximum length of a contiguous subarray with equal number of 0 and 1.

// Example 1:
// Input: [0,1]
// Output: 2
// Explanation: [0, 1] is the longest contiguous subarray with equal number of 0 and 1.

// Example 2:
// Input: [0,1,0]
// Output: 2
// Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
// Note: The length of the given binary array will not exceed 50,000.

// ----------

// track `delta`: when you see a 1, increment. when you see a 0, decrement. the key idea is that `delta` will be the same before and after any contiguous subarray with equal parts 0s and 1s. we will keep
// a `ref` object where the keys are various `delta` values, and the corresponding values are the earliest index where that `delta` was reached. iterate through the array, and if your current `delta`
// is not in the `ref` object, save the current index. otherwise, find the difference between current index and `ref` index (the earliest appearance of that `delta`), and update `record` as appropriate
function solution_1 (nums) {
  const ref = {0: -1};                                // this object stores the index of the first occurrence of the `delta` value. we assume 0 'occurs' at index -1 (before the array begins)
  let record = 0;                                     // this is the longest length so far of a contiguous subarray of equal parts 0s and 1s
  let delta = 0;                                      // this increments when a 1 is encountered, or decrements when a 0 is encountered
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) delta++;                             // increment for 1
    else delta--;                                     // decrement for 0
    if (!(delta in ref)) ref[delta] = i;              // new `delta`? add new entry into `ref`
    else record = Math.max(record, i - ref[delta]);   // old `delta`? you have a contiguous subarray with equal parts 0s and 1s. update `record` as appropriate
  }
  return record;
}

// one-liner - basically the above
var solution_2=(n,R={0:-1},r=d=0)=>n.map((e,i)=>(e?d++:d--,d in R?(x=i-R[d],r=r>x?r:x):R[d]=i))|r

const findMaxLength = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = findMaxLength;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [0, 1],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [0, 1, 0],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: