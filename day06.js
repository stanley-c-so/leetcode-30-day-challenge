// --- Day 6: Group Anagrams ---

// Given an array of strings, group anagrams together.

// Example:

// Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
// Output:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
// Note:

// All inputs will be in lowercase.
// The order of your output does not matter.

// ----------

function solution_1 (strs) {
  const obj = {};
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (!(sorted in obj)) obj[sorted] = [];
    obj[sorted].push(str);
  }
  return Object.values(obj);
}

function solution_2 (strs) {
  const lettersToNumbers = {};
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 26; i++) {
    lettersToNumbers[alphabet[i]] = i;                // {a: 0, b: 1, ..., z: 25}
  }
  const obj = {};
  for (const str of strs) {
    const freq = Array(26).fill(0);                   // [0, 0, 0, ... , 0]
    for (const c of str) {
      freq[lettersToNumbers[c]]++;                    // e.g. 'ABC' --> [1, 1, 1, 0, 0, ... , 0]
    }
    const serial = freq.join(',');                    // e.g. 'ABC' --> '1,1,1,0,0,...,0'
    if (!(serial in obj)) obj[serial] = [];
    obj[serial].push(str);
  }
  return Object.values(obj);
}

const groupAnagrams = solution_2;

const specialTest = (...args) => {
  return groupAnagrams(...args).map(subarray => subarray.sort());
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
  strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
};
expected = [
  ['ate', 'eat', 'tea'],
  ['nat','tan'],
  ['bat'],
];
test(sortedFunc, input, expected.sort(), testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: