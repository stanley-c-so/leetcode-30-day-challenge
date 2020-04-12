// --- Day 12: Last Stone Weight ---

// We have a collection of stones, each stone has a positive integer weight.

// Each turn, we choose the two heaviest stones and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

// If x == y, both stones are totally destroyed;
// If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
// At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)

// Example 1:

// Input: [2,7,4,1,8,1]
// Output: 1
// Explanation: 
// We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
// we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
// we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
// we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of last stone.
 
// Note:

// 1 <= stones.length <= 30
// 1 <= stones[i] <= 1000

// ----------

class MaxHeap {
  constructor () {
    this.queue = [];      // elements will be in the form of {value: someValue, priority: somePriority}
  }
  
  // UTILITY METHODS
  _swap (idxA, idxB) {
    [this.queue[idxA], this.queue[idxB]] = [this.queue[idxB], this.queue[idxA]];
  }
  _parentIdx (childIdx) {
    return Math.floor((childIdx - 1) / 2);
  }
  _childrenIndices (parentIdx) {
    return [2 * parentIdx + 1, 2 * parentIdx + 2];
  }

  // PQ METHODS
  peek () {
    return this.queue[0];
  }
  insert (value, priority = value) {
    // FIRST, ADD THE NEW ELEMENT TO THE END OF QUEUE
    this.queue.push({value, priority});
    // NEXT, 'HEAPIFY UP' ('bubble up' the first element in queue until heap is proper)
    let currentNodeIdx = this.queue.length - 1;
    while (currentNodeIdx !== 0 && this.queue[currentNodeIdx].priority > this.queue[this._parentIdx(currentNodeIdx)].priority) {
      this._swap(currentNodeIdx, this._parentIdx(currentNodeIdx));
      currentNodeIdx = this._parentIdx(currentNodeIdx);
    }
    return this;    // for chaining
  }
  popMax () {
    // EDGE CASES: 0- OR 1-LENGTH HEAP
    if (!this.queue.length) return undefined;
    if (this.queue.length === 1) return this.queue.pop();       // if only one node, just pop it off the queue and return
    
    // FIRST, SAVE THE TOP ELEMENT AND THEN REPLACE IT WITH LAST ELEMENT (AFTER POPPING IT OFF)
    const poppedMax = this.peek();                              // use .peek() to save the top element inside poppedMax, to be returned later
    this.queue[0] = this.queue.pop();                           // replace top of heap with node popped off from end of queue

    // NEXT, 'HEAPIFY DOWN' ('push down' the first element in queue until heap is proper)
    let currentNodeIdx = 0;
    let [left, right] = this._childrenIndices(currentNodeIdx);
    while (left < this.queue.length) {                          // while left child exists...
      let biggestChildIdx = right < this.queue.length && this.queue[right].priority > this.queue[left].priority
        ? right     // ...biggestChildIdx is right if right child exists AND takes priority over left child...
        : left;     // ...otherwise, biggestChildIdx is left
      if (this.queue[biggestChildIdx].priority > this.queue[currentNodeIdx].priority) {    // see if biggest child is bigger than parent
        this._swap(currentNodeIdx, biggestChildIdx);            // swap parent and smaller child
        currentNodeIdx = biggestChildIdx;                       // update currentNodeIdx
        [left, right] = this._childrenIndices(currentNodeIdx);  // update left and right
      } else {
        break;      // if bigger child is not bigger than parent, break out of heapify down
      }
    }
    return poppedMax;   // finally, return the stored top element from the beginning
  }
}

// makes use of MaxHeap class, above
function solution_1 (stones) {
  const maxHeap = new MaxHeap();
  for (const stone of stones) maxHeap.insert(stone);
  while (maxHeap.queue.length >= 2) {
    const y = maxHeap.popMax();
    const x = maxHeap.popMax();
    if (y.value > x.value) maxHeap.insert(y.value - x.value);
  }
  return maxHeap.queue[0] ? maxHeap.queue[0].value : 0;
}

// without any classes
function solution_2 (stones) {
  while (stones.length >= 2) {
    stones.sort((a, b) => a - b);
    const y = stones.pop();
    const x = stones.pop();
    if (y > x) stones.push(y - x);
  }
  return stones[0] || 0;
}

// one-liner
var solution_3=s=>{while(s.length>1){s.sort((a,b)=>a-b);y=s.pop();x=s.pop();y>x?s.push(y-x):0}return s[0]||0}

const lastStoneWeight = solution_3;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = lastStoneWeight;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  stones: [2, 7, 4, 1, 8, 1],
};
expected = 1;
test(func, input, expected, testNum, lowestTest, highestTest);