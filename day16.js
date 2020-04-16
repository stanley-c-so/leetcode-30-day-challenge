// --- Day 16: Valid Parenthesis String ---

// Given a string containing only three types of characters: '(', ')' and '*', write a function to check whether this string is valid. We define the validity of a string by these rules:

// Any left parenthesis '(' must have a corresponding right parenthesis ')'.
// Any right parenthesis ')' must have a corresponding left parenthesis '('.
// Left parenthesis '(' must go before the corresponding right parenthesis ')'.
// '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string.
// An empty string is also valid.

// Example 1:
// Input: "()"
// Output: True

// Example 2:
// Input: "(*)"
// Output: True

// Example 3:
// Input: "(*))"
// Output: True

// Note:
// The string size will be in the range [1, 100].

// ----------

// keep a running count of open parentheses: every time '(' is encountered, increment. every time ')' is encountered, decrement (if it would not dip below 0). when '*' is encountered,
// it could represent either '(', ')', or '' so there are now 3 possibilities. we will track an array (`counts`) of possible count values we could be at so far. (initialize it with [0],
// the only possible starting point.) with each character of `s`, we reassign `counts` depending on what the character currently is:
// - if '(', we can safely increment every count by 1;
// - if ')', we can decrement every count by 1 so long as it would not dip below 0;
// - if '*', we create a new set (to avoid double counting duplicates) from `counts`, and then for every count `n`, also add `n + 1` (increment) and `n - 1` if not negative (decrement)
// at the very end, we check whether `counts` includes 0
function solution_1 (s) {
  let counts = [0];                                     // `counts` will be reassigned with each character of `s`
  for (const c of s) {
    if (c === '(') {
      counts = counts.map(n => n + 1);
    } else if (c === ')') {
      counts = counts.filter(n => n).map(n => n - 1);
    } else {
      const newCounts = new Set(counts);                // retain all old numbers to represent the case of '*' === ''
      for (const n of counts) {
        newCounts.add(n + 1);                           // represents '*' === '('
        if (n) newCounts.add(n - 1);                    // represents '*' === ')'
      }
      counts = [...newCounts];                          // reassign `counts` to incorporate the new values
    }
  }
  return counts.includes(0);                            // as long as 0 exists somewhere in our array of possible count values, the string is valid
}

// one-liner - basically the above, but `s` has been split into an array and we .reduce initial value (`counts`) from [0] down to its final form,
// and then we check if it includes 0
var solution_2=s=>s.split('').reduce((C,c)=>c=='('?C.map(n=>n+1):c==')'?C.filter(n=>n).map(n=>n-1):(S=new Set(C),C.map(n=>(S.add(n+1),n?S.add(n-1):0)),C=[...S]),[0]).includes(0)

// this is a backtracking solution someone submitted on leetcode. it was the fastest solution available at the time i wrote this. (i refactored it.)
// fundamentally it is very similar to what i am doing in my solution. there is a helper function that returns true/false whether there exists a
// valid solution, given a particular starting `count` - number of '(' minus number of ')' - and a starting `idx`. first, a `key` is serialized based
// on the input configuration, and the `cache` is examined to see if a solution is already known. otherwise, we save the following results into the
// cache and return **from helper**:
// - BASE CASE: if `count` is negative, immediately return false, because `count` should never dip into the negatives
// - BASE CASE: if `idx` has reached the end (it equals `s.length`), return whether `count` has settled back down at 0
// - if current character is '(', increment `count` and recurse at next `idx`
// - if current character is ')', decrement `count` and recurse at next `idx`
// - if current character is '*', try all 3 possibilities of `count` and recurse at next `idx`
function solution_3 (s) {
  const cache = {};
  function helper (count = 0, idx = 0) {                                  // `helper` returns true/false for valid string for a given start condition
    const key = `${count}-${idx}`;                                        // serialize a `key` representing the input configuration
    if (key in cache) return cache[key];                                  // return cached value, if any
    if (count < 0) return cache[key] = false;                             // BASE: `count` should never be negative
    if (idx === s.length) return cache[key] = count === 0;                // BASE: if `idx` reaches the end, return whether `count` has settled at 0
    if (s[idx] === '(') return cache[key] = helper(count + 1, idx + 1);   // if '(', increment `count` and recurse at next `idx`
    if (s[idx] === ')') return cache[key] = helper(count - 1, idx + 1);   // if ')', decrement `count` and recurse at next `idx`
    return cache[key] = (                                                 // else you have '*', so try all 3 possibilities of `count` and recurse at next `idx`
      helper(count, idx + 1) ||       // if '*' === empty
      helper(count + 1, idx + 1) ||   // if '*' === '('
      helper(count - 1, idx + 1)      // if '*' === ')'
    );
  }
  return helper();    // kick start `helper` with no input to use default inputs `count` === 0, `idx` === 0
};

// one-liner - backtracking solution, above
var solution_4=(s,C={},h=(c=0,i=0,k=`${c}-${i}`)=>k in C?C[k]:c<0?C[k]=!8:i==s.length?C[k]=!c:s[i]=='('?C[k]=h(c+1,i+1):s[i]==')'?C[k]=h(c-1,i+1):C[k]=h(c,i+1)||h(c+1,i+1)||h(c-1,i+1))=>h()

const checkValidString = solution_4;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = checkValidString;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  s: '()',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  s: '(*)',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  s: '(*))',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 4
input = {
  s: '(*()',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 5
input = {
  s: '(())((())()()(*)(*()(())())())()()((()())((()))(*',
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 6
input = {
  s: '()',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 7
input = {
  s: '((*)',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 8
input = {
  s: '(*)',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);
