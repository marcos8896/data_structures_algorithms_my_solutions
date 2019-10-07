//Implement a function that reverses a string using iteration...and then recursion!

//Iterative
function reverseString(str) {
  let reversedStr = '';
  for(let i = str.length - 1; i >= 0 ; i--) {
    reversedStr += str[i];
  }
  return reversedStr;
}

console.log('iterative: ', reverseString('yoyo mastery'));
//should return: 'yretsam oyoy'

//Recursive
function reverseStringRecursive(str) {
  debugger;
  if(str.length === 1) {
    return str;
  }

  if(str.length !== 1) {
    return str[str.length - 1] + reverseStringRecursive(str.substring(0, str.length - 1))
  }

}
console.log('recursive: ', reverseStringRecursive('yoyo mastery'));

