// --- Day 28: First Unique Number ---

// You have a queue of integers, you need to retrieve the first unique integer in the queue.

// Implement the FirstUnique class:

// FirstUnique(int[] nums) Initializes the object with the numbers in the queue.
// int showFirstUnique() returns the value of the first unique integer of the queue, and returns -1 if there is no such integer.
// void add(int value) insert value to the queue.


// Example 1:

// Input: 
// ["FirstUnique","showFirstUnique","add","showFirstUnique","add","showFirstUnique","add","showFirstUnique"]
// [[[2,3,5]],[],[5],[],[2],[],[3],[]]
// Output: 
// [null,2,null,2,null,3,null,-1]

// Explanation: 
// FirstUnique firstUnique = new FirstUnique([2,3,5]);
// firstUnique.showFirstUnique(); // return 2
// firstUnique.add(5);            // the queue is now [2,3,5,5]
// firstUnique.showFirstUnique(); // return 2
// firstUnique.add(2);            // the queue is now [2,3,5,5,2]
// firstUnique.showFirstUnique(); // return 3
// firstUnique.add(3);            // the queue is now [2,3,5,5,2,3]
// firstUnique.showFirstUnique(); // return -1

// Example 2:

// Input: 
// ["FirstUnique","showFirstUnique","add","add","add","add","add","showFirstUnique"]
// [[[7,7,7,7,7,7]],[],[7],[3],[3],[7],[17],[]]
// Output: 
// [null,-1,null,null,null,null,null,17]

// Explanation: 
// FirstUnique firstUnique = new FirstUnique([7,7,7,7,7,7]);
// firstUnique.showFirstUnique(); // return -1
// firstUnique.add(7);            // the queue is now [7,7,7,7,7,7,7]
// firstUnique.add(3);            // the queue is now [7,7,7,7,7,7,7,3]
// firstUnique.add(3);            // the queue is now [7,7,7,7,7,7,7,3,3]
// firstUnique.add(7);            // the queue is now [7,7,7,7,7,7,7,3,3,7]
// firstUnique.add(17);           // the queue is now [7,7,7,7,7,7,7,3,3,7,17]
// firstUnique.showFirstUnique(); // return 17

// Example 3:

// Input: 
// ["FirstUnique","showFirstUnique","add","showFirstUnique"]
// [[[809]],[],[809],[]]
// Output: 
// [null,809,null,-1]

// Explanation: 
// FirstUnique firstUnique = new FirstUnique([809]);
// firstUnique.showFirstUnique(); // return 809
// firstUnique.add(809);          // the queue is now [809,809]
// firstUnique.showFirstUnique(); // return -1

// Constraints:

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^8
// 1 <= value <= 10^8
// At most 50000 calls will be made to showFirstUnique and add.

// ----------

// NOTE: in leetcode, the solution is not written with class syntax. it is written with a constructor function, and all methods are added to the prototype.

