// --- Day 29: Binary Tree Maximum Path Sum ---

// Given a non-empty binary tree, find the maximum path sum.

// For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.

// Example 1:

// Input: [1,2,3]

//        1
//       / \
//      2   3

// Output: 6

// Example 2:

// Input: [-10,9,20,null,null,15,7]

//    -10
//    / \
//   9  20
//     /  \
//    15   7

// Output: 42

// ----------

function solution_1 (root) {
  
  // WRITE A RECURSIVE HELPER FUNCTION...
  function helper (root) {
    // THIS FUNCTION WILL RETURN AN OBJECT WITH 3 PROPERTIES:
    // - `maxPath` (the best path found so far at or within this root - which does NOT necessarily go through the root)
    // - `bestLeft` (the best path, if you must include this root, and can only go to the left)
    // - `bestRight` (the best path, if you must include this root, and can only go to the right)

    // BASE CASE: NO `root` - return all -Infinity, and NOT 0, so that the parent node does not choose this even if it is negative
    if (!root) return {
      maxPath: -Infinity,
      bestLeft: -Infinity,
      bestRight: -Infinity,
    };

    // RECURSIVE CASE: first, recurse on `root.left` and `root.right`, then calculate `bestLeft` and `bestRight`
    const recurseLeft = helper(root.left);
    const recurseRight = helper(root.right);
    const bestLeft = root.val + (root.left                          // root.val (to include self), plus: if child doesn't exist, 0...
      ? Math.max(recurseLeft.bestLeft, recurseLeft.bestRight, 0)    // ...else, add the max of child's `bestLeft` and `bestRight`, or 0
      : 0);
    const bestRight = root.val + (root.right
      ? Math.max(recurseRight.bestLeft, recurseRight.bestRight, 0)
      : 0);
    return {
      maxPath: Math.max(                                            // maxPath is the biggest of:
        recurseLeft.maxPath,                                        // ...left child's maxPath,
        recurseRight.maxPath,                                       // ...right child's maxPath,
        bestLeft + bestRight - root.val,                            // ...`bestLeft + bestRight - root.val` (avoid double count),
        bestLeft,                                                   // ...only take your left path (if right path is negative),
        bestRight,                                                  // ...only take your right path (if left path is negative),
        root.val,                                                   // ...or only take yourself (if children paths are negative)
      ),
      bestLeft,
      bestRight,
    };
  }

  // ...THAT WE INVOKE ON `root`, SO WE CAN PULL OUT THE `maxPath` PROPERTY AND RETURN IT
  return helper(root).maxPath;
}

// in this solution, our helper returns the max path that MUST travel through that node. run that through every node, and eventually you will find the actual max path!
function solution_2 (root) {

  // INITIALIZE `maxPathSoFar` AT -Infinity - this variable will track the max path that must go through current node, as we examine every node of the tree
  let maxPathSoFar = -Infinity;

  // HELPER FUNCTION - given a node, it returns the max path that MUST travel up to that node, but then stop. it cannot go through the other side.
  // note: this function also produces side effect of updating `maxPathSoFar`
  function helper(root) {
    if (!root) return -Infinity;
    const maxLeft = helper(root.left);                          // recurse left
    const maxRight = helper(root.right);                        // recurse right
    maxPathSoFar = Math.max(                                    // potentially update `maxPathSoFar` by calculating the max path that must go through this `root`
      maxPathSoFar,
      root.val + Math.max(0, maxLeft) + Math.max(0, maxRight)   // you must always include `root.val`. also include `maxLeft` and `maxRight` if they are positive
    );
    return root.val + Math.max(0, maxLeft, maxRight);           // for the return value, however, we are returning the max path that travels up to `root` on one side only
  }

  // KICK START `helper` AND RETURN `maxPathSoFar` AT THE END
  helper(root);
  return maxPathSoFar;
}

// one-liner - basically the above, but with flipped ternaries to get rid of bangs, and `...*0+...` whenever the left part may be 0 or not, but needs to be ignored
// var solution_3=(r,I=m=-Infinity,h=(r,L=r&&h(r.left),R=r&&h(r.right))=>r?(m=Math.max(m,r.val+(L>0?L:0)+(R>0?R:0)))*0+r.val+Math.max(0,L,R):I)=>h(r)*0+m
var solution_3=(r,I=-Infinity,M=Math.max,m=I,h=(r,L=r&&h(r.left),R=r&&h(r.right))=>r?(m=M(m,r.val+M(L,0)+M(R,0)))*0+r.val+M(0,L,R):I)=>h(r)*0+m

const maxPathSum = solution_3;

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
const func = maxPathSum;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(1)
    .insert(2, 3, true)
    .insert(true),          // second line always needed to end my batch class and return the root, even if no values
};
expected = 6;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  root: new BinaryTree(-10)
    .insert(9, 20, true)
    .insert(true, null, null, 15, 7),
};
expected = 42;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 3
input = {
  root: new BinaryTree(-3),
};
expected = -3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  root: new BinaryTree(1)
    .insert(2, null, true)
    .insert(true),          // second line always needed to end my batch class and return the root, even if no values
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  root: new BinaryTree(9)
    .insert(6, -3, true)
    .insert(false, null, null, -6, 2)
    .insert(false, ...Array(6).fill(null), 2, null)
    .insert(false, ...Array(12).fill(null), -6, -6, null, null)
    .insert(true, ...Array(24).fill(null), -6, ...Array(7).fill(null)),
};
expected = 16;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  root: new BinaryTree(5)
    .insert(4, 8, true)
    .insert(false, 11, null, 13, 4)
    .insert(true, 7, 2, ...Array(5).fill(null), 1),
};
expected = 48;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 7
input = {
  root: new BinaryTree(-1)
    .insert(0, 1, true)
    .insert(true),          // second line always needed to end my batch class and return the root, even if no values
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);