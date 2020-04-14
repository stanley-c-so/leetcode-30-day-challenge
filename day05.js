// --- Day 5: Best Time to Buy and Sell Stock II ---

// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

// Example 1:

// Input: [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
//              Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
// Example 2:

// Input: [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
//              Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
//              engaging multiple transactions at the same time. You must sell before buying again.
// Example 3:

// Input: [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

// ----------

function solution_1 (prices) {
  let profit = 0;
  let owned = false;
  let purchasePrice;
  for (let i = 0; i < prices.length; i++) {
    if (!owned && i < prices.length - 1 && prices[i] < prices[i + 1]) {
      owned = true;
      purchasePrice = prices[i];
    }
    else if (owned && (i === prices.length - 1 || prices[i] > prices[i + 1])) {
      owned = false;
      profit += prices[i] - purchasePrice;
    }
  }
  return profit;
}

// one-liner - this is basically the same as above. note the giant parens around the callback being fed into .map (chosen for brevity) - it's needed to combine the two sections
// on either side of the middle comma together into one thing. note that the two sections will never overlap: regardless of the state of `o` (which gets switched when the left section
// runs), the left section only runs when `i < P.length - 1 && c < P[i + 1]` whereas the right section only runs when `i === P.length - 1 || c > P[i + 1]`.

var solution_2=(P,p=0,o=!8,b=0)=>P.map((c,i)=>((!o&&i<P.length-1&&c<P[i+1]&&(o=!0,b=c)),(o&&(i===P.length-1||c>P[i+1])&&(o=!8,p+=c-b))))&&p

// in this solution, we examine at every price whether it is greater than the previous one. if so, we simply add the marginal increase. this will produce the same result as if
// the stock was always purchased at the local minima and sold at the local maxima! the beauty of it is that we do not actually have to simulate buying and selling the stock.

function solution_3 (prices) {
  let profit = 0;
  let previous = prices[0];                                   // `previous` will usually lag behind the current `price` by one number, except for the first iteration
  for (const price of prices) {
    profit += (price > previous ? price - previous : 0);      // on the first iteration, `price` === `previous`, so no profit is added, which is fine
    previous = price;                                         // after the first iteration, `previous` is always a number behind `price`
  }
  return profit;
}

// thomas luo's solution - this is just the one-liner implementation of the above

var solution_4=(p,c=p[0],a=0)=>p.forEach(e=>{a+=e>c?e-c:0,c=e})|a   // note the use of `|` instead of `||` - by using a bitwise operator, you save a character!

// looks like the best way to go is still to use .map and `|`

var solution_5=(p,c=p[0],a=0)=>p.map(e=>{a+=e>c?e-c:0,c=e})|a

const maxProfit = solution_5;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = maxProfit;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  prices: [7, 1, 5, 3, 6, 4],
};
expected = 7;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  prices: [1, 2, 3, 4, 5],
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 3
input = {
  prices: [7, 6, 4, 3, 1],
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES: