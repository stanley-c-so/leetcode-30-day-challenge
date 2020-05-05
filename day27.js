// --- Day 27: Maximal Square ---

// Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

// Example:

// Input: 

// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0

// Output: 4

// ----------

function solution_1 (matrix) {
  if (!matrix.length) return 0;               // handle input: []
  const h = matrix.length;
  const w = matrix[0].length;
  let maxArea = 0;
  let dp1 = Array(w + 1).fill(0);             // the grid is bounded by 0s above
  let dp2 = [0];                              // the grid is bounded by 0s to the left, so the current row should start with 0
  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      if (+matrix[row][col]) {                // if this is a 1 in the matrix... (note that the input is in string form, so we have to convert)
        const num = 1 + Math.min(             // ...push in the min of 3 neighbors (top and to the left), and add 1
          dp1[col],                           // top left (note that `dp1` and `dp2` index values are offset by 1 relative to matrix)
          dp1[col + 1],                       // top
          dp2[col],                           // left
        );
        dp2.push(num);
        maxArea = Math.max(maxArea, num**2);  // update `maxArea` as appropriate
      } else {                                // else if this is a 0 in the matrix...
        dp2.push(0);                          // ...push in 0
      }
    }
    dp1 = dp2;                                // replace top row with bottom row
    dp2 = [0];                                // restart bottom row with new array
  }
  return maxArea;
}

// one-liner - basically the above
var solution_2=(m,h=m.length,w=h&&m[0].length,A=0,d=Array(w+1).fill(0),D=[0])=>h?m.map((R,r)=>(R.map((_,c)=>+m[r][c]?(n=1+Math.min(d[c],d[c+1],D[c]),D.push(n),A=A>n**2?A:n**2):D.push(0)),d=D,D=[0]))|A:0

const maximalSquare = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = maximalSquare;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  matrix: [
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0'],
  ],
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: