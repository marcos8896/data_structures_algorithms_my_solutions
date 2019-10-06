// Given a number N return the index value of the Fibonacci sequence, where the sequence is:

// 0,  1,  1,  2,  3,  5,  8,  13, 21, 34, 55,  89,  144 ...  value
// 0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10 - 11 - 12 ...   index
// the pattern of the sequence is that each value is the sum of the 2 previous values, that means that for N=5 → 2+3

//For example: fibonacciRecursive(6) should return 8

function fibonacciIterative(n){
  
  if (n <= 0) {
    return 0;
  }

  let previous = 0;
  let result = 1;
  let counter = 1;
  while(counter !== n) {
    const temp = result;
    result += previous;
    previous = temp;
    counter++;
  }
  return result;
}
console.log('iterative result: ', fibonacciIterative(12));

function fibonacciRecursive(n, first = 0, second = 1) {

  if (n === 0) {
    return 0;
  }

  if(n > 2) {
    return fibonacciRecursive(n - 1, second, first + second);
  }
  return first + second;
}

console.log('recursive result: ', fibonacciRecursive(12));