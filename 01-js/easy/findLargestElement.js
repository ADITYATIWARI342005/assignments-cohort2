/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/


function max(a, b){
    if(a>b) return a;
    else return b;
}
function findLargestElement(numbers) {
    let res=numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        res=max(res, numbers[i]);
    }
    return res;
}

module.exports = findLargestElement;