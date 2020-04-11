// --- Day 8: Middle of the Linked List ---

// Given a non-empty, singly linked list with head node head, return a middle node of linked list.

// If there are two middle nodes, return the second middle node.

// Example 1:

// Input: [1,2,3,4,5]
// Output: Node 3 from this list (Serialization: [3,4,5])
// The returned node has value 3.  (The judge's serialization of this node is [3,4,5]).
// Note that we returned a ListNode object ans, such that:
// ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.
// Example 2:

// Input: [1,2,3,4,5,6]
// Output: Node 4 from this list (Serialization: [4,5,6])
// Since the list has two middle nodes with values 3 and 4, we return the second one.

// Note:

// The number of nodes in the given list will be between 1 and 100.

// ----------

// run through the list and count the number of nodes. then run through the list again, stopping at the middle node, and return it

function solution_1 (head) {
  let currentNode = head;
  let numberOfNodes = 0;
  while (currentNode) {
    numberOfNodes++;
    currentNode = currentNode.next;
  }
  let target = Math.floor(numberOfNodes / 2);
  currentNode = head;
  while (target) {
    target--;
    currentNode = currentNode.next;
  }
  return currentNode;
}

// since there must be at least one node, start `current` and `middle` at the head. run `current` through the list - when the count so far is even, move
// `middle` forward by one node. once `current` reaches the end, `middle` should be in the middle, so return it

function solution_2 (head) {
  let current = middle = head;
  let odd = true;
  while (current) {
    if (!odd) middle = middle.next;
    odd = !odd;
    current = current.next;
  }
  return middle;
}

// one-liner - basically the above, except since we never need to return to the `head`, we can use `h` in place of `c`

var solution_3=(h,m=h,o=!0)=>{while(h){m=o?m:m.next;o=!o;h=h.next}return m}

const middleNode = solution_3;

class ListNode {
  constructor (val, ...extraVals) {
    this.val = val;
    this.next = null;
    if (extraVals.length) this.insert(...extraVals);
  }
  insert (...vals) {
    let currentNode = this;
    for (const val of vals) {
      const nextNode = new ListNode(val);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
    return this;
  }
}

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = middleNode;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  head: new ListNode(1, 2, 3, 4, 5),
};
expected = new ListNode(3, 4, 5);
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  head: new ListNode(1, 2, 3, 4, 5, 6),
};
expected = new ListNode(4, 5, 6);
test(func, input, expected, testNum, lowestTest, highestTest);