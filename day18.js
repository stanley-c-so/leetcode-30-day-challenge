// --- Day 18: Minimum Path Sum ---

// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

// Note: You can only move either down or right at any point in time.

// Example:

// Input:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// Output: 7
// Explanation: Because the path 1→3→1→1→1 minimizes the sum.

// ----------

// store two rows representing the cumulative results of traversing through the `grid` (you only need two rows at a time to build up the cumulative grid dynamically). return the final number
function solution_1 (grid) {
  let newTopRow = grid[0].reduce((newRow, curr, i, src) => {                          // create an array based on the top row, where every number accumulates. use `let`
    newRow.push(i ? newRow[i - 1] + src[i] : curr);
    return newRow;
  }, []);
  for (let i = 1; i < grid.length; i++) {
    const newBottomRow = [grid[i][0] + newTopRow[0]];                                 // start the next row with the corresponding `grid` number plus `newTopRow[0]` (make it cumulative)
    for (let j = 1; j < grid[i].length; j++) {                                        // iterate through the rest of the row...
      newBottomRow.push(grid[i][j] + Math.min(newTopRow[j], newBottomRow[j - 1]));    // ...adding the corresponding `grid` number to the lower of the new numbers: i) above it, or 2) to its left
    }
    newTopRow = newBottomRow;                                                         // reassign `newTopRow` to be `newBottomRow`
  }
  return newTopRow[newTopRow.length - 1];                                             // return the last number of `newTopRow` which should be the total
}

// one-liner - basically the above; generate `newTopRow` (`t`) with an empty array and .map; at the very end, to return the last element of `t`, just call .pop()
var solution_2=(g,t=[],屌=g[0].map((c,i)=>t.push(i?c+t[i-1]:c)))=>g.map((你,i)=>i?(b=[g[i][0]+t[0]],t.map((媽,j)=>j?b.push(g[i][j]+Math.min(t[j],b[j-1])):0),t=b):0)|t.pop()

const minPathSum = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = minPathSum;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  grid: [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ],
};
expected = 7;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: