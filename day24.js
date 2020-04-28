// --- Day 24: LRU Cache ---

// Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

// The cache is initialized with a positive capacity.

// Follow up:
// Could you do both operations in O(1) time complexity?

// Example:

// LRUCache cache = new LRUCache( 2 /* capacity */ );

// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.put(4, 4);    // evicts key 1
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4

// ----------

// NOTE: in leetcode, the solution is not written with class syntax. it is written with a constructor function, and all methods are added to the prototype.

class solution_1 {
  constructor (capacity) {
    class Node {
      constructor (key, val) {
        this.key = key;
        this.val = val;
        this.next = null;
        this.prev = null;
      }
    }
    class DoublyLinkedList {
      constructor (capacity) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.capacity = capacity;
      }
      enqueue (key, val) {
        if (this.length === this.capacity) this.dequeue();    // capacity is always positive, so dequeue always decrements length
        const node = new Node(key, val);
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
      dequeue () {
        if (!this.length) return;
        const node = this.head;
        if (this.length === 1) {
          this.head = null;
          this.tail = null;
        } else {
          const newHead = this.head.next;
          this.head.next = null;
          newHead.prev = null;
          this.head = newHead;
        }
        this.length--;
        return node;
      }
      disconnect (node) {                                       // NO NEED TO CHANGE LENGTH. ALSO, IT DOESN'T MATTER IF NODE IS NOT ACTUALLY IN THE LIST
        if (node === this.head && node === this.tail) return;   // edge case: this node was head and tail - no action needed
        if (node === this.head) this.head = node.next;          // edge case: this node was head only
        if (node === this.tail) this.tail = node.prev;          // edge case: this node was tail only
        if (node.prev) node.prev.next = node.next;              // connects prev node (if any) to whatever is next (whether node or null)
        if (node.next) node.next.prev = node.prev;              // connects next node (if any) to whatever is prev (whether node or null)
        node.next = null;                                       // disconnects this node
        node.prev = null;                                       // disconnects this node
      }
      moveToTail (node) {                                       // similar to enqueue, but WILL NOT CHANGE LENGTH
        if (node === this.tail) return;                         // edge case: node already is tail - no action needed
        if (node === this.head) this.head = node.next;          // edge case: node is head, so set new head
        this.disconnect(node);
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }
    }
    this.cache = {};
    this.queue = new DoublyLinkedList(capacity);
  }
  get (key) {
    if (!(key in this.cache)) return -1;
    const node = this.cache[key];
    this.queue.moveToTail(node);                                // move value to tail of the DLL
    return node.val;
  }
  put (key, value) {                                            // LEETCODE CALLS THIS PARAMETER `value` INSTEAD OF `val`...
    const val = value;                                          // ...SO I WILL JUST 'RENAME' IT TO `val`
    if (key in this.cache) {                                    // then you are simply overwriting. do so, then move to tail
      this.cache[key].val = val;
      this.queue.moveToTail(this.cache[key]);
    } else {                                                    // then you are adding something new. check for overcapacity, then move to tail
      if (this.queue.length === this.queue.capacity) {          // if queue is at capacity...
        const evictedNode = this.queue.dequeue();               // ...evict from queue
        delete this.cache[evictedNode.key];                     // ...and delete from cache
      }
      this.cache[key] = this.queue.enqueue(key, val);           // either way, enqueue the new node
    }
  }
}

const LRUCache = solution_1;

const specialTest = (capacity, commands, inputs) => {
  const stack = new LRUCache(capacity);
  const ref = {                                         // this object holds references to the MinStack methods...
    get: stack.get,
    put: stack.put,
  };
  const output = [];
  for (let i = 0; i < commands.length; i++) {
    output.push(
      ref[commands[i]].bind(stack)(...inputs[i])        // ...but each method still needs to be given `stack` as its `this` context
    );
  }
  return output;
};

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = specialTest;
const sortedFunc = (...args) => func(...args).sort();                     // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                  // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  capacity: 2,
  commands: ['put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
  inputs: [
    [1, 1],
    [2, 2],
    [1],
    [3, 3],
    [2],
    [4, 4],
    [1],
    [3],
    [4],
  ],
};
expected = [undefined, undefined, 1, undefined, -1, undefined, -1, 3, 4]; // in leetcode, the output shows up as `null` instead of `undefined` for methods that have no return
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 2
input = {
  capacity: 2,
  commands: ['put', 'put', 'get', 'put', 'put', 'get'],
  inputs: [
    [2, 1],
    [2, 2],
    [2],
    [1, 1],
    [4, 1],
    [2],
  ],
};
expected = [undefined, undefined, 2, undefined, undefined, -1];
test(func, input, expected, testNum, lowestTest, highestTest);