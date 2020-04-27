// --- Day 26: Longest Common Subsequence ---

// Given two strings text1 and text2, return the length of their longest common subsequence.

// A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.

// If there is no common subsequence, return 0.

// Example 1:

// Input: text1 = "abcde", text2 = "ace" 
// Output: 3  
// Explanation: The longest common subsequence is "ace" and its length is 3.

// Example 2:

// Input: text1 = "abc", text2 = "abc"
// Output: 3
// Explanation: The longest common subsequence is "abc" and its length is 3.

// Example 3:

// Input: text1 = "abc", text2 = "def"
// Output: 0
// Explanation: There is no such common subsequence, so the result is 0.

// Constraints:

// 1 <= text1.length <= 1000
// 1 <= text2.length <= 1000
// The input strings consist of lowercase English characters only.

// ----------

// this is similar to levenshtein distance. we will create a dynamic programming table (but we'll only need 2 rows at a time). imagine a grid
// with one string across the top, and another going up and down. imagine this grid is also bounded by 0s along the top and left. each grid position
// represents what the answer would be if each string ended at the point marked out by that position. fill in the grid as follows:
// - if latest letter of both strings match at that position, then it's like you added the same marginal letter to both, so go up left, grab the
//   same result, and add 1
// - else, if they don't match, then take the bigger number between the one above, and the one to the left (because either marginal letter did not
//   change the result)
// the bottom left number is the answer.

function solution_1 (text1, text2) {
  let dp1 = Array(text2.length + 1).fill(0);          // the grid is bounded by 0s above
  let dp2 = [0];                                      // the grid is bounded by 0s to the left, so the current row should start with 0
  for (let row = 0; row < text1.length; row++) {
    for (let col = 0; col < text2.length; col++) {
      if (text1[row] === text2[col]) {
        dp2.push(dp1[col] + 1);                       // the index value within the strings is offset relative to the index value of the grid
      } else {
        dp2.push(Math.max(dp1[col + 1], dp2[col]));   // ditto
      }
    }
    dp1 = dp2;                                        // replace top row with bottom row
    dp2 = [0];                                        // restart bottom row with new array
  }
  return dp1[dp1.length - 1];                         // return final number of final row (use `dp1`, because `dpi1 = dp2` at end of loop)
}

// one-liner - basically the above
var solution_2=(t,T,L=T.length,d=Array(L+1).fill(0),D=[0])=>{for(r=0;r<t.length;r++){for(c=0;c<L;c++){D.push(t[r]==T[c]?d[c]+1:Math.max(d[c+1],D[c]))}d=D;D=[0]}return d.pop()}

const longestCommonSubsequence = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = longestCommonSubsequence;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  text1: 'abcde',
  text2: 'ace',
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  text1: 'abc',
  text2: 'abc',
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  text1: 'abc',
  text2: 'def',
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: