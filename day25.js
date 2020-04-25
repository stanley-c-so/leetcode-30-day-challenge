// --- Day 25: Jump Game ---

// Given an array of non-negative integers, you are initially positioned at the first index of the array.

// Each element in the array represents your maximum jump length at that position.

// Determine if you are able to reach the last index.

// Example 1:

// Input: [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

// Example 2:

// Input: [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum
//              jump length is 0, which makes it impossible to reach the last index.

// ----------

function solution_1 (nums) {
  const target = nums.length - 1;
  let i = 0;                                      // your current position (starts at 0) aka the current position being analyzed
  let farthest = 0;                               // the farthest you can reach so far (starts at 0)
  while (i <= farthest) {                         // since `i` is always incremented, if this exceeds your `farthest`, you're out of moves...
    farthest = Math.max(farthest, i + nums[i]);     // update `farthest`
    if (farthest >= target) return true;            // once your `farthest` reaches or surpasses `target`, you're good
    i++;                                            // always increment `i`
  }
  return false;                                   // ...so return false
}

// one-liner - basically the above
var solution_2=(n,i=f=0)=>{while(i<=f){x=i+n[i];f=f>x?f:x;if(f>=n.length-1)return !0;i++}return !8}

const canJump = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = canJump;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [2, 3, 1, 1, 4],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [3, 2, 1, 0, 4],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: