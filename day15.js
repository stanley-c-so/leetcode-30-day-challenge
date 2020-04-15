// --- Day 15: Product of Array Except Self ---

// Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

// Example:

// Input:  [1,2,3,4]
// Output: [24,12,8,6]
// Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

// Note: Please solve it without division and in O(n).

// Follow up:
// Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

// ----------

// normal solution
function solution_1 (nums) {
  const productsToRight = Array(nums.length).fill(1);
  for (let i = nums.length - 2; i >= 0; i--) {
    productsToRight[i] *= productsToRight[i + 1] * nums[i + 1];         // e.g. [24, 12, 4, 1]
  }
  const productsToLeft = Array(nums.length).fill(1);
  const output = [];
  for (let i = 0; i < nums.length; i++) {
    if (i) productsToLeft[i] *= productsToLeft[i - 1] * nums[i - 1];    // e.g. [1, 1, 2, 6]
    output.push(productsToLeft[i] * productsToRight[i]);                // e.g. [24, 12, 8, 6]
  }
  return output;
}

// if you want to do it in constant space (other than the output), you could abuse the O(n) output you're allowed to create as a substitute for `productsToRight`
function solution_2 (nums) {
  const output = Array(nums.length).fill(1);      // we never have to create a new `productsToRight` array
  for (let i = nums.length - 2; i >= 0; i--) {
    output[i] *= output[i + 1] * nums[i + 1];     // e.g. [24, 12, 4, 1]
  }
  let productToLeft = 1;                          // this single `productToLeft` variable starts at 1, and represents the cumulative product
  for (let i = 0; i < nums.length; i++) {
    output[i] *= productToLeft;                   // take `output[i]` and multiply through with current `productToLeft`...
    productToLeft *= nums[i];                     // ...then update `productToLeft` with current `nums[i]`
  }
  return output;
}

// one-liner - same as above, but using `x` to represent `n.length`, and `n.map(_=>1)` as a faster way to do `Array(nums.length).fill(1)`
var solution_3=(n,x=n.length,o=n.map(_=>1),L=1)=>{for(i=x-2;i>=0;i--)o[i]*=o[i+1]*n[i+1];for(i=0;i<x;i++){o[i]*=L;L*=n[i]}return o}

// thomas luo's one-liner - similar idea. .reduceRight(...) creates `productsToRight`, and .map(...) creates `productsToLeft` and multiples through.
// however, note that `productsToRight` is shifted by 1 (but this logic is accounted for in the latter half by performing work on `a[i+1]` instead of `a[i]`).
// what is `z`? we use `q=>isNaN(q+1)|q` to turn NaN into 1, or leave q alone if it's a number. this turns `undefined` from array out of bounds into 1.
var solution_4=(n,r=l=1,z=q=>isNaN(q+1)|q)=>n.reduceRight((a,e)=>a.unshift(r*=e)&&a,[]).map((_,i,a)=>(l*=z(n[i-1]))*z(a[i+1]))

// my improvement on thomas luo's one-liner - use `z=q=>q==+q?q:1` to shave 2 characters off `z=q=>isNaN(q+1)|q`
var solution_5=(n,r=l=1,z=q=>q==+q?q:1)=>n.reduceRight((a,e)=>a.unshift(r*=e)&&a,[]).map((_,i,a)=>(l*=z(n[i-1]))*z(a[i+1]))

const productExceptSelf = solution_5;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = productExceptSelf;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [1, 2, 3, 4],
};
expected = [24, 12, 8, 6];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: