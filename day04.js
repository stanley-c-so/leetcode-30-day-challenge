// --- Day 4: Move Zeroes ---

// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Example:

// Input: [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Note:

// You must do this in-place without making a copy of the array.
// Minimize the total number of operations.

// ----------

// consider two pointers, `write` and `read`. `write` only moves when `read` finds a non-zero, causing `write` to copy that value and increment. after `read` finishes, write 0s to the end

function solution_1 (nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {    // can also use a for of loop, since index doesn't matter
    if (nums[read] !== 0) {
      nums[write] = nums[read];                       // copy the number at position `read` to position `write`
      write++;
    }
  }
  while (write < nums.length) {                       // after `read` reads the entire array, the rest of the array should be 0
    nums[write] = 0;
    write++;
  }
  return nums;                                        // need to return input array for my test suite implementation, but on leetcode, no return is expected (we are modifying array in place)
}

// instead of copying from `read` to `write`, this time we will do swaps. once again, `zeroPointer` only moves when `i` finds a non-zero. when that happens, swap and increment `zeroPointer`

function solution_2 (nums) {
  let zeroPointer = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      [nums[zeroPointer], nums[i]] = [nums[i], nums[zeroPointer]];
      zeroPointer++;
    }
  }
  return nums;
}

// one-liner - adopted from solution 2. for the sake of brevity i am not making this return anything, so it won't pass my test suite, but it passes leetcode

var solution_3=(N,z=0)=>N.forEach((n,i)=>n&&([N[z],N[i]]=[N[i],N[z]],z++))

// thomas luo's solution - the .map is meaningless - any HOF that iterates is fine (the callback creates side effects), but .map is for brevity. in short, a swap happens if `c` is truthy

var solution_4=(n,z=0)=>n.map((c,i)=>c?(n[i]=n[z],n[z++]=c):0)

// my improvement on thomas luo's solution - since you don't need to do anything if `c` is not truthy, we can use && instead of a ternary

var solution_5=(n,z=0)=>n.map((c,i)=>c&&(n[i]=n[z],n[z++]=c))

const moveZeroes = solution_5;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = moveZeroes;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [0, 1, 0, 3, 12],
};
expected = [1, 3, 12, 0, 0];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: