/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function isVowel(v) {
    if(v=='a' || v=='e' || v=='i' || v=='o' || v=='u') return true;
    return false;
}

function countVowels(str) {
    // Your code here
    let res=0;
    let test=str.toLowerCase();
    for(let i = 0; i < test.length; i++){
        if(isVowel(test[i])) {
            res++;
        }
    }
    return res;
}

module.exports = countVowels;