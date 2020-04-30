// --- Day 30: Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree ---

// Given a binary tree where each path going from the root to any leaf form a valid sequence, check if a given string is a valid sequence in such binary tree. 

// We get the given string from the concatenation of an array of integers arr and the concatenation of all values of the nodes along a path results in a sequence in the given binary tree.
 
// Example 1:
/*
        0
      /   \
    1       0
   / \     /
  0   1   0
  \   /\
   1  0 0
*/

// Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,0,1]
// Output: true
// Explanation: 
// The path 0 -> 1 -> 0 -> 1 is a valid sequence (green color in the figure). 
// Other valid sequences are: 
// 0 -> 1 -> 1 -> 0 
// 0 -> 0 -> 0

// Example 2:
/*
        0
      /   \
    1       0
   / \     /
  0   1   0
  \   /\
   1  0 0
*/

// Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,0,1]
// Output: false 
// Explanation: The path 0 -> 0 -> 1 does not exist, therefore it is not even a sequence.

// Example 3:
/*
        0
      /   \
    1       0
   / \     /
  0   1   0
  \   /\
   1  0 0
*/

// Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,1]
// Output: false
// Explanation: The path 0 -> 1 -> 1 is a sequence, but it is not a valid sequence.
 
// Constraints:

// 1 <= arr.length <= 5000
// 0 <= arr[i] <= 9
// Each node's value is between [0 - 9].

// ----------

// BFS solution: first, validate the root. then traverse the tree with BFS, adding only those children who would continue a valid
// sequence. when you reach the end of the input array, just make sure that the corresponding node has no more children. as soon as
// any valid path is found, return true. otherwise, if the queue dries up, return false.
// as far as time efficiency is concerned, we could implement a queue with a linked list... OR, we could use a stack (see solution 2)
function solution_1 (root, arr) {
  if (arr[0] !== root.val) return false;              // if the first value in `arr` does not match `root.val`, return false
  if (arr.length === 1) {                             // edge case: `arr.length` is 1...
    return !root.left && !root.right                  // check that `root` has no children (we already verified above that val matches)
  }
  const queue = [[root, 1]];                          // initialize `queue`: each element is [currentNode, correspondingArrIdx + 1]
  while (queue.length) {                              // while `queue` is not empty...
    const [node, i] = queue.shift();                  // destructure to grab `node` (currentNode) and `i` (correspondingArrIdx + 1)
    if (node.left && node.left.val === arr[i]) {      // if left child matches the next `arr` item...
      if (                                            // ...first check if this is the end of the sequence
        i === arr.length - 1 &&                       // (`i` is the final number)
        !node.left.left &&                            // (left child cannot have any children)
        !node.left.right
      ) return true;                                  // ...if the above checks pass, we have found a valid sequence, so return true
      queue.push([node.left, i + 1]);                 // ...else, we may be in the middle of a valid sequence, so enqueue left child
    }
    if (node.right && node.right.val === arr[i]) {    // (same logic as above for right child)
      if (
        i === arr.length - 1 &&
        !node.right.left &&
        !node.right.right
      ) return true;
      queue.push([node.right, i + 1]);
    }
  }
  return false;                                       // if `queue` runs dry without us returning true, then return false
}

// DFS solution: same as above, but with a stack instead of a queue. this works, because we don't actually care about how we traverse
// the tree! DFS will yield a valid answer just the same. the benefit of this is we can just use an array as a stack and not have to
// build out a linked list for better efficiency.
function solution_2 (root, arr) {
  if (arr[0] !== root.val) return false;
  if (arr.length === 1) {
    return !root.left && !root.right
  }
  const stack = [[root, 1]];
  while (stack.length) {
    const [node, i] = stack.pop();                    // pop from stack (better time efficiency)
    if (node.left && node.left.val === arr[i]) {
      if (
        i === arr.length - 1 &&
        !node.left.left &&
        !node.left.right
      ) return true;
      stack.push([node.left, i + 1]);
    }
    if (node.right && node.right.val === arr[i]) {
      if (
        i === arr.length - 1 &&
        !node.right.left &&
        !node.right.right
      ) return true;
      stack.push([node.right, i + 1]);
    }
  }
  return false;
}

var solution_3=(r,a,l='length',A=a[l]-1,L='left',R='right',f=(r,s=[[r,1]])=>{while(s[l]){[n,i]=s.pop();if(n[L]&&n[L].val==a[i]){if(i==A&&!n[L][L]&&!n[L][R])return !0;s.push([n[L],i+1])}if(n[R]&&n[R].val==a[i]){if(i==A&&!n[R][L]&&!n[R][R])return !0;s.push([n[R],i+1])}}return !8})=>a[0]!=r.val?!8:A<1?!r[L]&&!r[R]:f(r)

// thomas luo's recursive solution (slightly refactored):
function solution_4 (root, arr) {
  function helper (root, pos = 0) {
    if (!root || root.val !== arr[pos]) return false;                       // this nicely catches all edge cases
    if (!root.left && !root.right && pos === arr.length - 1) return true;   // this nicely catches all the true cases
    return helper(root.left, pos + 1) || helper(root.right, pos + 1);
  }
  return helper(root);
}

// thomas luo's one-liner (works on leetcode, but in node it doesn't seem to be coercing from 0 or 1 to boolean)
var solution_5=(r,a,h=(t,a,p=0,l=t&&t.left,r=t&&t.right)=>!t||t.val!=a[p]?0:!l&&!r&&p==a.length-1?1:h(l,a,p+1)|h(r,a,p+1))=>h(r,a)

// thomas luo's one-liner fixed for node: converted a 0 to !8, a 1 to !0, and a | to ||
var solution_6=(r,a,h=(t,a,p=0,l=t&&t.left,r=t&&t.right)=>!t||t.val!=a[p]?!8:!l&&!r&&p==a.length-1?!0:h(l,a,p+1)||h(r,a,p+1))=>h(r,a)

// my improvement on thomas' solution:
var solution_7=(r,a,h=(t,p=0,l=t&&t.left,r=t&&t.right)=>!t||t.val!=a[p]?!8:!l&&!r&&p==a.length-1?!0:h(l,p+1)||h(r,p+1))=>h(r)

const isValidSequence = solution_7;

// NOTE: I developed the following BinaryTree and Batch classes for easy creation of binary trees with arbitrary values.
// first .insert must END with 'true' argument
// subsequent .inserts must START with 'false' argument...
// ...except the last .insert which must START with 'true' argument

class BinaryTree {
  constructor (val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  insert (left, right, firstInsert = false) {
    if (left !== null) this.left = new BinaryTree(left);
    if (right !== null) this.right = new BinaryTree(right);
    return firstInsert ? new Batch(this, [this.left, this.right]) : [this.left, this.right];
  }
}

class Batch {
  constructor (root, nodes) {
    this.root = root;
    this.batch = nodes;
  }
  insert (lastInsert, ...values) {
    const nextBatch = [];
    for (let i = 0; i < this.batch.length; i++) {
      if (this.batch[i] !== null) {
        nextBatch.push(...(this.batch[i].insert(
          values[2 * i] === undefined ? null : values[2 * i],
          values[2 * i + 1] === undefined ? null : values[2 * i + 1],
        )));
      } else {
        nextBatch.push(null, null);
      }
    }
    return lastInsert ? this.root : new Batch (this.root, nextBatch);
  }
}

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = isValidSequence;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(0)
    .insert(1, 0, true)
    .insert(false, 0, 1, 0, null)
    .insert(true, null, 1, 0, 0, null, null, null, null),
  arr: [0, 1, 0, 1],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  root: new BinaryTree(0)
    .insert(1, 0, true)
    .insert(false, 0, 1, 0, null)
    .insert(true, null, 1, 0, 0, null, null, null, null),
  arr: [0, 0, 1],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  root: new BinaryTree(0)
    .insert(1, 0, true)
    .insert(false, 0, 1, 0, null)
    .insert(true, null, 1, 0, 0, null, null, null, null),
  arr: [0, 1, 1],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);


// INITIALLY FAILED THESE TEST CASES:

// Test case 4
input = {
  root: new BinaryTree(5),
  arr: [5],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  root: new BinaryTree(6)
    .insert(0, 8, true)
    .insert(false, 4, null, 8, 2)
    .insert(true, null, null, null, null, 3, null, null, null),
  arr: [6],
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  root: new BinaryTree(8)
    .insert(null, 8, true)
    .insert(false, null, null, null, 9)
    .insert(false, ...Array(6).fill(null), 5, null)
    .insert(false, ...Array(12).fill(null), 7, 3, null, null)
    .insert(true, ...Array(24).fill(null), null, 8, 2, null, ...Array(4).fill(null)),
  arr: [8, 8, 9, 5, 3, 2],
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);