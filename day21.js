// --- Day 20: Leftmost Column with at Least a One ---

// (This problem is an interactive problem.)

// A binary matrix means that all elements are 0 or 1. For each individual row of the matrix, this row is sorted in non-decreasing order.

// Given a row-sorted binary matrix binaryMatrix, return leftmost column index(0-indexed) with at least a 1 in it. If such index doesn't exist, return -1.

// You can't access the Binary Matrix directly.  You may only access the matrix using a BinaryMatrix interface:

// BinaryMatrix.get(x, y) returns the element of the matrix at index (x, y) (0-indexed).
// BinaryMatrix.dimensions() returns a list of 2 elements [n, m], which means the matrix is n * m.
// Submissions making more than 1000 calls to BinaryMatrix.get will be judged Wrong Answer.  Also, any solutions that attempt to circumvent the judge will result in disqualification.

// For custom testing purposes you're given the binary matrix mat as input in the following four examples. You will not have access the binary matrix directly.

// Example 1:
// 0 0
// 1 1
// Input: mat = [[0,0],[1,1]]
// Output: 0

// Example 2:
// 0 0
// 0 1
// Input: mat = [[0,0],[0,1]]
// Output: 1

// Example 3:
// 0 0
// 0 0
// Input: mat = [[0,0],[0,0]]
// Output: -1

// Example 4:
// 0 0 0 1
// 0 0 1 1
// 0 1 1 1
// Input: mat = [[0,0,0,1],[0,0,1,1],[0,1,1,1]]
// Output: 1
 
// Constraints:

// 1 <= mat.length, mat[i].length <= 100
// mat[i][j] is either 0 or 1.
// mat[i] is sorted in a non-decreasing way.

// ----------

// because this is an "interactive problem" on leetcode, there is a hidden API. we are given the basic API interface which i have replicated as a class below. however,
// we are not told the actual implementation of the .dimensions and .get methods, so i have implemented those myself as i think reasonable. we are further told that
// if more than 1000 calls are submitted to .get (i.e. if you brute force check every cell in the matrix, which could be 100 x 100) then your answer will automatically be
// wrong. to enforce this, i will use a scoped variable.
class BinaryMatrix {
  constructor (matrix) {
    this.matrix = matrix;
  }
  dimensions () {
    return [
      this.matrix.length,
      this.matrix[0].length,
    ]
  }
  get (row, col) {
    return this.matrix[row][col];
  }
}

// O(h + w) solution: initialize current `row` and `col` at the top right. while in bounds, check if current num is 0 or 1. if 0, move down. if 1,update `lowestCol`, and
// move left. `lowestCol` was initialized as `w` initially - if it never changed, then a 1 was never found in the matrix, so we return -1. else, return `lowestCol`
// a quick word: could we further optimize the case where currentNum is a 1 - instead of decrementing col, which would lead to a linear traversal along the row, could we
// apply binary search along the row to find the leftmost 1? it seems that in the extreme case where let's say the first row has 2 1s, the next row has 4 1s, then 6, etc...
// even if you check your immediate left neighbor, you find another 1, and you don't know where the critical point is, so you're applying binary search for each row. that means
// the time complexity is O(log w * h). how does this compare to O(w + h)? well, if let's say w and h were comparable (and let's say w = h = n) then you're comparing
// O(n log n) to O(2n). for a sufficiently large n, log n > 2, so O(w + h) would be better. thus, binary search would not help here.
function solution_1 (binaryMatrix) {
  const [h, w] = binaryMatrix.dimensions();
  let row = 0;                                          // initialize current `row` and `col` at the top right corner
  let col = w - 1;
  let lowestCol = w;                                    // initialize record-keeping variable at `w` (which is out of bounds)
  while (col >= 0 && row < h) {                         // while in bounds...
      const currentNum = binaryMatrix.get(row, col);    // ...check current number...
      if (currentNum) {                                 // ...if 1, update `lowestCol` and move left (there may be more 1s to your left)
          lowestCol = Math.min(lowestCol, col);
          col--;
      }
      else row++;                                       // ...if 0, move down (there are no more 1s to your left, so move down to the next row)
  }
  return lowestCol === w ? -1 : lowestCol;              // if `lowestCol` never changed, then no 1s exist in the matrix so return -1. else, return `lowestCol`
}

// one-liner - basically the above
var solution_2=(b,[h,w]=b.dimensions(),r=0,c=w-1,L=w)=>{while(c>=0&&r<h){n=b.get(r,c);n?(L=L<c?L:c,c--):r++}return L==w?-1:L}

const leftMostColumnWithOne = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = leftMostColumnWithOne;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  binaryMatrix: new BinaryMatrix([
    [0, 0],
    [1, 1],
  ]),
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  binaryMatrix: new BinaryMatrix([
    [0, 0],
    [0, 1],
  ]),
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  binaryMatrix: new BinaryMatrix([
    [0, 0],
    [0, 0],
  ]),
};
expected = -1;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  binaryMatrix: new BinaryMatrix([
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 1],
  ]),
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: