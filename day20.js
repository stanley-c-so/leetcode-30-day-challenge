// --- Day 20: Construct Binary Search Tree from Preorder Traversal ---

// Return the root node of a binary search tree that matches the given preorder traversal.

// (Recall that a binary search tree is a binary tree where for every node, any descendant of node.left has a value < node.val, and any descendant of node.right has a value > node.val.  Also recall that a preorder traversal displays the value of the node first, then traverses node.left, then traverses node.right.)

// Example 1:

// Input: [8,5,1,7,10,12]
// Output: [8,5,10,1,7,null,12]

// Note: 

// 1 <= preorder.length <= 100
// The values of preorder are distinct.

// ----------

// solution 1: uses my own BST class
class BST {
  constructor (val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  insert (val) {
    if (val <= this.val) {
      if (this.left) {
        this.left.insert(val);
      } else {
        this.left = new BST(val);
      }
    } else {
      if (this.right) {
        this.right.insert(val);
      } else {
        this.right = new BST(val);
      }
    }
    return this;
  }
}
function solution_1 (preorder) {
  const root = new BST(preorder[0]);
  for (let i = 1; i < preorder.length; i++) {
    root.insert(preorder[i]);
  }
  return root;
}

// solution 2: i realize that leetcode has their own TreeNode class (it only creates the node but does not have its own insert method). this is someone's solution on leetcode (i refactored it)
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
function solution_2 (preorder) {
  const root = new TreeNode(preorder[0]);
  function insert (val, node) {                                 // will insert `val` into a given `node` and return `node`
    if (!node) return new TreeNode(val);
    if (val <= node.val) node.left = insert(val, node.left);
    else node.right = insert(val, node.right);
    return node;                                                // need to return `node` to configure `node.left` or `node.right` at the level above
  }
  for (let i = 1; i < preorder.length; i++) {
    insert(preorder[i], root);
  }
  return root;
}

// one-liner - basically the above, but using `T=TreeNode` to save letters, and swapping ternary statements
var solution_3=(p,T=TreeNode,r=new T(p[0]),I=(v,n)=>n?(v>n.val?n.right=I(v,n.right):n.left=I(v,n.left))&&n:new T(v))=>p.map((v,i)=>i&&I(v,r))&&r

const bstFromPreorder = solution_3;

const specialTest = preorder => {
  const root = bstFromPreorder(preorder);
  const output = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();                               // `node` may be null
    output.push(node ? node.val : null);                      // push `node.val` if `node` is a node, or else push null
    if (node === null) continue;                              // if `node` is null, it has no children, so continue
    if (node.left === null && node.right === null) continue;  // if both children of `node` are null, do not add children but continue
    queue.push(node.left, node.right);                        // add both children of `node`
  }
  return output;
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = specialTest;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  preorder: [8, 5, 1, 7, 10, 12],
};
expected = [8, 5, 10, 1, 7, null, 12];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: