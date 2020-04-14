// --- Day 14: Perform String Shifts ---

// You are given a string s containing lowercase English letters, and a matrix shift, where shift[i] = [direction, amount]:

// direction can be 0 (for left shift) or 1 (for right shift). 
// amount is the amount by which string s is to be shifted.
// A left shift by 1 means remove the first character of s and append it to the end.
// Similarly, a right shift by 1 means remove the last character of s and add it to the beginning.
// Return the final string after all operations.

// Example 1:

// Input: s = "abc", shift = [[0,1],[1,2]]
// Output: "cab"
// Explanation: 
// [0,1] means shift to left by 1. "abc" -> "bca"
// [1,2] means shift to right by 2. "bca" -> "cab"

// Example 2:

// Input: s = "abcdefg", shift = [[1,1],[1,1],[0,2],[1,3]]
// Output: "efgabcd"
// Explanation:  
// [1,1] means shift to right by 1. "abcdefg" -> "gabcdef"
// [1,1] means shift to right by 1. "gabcdef" -> "fgabcde"
// [0,2] means shift to left by 2. "fgabcde" -> "abcdefg"
// [1,3] means shift to right by 3. "abcdefg" -> "efgabcd"

// Constraints:

// 1 <= s.length <= 100
// s only contains lower case English letters.
// 1 <= shift.length <= 100
// shift[i].length == 2
// 0 <= shift[i][0] <= 1
// 0 <= shift[i][1] <= 100

// ----------

function solution_1 (s, shift) {
  const trueShift = shift.reduce((trueAmount, [direction, amount]) => trueAmount += direction ? amount : -amount, 0) % s.length;
  const sArray = s.split('');
  for (let i = 0; i < Math.abs(trueShift); i++) {
    if (trueShift > 0) {
      sArray.unshift(sArray.pop());
    } else {
      sArray.push(sArray.shift());
    }
  }
  return sArray.join('');
}

// one-liner - similar idea to the above, but duplicate the string `(s+s)` and determine where to slice it based on the value of `trueShift`
var solution_2=(s,S,l=s.length,T=S.reduce((t,[d,a])=>d?t+a:t-a,0)%l,x=T>0?l-T:-T)=>(s+s).slice(x,x+l)

// thomas luo and alex mok's one-liner (after several iterations) - instead of reducing the total net rotation of the string, just rotate each time
var solution_3=(s,a)=>a.map(([u,p,x=u?-p:p])=>s=s.slice(x)+s.slice(0,x))&&s

const stringShift = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = stringShift;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  s: 'abc',
  shift: [[0, 1], [1, 2]],
};
expected = 'cab';
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  s: 'abcdefg',
  shift: [[1, 1], [1, 1], [0, 2], [1, 3]],
};
expected = 'efgabcd';
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 3
input = {
  s: 'wpdhhcj',
  shift: [[0, 7], [1, 7], [1, 0], [1, 3], [0, 3], [0, 6], [1, 2]],
};
expected = 'hcjwpdh';
test(func, input, expected, testNum, lowestTest, highestTest);