// --- Day 10: Min Stack ---

// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// getMin() -- Retrieve the minimum element in the stack.
 
// Example:
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> Returns -3.
// minStack.pop();
// minStack.top();      --> Returns 0.
// minStack.getMin();   --> Returns -2.

// ----------

// NOTE: in leetcode, the solution is not written with class syntax. it is written with a constructor function, and all methods are added to the prototype.

class solution_1 {
  constructor () {
    this.stack = [];      // this will hold values like a regular stack
    this.min = [];        // this will only hold values that are equal to or less than the current minimum. when pushing or popping normally, you MAY have to push into or pop from `this.min` too
  }
  push (x) {
    this.stack.push(x);
    if (this.stack.length === 1 || x <= this.getMin()) this.min.push(x);    // if stack was previously empty, then this.getMin() would return `undefined` and any comparison with `x` would be false
  }
  pop () {
    if (this.stack.pop() === this.getMin()) this.min.pop();   // this will always call `this.stack.pop()`, but will only call `this.min.pop()` if thie peopped element equals `this.getMin()`
  }
  top () {
    return this.stack[this.stack.length - 1];   // very straightforward: return the latest element from `this.stack`
  }
  getMin () {
    return this.min[this.min.length - 1];   // return the latest element from `this.min`
  }
}

const MinStack = solution_1;

const specialTest = (commands, inputs) => {
  const minStack = new MinStack();
  const output = [];
  const ref = {                                     // this object holds references to the MinStack methods...
    push: minStack.push,
    pop: minStack.pop,
    top: minStack.top,
    getMin: minStack.getMin,
  }
  for (let i = 0; i < commands.length; i++) {
    output.push(
      ref[commands[i]].bind(minStack)(inputs[i])    // ...but each method still needs to be given `minStack` as its `this` context
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
  commands: ['push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
  inputs: [-2, 0, -3, null, null, null, null],
};
expected = [undefined, undefined, undefined, -3, undefined, 0, -2];     // in leetcode, the output shows up as `null` instead of `undefined` for methods that have no return
test(func, input, expected, testNum, lowestTest, highestTest);