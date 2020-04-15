// --- Day 7: Counting Elements ---

// Given an integer array arr, count element x such that x + 1 is also in arr.

// If there're duplicates in arr, count them seperately.

// Example 1:

// Input: arr = [1, 2, 3]
// Output: 2
// Explanation: 1 and 2 are counted cause 2 and 3 are in arr.

// Example 2:

// Input: arr = [1, 1, 3, 3, 5, 5, 7, 7]
// Output: 0
// Explanation: No numbers are counted, cause there's no 2, 4, 6, or 8 in arr.

// Example 3:

// Input: arr = [1, 3, 2, 3, 5, 0]
// Output: 3
// Explanation: 0, 1 and 2 are counted cause 1, 2 and 3 are in arr.

// Example 4:

// Input: arr = [1, 1, 2, 2]
// Output: 2
// Explanation: Two 1s are counted cause 2 is in arr.

// Constraints:

// 1 <= arr.length <= 1000
// 0 <= arr[i] <= 1000

// ----------

function solution_1 (arr) {
  const dict = {};
  for (const num of arr) {
    if (!(num in dict)) dict[num] = 0;
    dict[num]++;
  }
  let count = 0;
  for (const num of arr) {
    if (num + 1 in dict) count++;
  }
  return count;
}

// one-liner - in the ternary, we can say `d[n] ?` instead of `(n in d) ?` because all existing dictionary entries will be truthy (non-zero)
var solution_2=(a,d={},c=0)=>(a.map(n=>d[n]=d[n]?d[n]+1:1),a.map(n=>d[n+1]?c++:0))&&c

// thomas luo's solution - declare a set right from the start, to skip having to build out the `dict` object
var solution_3=(a,s=new Set(a))=>a.reduce((p,e)=>p+(s.has(e+1)?1:0),0)

// looks like map is still the way to go!
var solution_4=(a,s=new Set(a),c=0)=>a.map(n=>s.has(n+1)?c++:0)|c

const countElements = solution_4;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = countElements;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  arr: [1, 2, 3],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  arr: [1, 1, 3, 3, 5, 5, 7, 7],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  arr: [1, 3, 2, 3, 5, 0],
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  arr: [1, 1, 2, 2],
};
expected = 2;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: