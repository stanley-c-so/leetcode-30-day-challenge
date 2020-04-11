// --- Day 9: Backspace String Compare ---

//

// ----------

function solution_1 (S, T) {
  function parse (s) {
    const output = [];
    for (const c of s) {
      if (c === '#') output.pop();
      else output.push(c);
    }
    return output.join('');
  }
  return parse(S) === parse(T);
}

// one-liner - basically the above, with `parse` given as a default value, and `s` processed in array form using .map. also, i use `==` instead of `===` to save 2 characters

var solution_2=(S,T,p=(s,o=[])=>s.split('').map(c=>c=='#'?o.pop():o.push(c))&&o.join(''))=>p(S)==p(T)

const backspaceCompare = solution_2;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = backspaceCompare;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  S: 'ab#c',
  T: 'ad#c',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  S: 'ab##',
  T: 'c#d#',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  S: 'a##c',
  T: '#a#c',
};
expected = true;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 4
input = {
  S: 'a#c',
  T: 'b',
};
expected = false;
test(func, input, expected, testNum, lowestTest, highestTest);