// we will use a doubly linked list to represent the list of candidates for the next unique number. as we add in new numbers, we can also use a hash
// table to determine whether we've seen them before, and if so, we can use that hash table to immediately access the node representing that number
// within the DLL, and remove it from the list. to get the next unique number, then, we simply return the value of the head node of the DLL, or, if
// is empty, -1.
// NOTE: curiously, we don't need a .dequeue method in our DoublyLinkedList class. based on the nature of this problem, the head node is just as likely
// to be removed as any other node. so, i wrote a generalized .disconnect method that should properly handle any situation (whether node is head, or
// any other part of the queue.)
class solution_1 {
  constructor (nums) {
    class Node {
      constructor (val) {
        this.val = val;
        this.next = null;
        this.prev = null;
      }
    }
    class DoublyLinkedList {
      constructor () {
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      enqueue (val) {
        const node = new Node(val);
        if (!this.length) {
          this.head = node;
        } else {
          this.tail.next = node;
          node.prev = this.tail;
        }
        this.tail = node;
        this.length++;
        return node;
      }
      disconnect (node) {
        if (!node) return;                              // it is possible to feed in `null` as your node - just return
        if (node === this.head) {                       // if node is head (whether or not it is also tail), set new head
          if (this.length === 1) {                      // if length 1, node is both head and tail, and already disconnected
            this.head = null;                           // set head and tail to null
            this.tail = null;
          } else {                                      // else, set new head to the node that comes after the old head
            this.head = this.head.next;                 // set new head
            this.head.prev = null;                      // disconnect old head and new head
          }
        } else if (node === this.tail) {                // else if node is tail (but not head), set new tail
          this.tail = node.prev;                        // set new tail
          this.tail.next = null;                        // disconnect old tail and new tail
        } else {
          node.prev.next = node.next;                   // connects prev node to whatever is next
          node.next.prev = node.prev;                   // connects next node to whatever is prev
        }
        node.next = null;                               // in all cases, disconnect this node
        node.prev = null;                               // in all cases, disconnect this node
        this.length--;                                  // in all cases, decrement this.length
      }
    }
    this.queue = new DoublyLinkedList();
    this.hash = {};
    for (const num of nums) this.add(num);              // call the `add` method on each of the input nums
  }
  showFirstUnique () {
    return this.queue.head ? this.queue.head.val : -1;
  }
  add (value) {                                         // LEETCODE CALLS THIS PARAMETER `value` INSTEAD OF `val`...
    const val = value;                                  // ...SO I WILL JUST 'RENAME' IT TO `val`
    if (val in this.hash) {                             // then we've seen `val` before, and it is not unique
      this.queue.disconnect(this.hash[val]);            // disconnect it from queue if necessary
      this.hash[val] = null;                            // set its hash value to `null` (if it is not already `null`)
    } else {
      this.hash[val] = this.queue.enqueue(val);         // enqueue `val` and set its hash value to the resulting node
    }
  }
}

// thomas luo's solution using sets: since sets maintain the order of the items as they were added, we can use the set in place of a doubly linked list. we will
// actually need two sets: one to represent the "queue" of presently unique values, and another to represent "eliminated" numbers that have been seen 2+ times.
// no hash table is needed to access anything within the set, and we can remove items from the set in O(1) time regardless of their location within the set.
// in order to return what would normally be at the "head", we simply use the following trick: we use a for...of loop to iterate through the set, but we
// immediately return the first element, thereby skipping the traversal of the remainder of the set.
class solution_2 {
  constructor (nums) {
    this.queue = new Set();
    this.seenMultipleTimes = new Set();
    for (const num of nums) this.add(num);              // call the `add` method on each of the input nums
  }
  add (value) {                                         // LEETCODE CALLS THIS PARAMETER `value` INSTEAD OF `val`...
    const val = value;                                  // ...SO I WILL JUST 'RENAME' IT TO `val`
    if (this.seenMultipleTimes.has(val)) {              // if we have already seen this multiple times...
      return;                                           // ...do nothing (we can actually just delete this line and nothing will happen)
    } else if (this.queue.has(val)) {                   // if we are seeing this value for the second time...
      this.queue.delete(val);                           // ...delete it from the "queue"
      this.seenMultipleTimes.add(val);                  // ...add it to the list of things seen multiple times
    } else {                                            // if we are seeing this value for the first time...
      this.queue.add(val);                              // ...add it to the "queue"
    }
  }
  showFirstUnique () {
    for (const num of this.queue) return num;           // "iterate" through the queue set, and return the first element (this is equivalent to the "head")
    return -1;                                          // only if the queue is empty, return -1
  }
}

// thomas luo's one-liner - basically the above
class solution_3{constructor(n){this.q=new Set();this.s=new Set();n.map(e=>this.add(e))}add(v){this.s.has(v)?0:this.q.has(v)?(this.s.add(v),this.q.delete(v)):this.q.add(v)}showFirstUnique(){for(const num of this.q)return num;return -1}}

// my improvement on thomas' one-liner - basically using a variable in place of `this`
class solution_4{constructor(n,t=this){t.q=new Set();t.s=new Set();n.map(e=>t.add(e))}add(v,t=this){t.s.has(v)?0:t.q.has(v)?(t.s.add(v),t.q.delete(v)):t.q.add(v)}showFirstUnique(){for(const num of this.q)return num;return -1}}

const FirstUnique = solution_4;

const specialTest = (nums, commands, inputs) => {
  const firstUnique = new FirstUnique(nums);
  const ref = {                                         // this object holds references to the FirstUnique methods...
    showFirstUnique: firstUnique.showFirstUnique,
    add: firstUnique.add,
  };
  const output = [];
  for (let i = 0; i < commands.length; i++) {
    output.push(
      ref[commands[i]].bind(firstUnique)(...inputs[i])  // ...but each method still needs to be given `firstUnique` as its `this` context
    );
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
  nums: [2, 3, 5],
  commands: [
    'showFirstUnique',
    'add',
    'showFirstUnique',
    'add',
    'showFirstUnique',
    'add',
    'showFirstUnique',
  ],
  inputs: [
    [null],
    [5],
    [null],
    [2],
    [null],
    [3],
    [null],
  ],
};
expected = [2, undefined, 2, undefined, 3, undefined, -1];      // in leetcode, the output shows up as `null` instead of `undefined` for methods that have no return
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [7, 7, 7, 7, 7, 7],
  commands: [
    'showFirstUnique',
    'add',
    'add',
    'add',
    'add',
    'add',
    'showFirstUnique',
  ],
  inputs: [
    [null],
    [7],
    [3],
    [3],
    [7],
    [17],
    [null],
  ],
};
expected = [-1, undefined, undefined, undefined, undefined, undefined, 17];
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  nums: [809],
  commands: [
    'showFirstUnique',
    'add',
    'showFirstUnique',
  ],
  inputs: [
    [null],
    [809],
    [null],
  ],
};
expected = [809, undefined, -1];
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: