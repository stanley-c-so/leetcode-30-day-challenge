// --- Day 19: Search in Rotated Sorted Array ---

// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

// You are given a target value to search. If found in the array return its index, otherwise return -1.

// You may assume no duplicate exists in the array.

// Your algorithm's runtime complexity must be in the order of O(log n).

// Example 1:

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:

// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1

// ----------

// my solution uses a regular binary search function, and also calls itself recursively. here is the regular binary search:
function binarySearch(array, target, start, end) {
	while (start <= end) {
		const middle = start + Math.floor((end - start) / 2);
		if (array[middle] > target) {
			end = middle - 1;
		} else if (array[middle] < target) {
			start = middle + 1;
		} else {
			return middle;
		}
	}
	return -1;
}

// there are 4 scenarios: (1) middle num is the `target`, (2) middle num is bigger than end num, (3) middle num is less than start num, or (4) none of the above is true because you have an edge case:
// - you have something like [0, 0, 1, 0, 0, 0, 0, 0] (although this won't be possible in leetcode because there are no duplicates)
// - you have an array with length 1
// - your sorted array has been shifted by 0 (i.e. it hasn't been shifted at all)
// obviously, if (1), we're done. return `target`. i also threw in some extra O(1) checks for if `nums[start]` or `nums[end]` equal the target but these are not necessary
// based on the above, (2) or (3) will tell you whether the break is at or to the left of middle, or whether it's to the right of middle. that means the other half is not disjointed, so if the
// target is between the middle and the end that is not disjointed, you can run regular binary search on that half becausae the target must be in that half if it exists at all. else, the target
// must be in the disjointed half if it exists at all, so we recurse normally.
// (note: i use arguments.callee to recurse so i can copy the code to another environment where the function may have a different name.)
function solution_1 (nums, target, start, end) {
  if (start === undefined) start = 0;                           // arguments.callee won't work if the function uses default parameters
  if (end === undefined) end = nums.length - 1;                 // arguments.callee won't work if the function uses default parameters

  while (start <= end) {
		const middle = start + Math.floor((end - start) / 2);
		if (nums[middle] === target) {
      return middle;
    } else if (nums[start] === target) {                        // this block is not strictly necessary but i thought it would be a nice check
      return start;
    } else if (nums[end] === target) {                          // this block is not strictly necessary but i thought it would be a nice check
      return end;
		} else if (nums[middle] > nums[end]) {								  		// the break must be at or to the right of middle
			if (target > nums[end] && target < nums[middle]) {	  			// if target exists at all, it must be left of middle
				return binarySearch(nums, target, start, middle - 1);
			} else {
				start = middle + 1;
			}
		} else if (nums[middle] < nums[start]) {								  	// the break must be to the left of middle
			if (target < nums[start] && target > nums[middle]) {	  		// if target exists at all, it must be right of middle
				return binarySearch(nums, target, middle + 1, end);
			} else {
				end = middle - 1;
			}
		} else {		// it's unclear which half we can eliminate (due to edge case) so we have no choice but to recurse
			const recurseLeft = arguments.callee(nums, target, start, middle - 1);
			return recurseLeft !== -1 ? recurseLeft : arguments.callee(nums, target, middle + 1, end);
		}
	}
	return -1;
}

// one-liner - when copying into leetcode, replace `arguments.callee` with `search` (as well as this function name itself)
var solution_2=(n,t,s=0,e=n.length-1,B=(n,t,s,e)=>{while(s<=e){m=s+Math.floor((e-s)/2);if(n[m]>t)e=m-1;else if(n[m]<t)s=m+1;else return m}return -1})=>{while(s<=e){m=s+Math.floor((e-s)/2);if(n[m]==t)return m;else if(n[m]>n[e]){if(t>n[e]&&t<n[m])return B(n,t,s,m-1);else s=m+1}else if(n[m]<n[s]){if(t<n[s]&&t>n[m])return B(n,t,m+1,e);else e=m-1}else{R=arguments.callee(n,t,s,m-1);return R==-1?arguments.callee(n,t,m+1,e):R}}return -1}

// this is a simpler answer someone submitted on leetcode. you don't need a separate function for regular binary search. also, there is no recursion! the decision tree is simple: (1) if middle num
// is the target, you're done. (2) if start num is less than or equal to middle num, then the left half is non-rotated. (3) else, the right half is non-rotated.
// if (2), check if target is between start num and middle num - if so, search left half (move end index to middle - 1). else, search right half (move start index to middle + 1).
// if (3), check if target is between start num and middle num - if so, search left half (move end index to middle - 1). else, search right half (move start index to middle + 1).
// if you break out of the while loop, return -1.
// this is very similar to a regular binary search - the only difference is you do not merely check whether the middle num is less than or greater than your target - instead, the decision splits based
// on **which half is the non-rotated half**, and then depending on whether the target would exist within the non-rotated range, you either search that half, or discard it and search the other half.
// the edge cases that would trip up the original solution are not an issue here, since our logic is based on which half is NOT rotated, not which half MUST have the rotation
function solution_3 (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const middle = Math.floor((right - left) / 2) + left;     // better than Math.floor((left + right) / 2) in case of integer overflow for large values
    if (nums[middle] === target) return middle;
    if (nums[left] <= nums[middle]) {                         // this guarantees that the left half is non-rotated
      if (target < nums[middle] && target >= nums[left]) {    // then the target, if it exists, must be in the left half
        right = middle - 1;
      } else {                                                // then the target, if it exists, must be in the right half
        left = middle + 1;
      }
    } else {                                                  // this guarantees that the right half is non-rotated
      if (target > nums[middle] && target <= nums[right]) {   // then the target, if it exists, must be in the right half
        left = middle + 1;
      } else {                                                // then the target, if it exists, must be in the left half
        right = middle - 1;
      }
    }
  }
  return -1;
}

// one-liner - basically the above, but (1) using parseInt instead of Math.floor, (2) using (l+r)/2 instead of (right - left) / 2 + left, (3) using ternaries for all logic that doesn't return anything
var solution_4=(n,t,l=0,r=n.length-1)=>{while(l<=r){m=parseInt((l+r)/2);M=n[m];if(M==t)return m;(n[l]<=M?(t<M&&t>=n[l]?r=m-1:l=m+1):(t>M&&t<=n[r]?l=m+1:r=m-1))}return -1}

// thomas luo's improvement on my one-liner - (1) using ^ 0 instead of parseInt (coerces to binary?), (2) instead of n[l]<=M, using n[l]>M and swapping the ternary statements
var solution_5=(n,t,l=0,r=n.length-1)=>{while(l<=r){m=((l+r)/2)^0;M=n[m];if(M==t)return m;(n[l]>M?(t>M&&t<=n[r]?l=m+1:r=m-1):(t<M&&t>=n[l]?r=m-1:l=m+1))}return -1}

const search = solution_5;

// const specialTest = (...args) => {
// };

// TEST CASES

const test = require('./_test');
const testNum = [1];
let input, expected;
const func = search;
const sortedFunc = (...args) => func(...args).sort();                   // used when the order of the output does not matter
const modFunc = (...args) => func(...args) % 1000000007;                // used when the output is very large
const lowestTest = 0 || 0;
const highestTest = 0 || Infinity;

// Test case 1
input = {
  nums: [4, 5, 6, 7, 0, 1, 2],
  target: 0,
};
expected = 4;
test(func, input, expected, testNum, lowestTest, highestTest);

// Test case 2
input = {
  nums: [4, 5, 6, 7, 0, 1, 2],
  target: 3,
};
expected = -1;
test(func, input, expected, testNum, lowestTest, highestTest);

// INITIALLY FAILED THESE TEST CASES:

// Test case 3
input = {
  nums: [1, 3],
  target: 1,
};
expected = 0;
test(func, input, expected, testNum, lowestTest, highestTest);
