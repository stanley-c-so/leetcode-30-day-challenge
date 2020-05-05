// --- Day 23: Bitwise AND of Numbers Range ---

// Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.

// Example 1:

// Input: [5,7]
// Output: 4

// Example 2:

// Input: [0,1]
// Output: 0

// ----------

// this brute force solution will pass my test suite but will fail leetcode by design - for test case [0, 2147483647], it would time out!
function solution_0 (m, n) {
  let output = m;
  for (let i = m + 1; i <= n; i++) {
      output = output & i;
  }
  return output;
}

// write out `m` and `n` in their binary representations. make sure `m` has enough '0's in the beginning to match the length of `n`. then iterate through both strings while building out the answer as a
// bitwise string: while the `m` and `n` digits match, then the answer will also match, but as soon as there is a deviation (the "critical point"), the rest of the string must be '0'. it makes sense,
// because if you were to manually find the bitwise AND of every number between `m` and `n` inclusive, then every digit from the critical point all the way to end will change at some point. this solution
// has time complexity O(log n) because it is proportional to the length of the bitwise representation of `n`.
function solution_1 (m, n) {
  n = n.toString(2);
  m = m.toString(2);
  if (m.length < n.length) m = '0'.repeat(n.length - m.length) + m;   // add '0's to make `m.length` match `n.length`
  let bitwiseAND = '';                                                // build out the answer as a string
  let same = true;                                                    // when we reach the critical point, this will become false
  for (let i = 0; i < n.length; i++) {
      if (m[i] !== n[i]) same = false;                                // check for critical point
      bitwiseAND += same ? n[i] : '0';                                // copy either string while they match. after the critical point, just insert '0'
  }
  return parseInt(bitwiseAND, 2);                                     // convert bitwiseAND back to its integer form
}

// one-liner - basically the above, but with `L='length'` and `m[L]` to save characters
var solution_2=(m,n,f=N=>N.toString(2),L='length',b='',s=!0)=>{m=f(m);n=f(n);d=n[L]-m[L];d?m='0'.repeat(d)+m:0;for(i=0;i<n[L];i++){s=m[i]!=n[i]?!8:s;b+=s?n[i]:'0'}return parseInt(b,2)}

// this is somebody's solution on leetcode (thomas luo found it). because `n` keeps getting reassigned to `n & n-1`, at first this will force the rightmost digit to be 0, then
// `n-1` will change the next digit over, so after `n & n-1` again this will make the second digit from the right be 0, etc... the net result is it's basically zeroing out from
// the right end until it reaches the critical point (when `n` is no longer greater than `m`). if you inspect the value of `n` with each iteration you will see it decreasing by 2,
// then 4, then 8, then 16... etc. (until it dips below `m`). for this reason this will also have O(log n) time complexity.
function solution_3 (m, n) {
  while (n > m) {
    n = n & n-1;
  }
  return n;
}

// one-liner - basically the above
var solution_4=(m,n)=>{while(n>m)n=n&n-1;return n}

const rangeBitwiseAnd = solution_4;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = rangeBitwiseAnd;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  m: 5,
  n: 7,
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  m: 0,
  n: 1,
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 3
input = {
  m: 0,
  n: 2147483647,
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);