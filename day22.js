// --- Day 22: Subarray Sum Equals K ---

// Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.

// Example 1:
// Input:nums = [1,1,1], k = 2
// Output: 2

// Note:
// The length of the array is in range [1, 20,000].
// The range of numbers in the array is [-1000, 1000] and the range of the integer k is [-1e7, 1e7].

// ----------

// to do this in O(n) time you need to use O(n) space. we will keep track of `runningTotal` which is the cumulative sum starting from 0. we maintain a `frequencies` hash table,
// the keys of which represent all unique values of `runningTotal + k` encountered thus far, and the values of which are the frequencies, which is why it is initialized as
// { [k]: 1 }. iterate through the nums of the array. update `runningTotal`, and if it was previously recorded as a possible `target` in our hash table, then we have found x new
// contiguous subarrays if x is the corresponding frequency. then, calculate the current target value of `runningTotal + k` and add that to the hash table.
function solution_1 (nums, k) {
  const frequencies = { [k]: 1 };     // because `runningTotal` begins at 0, and 0 + k = k
  let runningTotal = 0;
  let numArrays = 0;                  // this counter will be the output
  for (const num of nums) {
    runningTotal += num;                                                        // update cumulative `runningTotal`
    if (runningTotal in frequencies) numArrays += frequencies[runningTotal];    // does this match any targets derived from earlier values of `runningTotal`?
    const target = runningTotal + k;                                            // calculate the new `target`
    if (!(target in frequencies)) frequencies[target] = 0;
    frequencies[target]++;                                                      // update the hash map
  }
  return numArrays;
}

// one-liner - basically the above. curiously, if we used the same variable for both `N` and `n` it still works because of scoping rules
var solution_2=(N,k,f={[k]:1},r=a=0)=>N.map(n=>(r+=n,a+=(f[r]|0),f[r+k]=f[r+k]+1||1))&&a

const subarraySum = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = subarraySum;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [1, 1, 1],
  k: 2
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: