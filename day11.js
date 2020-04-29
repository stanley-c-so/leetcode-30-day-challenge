// --- Day 11: Diameter of Binary Tree ---

// Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

// Example:
// Given a binary tree 
//           1
//          / \
//         2   3
//        / \     
//       4   5    

// Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3]. 
// Note: The length of path between two nodes is represented by the number of edges between them. 

// ----------

function solution_1 (root) {
  
  // WRITE A RECURSIVE HELPER FUNCTION...
  function helper (root) {
    // THIS FUNCTION WILL RETURN AN OBJECT WITH 3 PROPERTIES:
    // - `diameter` (the diameter for the tree at the root is the longest path inside it - which does NOT necessarily go through the root)
    // - `bestLeft` (longest path to the left of the root that MUST connect up to the root and stop)
    // - `bestRight` (longest path to the right of the root that MUST connect up to the root and stop)

    // BASE CASE: NO `root` - return all 0s for the 3 properties
    if (!root) return {
      diameter: 0,
      bestLeft: 0,
      bestRight: 0,
    };

    // RECURSIVE CASE: first, recurse on `root.left` and `root.right`, then calculate `bestLeft` and `bestRight`
    const recurseLeft = helper(root.left);
    const recurseRight = helper(root.right);
    const bestLeft = !root.left ? 0 : Math.max(recurseLeft.bestLeft, recurseLeft.bestRight) + 1;      // if child doesn't exist, 0. else, look at the bigger of child's...
    const bestRight = !root.right ? 0 : Math.max(recurseRight.bestLeft, recurseRight.bestRight) + 1;  // ...own `bestLeft` and `bestRight`, and add 1 to connect to self
    return {
      diameter: Math.max(recurseLeft.diameter, recurseRight.diameter, bestLeft + bestRight),    // diameter is the biggest of: children's diameter, or your `bestLeft + bestRight`
      bestLeft,
      bestRight,
    };
  }

  // ...THAT WE INVOKE ON `root`, SO WE CAN PULL OUT THE `diameter` PROPERTY AND RETURN IT
  return helper(root).diameter;
}

// one-liner - basically, the above, but i swapped the order of the ternary to save 2 characters
var solution_2=(r,h=r=>{if(!r)return{d:0,L:0,R:0};let z=h(r.left),y=h(r.right),L=r.left?Math.max(z.L,z.R)+1:0,R=r.right?Math.max(y.L,y.R)+1:0;return{d:Math.max(z.d,y.d,L+R),L,R}})=>h(r).d

// in this solution, our helper returns the length of the longest path that MUST travel through that node. run that through every node, and eventually you will find the actual longest path!
function solution_3 (root) {

  // INITIALIZE `maxDiameter` AT 0 - this variable will track the longest path that must go through current node, as we examine every node of the tree
  let maxDiameter = 0;

  // HELPER FUNCTION - given a node, it returns the length of the longest path that MUST travel up to that node, but then stop. it cannot go through the other side.
  // note: this function also produces side effect of updating `maxDiameter`
  function helper(root) {
    if (!root) return 0;
    const longestLeft = helper(root.left);
    const longestRight = helper(root.right);
    maxDiameter = Math.max(maxDiameter, longestLeft + longestRight);    // side effect: updating `maxDiameter`
    return Math.max(longestLeft, longestRight) + 1;
  }

  // KICK START `helper` AND RETURN `maxDiameter` AT THE END
  helper(root);
  return maxDiameter;
}

// thomas luo & alex mok's one-liner
var solution_4=(r,m=0,h=(r,a=!r?0:h(r.left),b=!r?0:h(r.right))=>!r?0:(m=m>a+b?m:a+b)+1?Math.max(a,b)+1:0)=>h(r)&&m

// my improvement - flipping the ternary statements gets rid of three bangs
var solution_5=(r,m=0,h=(r,L=r&&h(r.left),R=r&&h(r.right))=>r?(m=m>L+R?m:L+R)*0+Math.max(L,R)+1:0)=>h(r)&&m

const diameterOfBinaryTree = solution_5;

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
        nextBatch.push(...(this.batch[i].insert(values[2 * i] || null, values[2 * i + 1] || null)));
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
const func = diameterOfBinaryTree;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  root: new BinaryTree(1)
    .insert(2, 3, true)
    .insert(true, 4, 5),
};
expected = 3;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: