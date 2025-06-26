/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isAlpha(char) {
  return /^[A-Za-z]$/.test(char);
}

function isPalindrome(str) {
  let test="";

  for(let i = 0; i < str.length; i++){
    if(isAlpha(str[i])){
      test+=str[i].toLowerCase();
    }
  }

  for(let i=1; i<=test.length; i++){
    if(test[i]!=test[test.length-1-i]){
      return false;
    }
  }

  return true;

}

module.exports = isPalindrome;
