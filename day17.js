// --- Day 17: Number of Islands ---

// Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:

// Input:
// 11110
// 11010
// 11000
// 00000

// Output: 1

// Example 2:

// Input:
// 11000
// 11000
// 00100
// 00011

// Output: 3

// ----------

function solution_1 (grid) {
  if (!grid.length) return 0;           // edge case: []
  const h = grid.length;
  const w = grid[0].length;             // note: this assumes that input is a proper rectangle
  function markIsland (stack) {
    while (stack.length) {
      const [currRow, currCol] = stack.pop();
      grid[currRow][currCol] = 'i';                                 // mark as visited. can change this to anything (other than '1'), but i'll preserve the data by NOT changing it to '0'
      if (currRow && grid[currRow - 1][currCol] === '1') {          // check up
        stack.push([currRow - 1, currCol]);
      }
      if (currRow < h - 1 && grid[currRow + 1][currCol] === '1') {  // check down
        stack.push([currRow + 1, currCol]);
      }
      if (currCol && grid[currRow][currCol - 1] === '1') {          // check left
        stack.push([currRow, currCol - 1]);
      }
      if (currCol < w - 1 && grid[currRow][currCol + 1] === '1') {  // check right
        stack.push([currRow, currCol + 1]);
      }
    }
  }
  let islands = 0;
  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      if (grid[row][col] === '1') {
        islands++;
        markIsland([[row, col]]);       // directly feed in the stack, preinitialized with [row, col]
      }
    }
  }
  return islands;
}

// one-liner - basically the above
var solution_2=(g,h=g.length,w=h&&g[0].length,i=0,m=s=>{while(s.length){[r,c]=s.pop();g[r][c]=2;r&&g[r-1][c]==1?s.push([r-1,c]):0;r<h-1&&g[r+1][c]==1?s.push([r+1,c]):0;c&&g[r][c-1]==1?s.push([r,c-1]):0;c<w-1&&g[r][c+1]==1?s.push([r,c+1]):0;}})=>h?g.map((r,R)=>r.map((c,C)=>g[R][C]==1?(i++,m([[R,C]])):0))&&i:0

// thomas luo's one-liner - using a recursive helper `h` that takes in coordinates and returns if out of bounds or do not hold land, and sets the value to water otherwise.
// no need to worry about [] input because the only thing that checks .length is the helper, which is only invoked in the inner .map (which would only happen if the input is truly 2D)
var solution_3=(g,n=0,h=(r,c)=>r>=0&&r<g.length&&c>=0&&c<g[0].length&&g[r][c]==1?(g[r][c]=0,h(r+1,c),h(r-1,c),h(r,c+1),h(r,c-1)):0)=>g.map((e,r)=>e.map((e,c)=>e==1?(n++,h(r,c)):0))&&n

const numIslands = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = numIslands;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  grid: [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ],
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  grid: [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ],
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: