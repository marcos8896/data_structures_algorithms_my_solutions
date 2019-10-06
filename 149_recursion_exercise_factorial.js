//Factorial of a number

function findFactorialRecursive(number) {
  if(number > 1) {
    return number * findFactorialRecursive(number - 1);
  }
  return number;
}

const resultRecursive = findFactorialRecursive(4);
console.log('resultRecursive: ', resultRecursive);

function findFactorialIterative(number) {
  let result = 1;
  for (let i = number; i > 1; i--) {
    result *= i;
  }
  return result;
}

const resultIterative = findFactorialRecursive(4);
console.log('resultIterative: ', resultIterative);