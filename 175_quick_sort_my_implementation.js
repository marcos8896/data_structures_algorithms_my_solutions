const numbers = [12, 45, 1, 13, 3, 10, 8, 6, 23, 14];

function quickSort(array) {

  if(array.length <= 1) {
    return array;
  }

  let initialPivotPos = array.length - 1;
  let pivotPosition = initialPivotPos;
  let backCounter = 0;
  
  while (pivotPosition > backCounter) {
    if (array[backCounter] > array[pivotPosition]) {
      const greaterNumber = array[backCounter];
      array.splice(backCounter, 1);
      array.splice(pivotPosition, 0, greaterNumber);
      pivotPosition--;
    } else {
      backCounter++;
     }

  }

  if (initialPivotPos === pivotPosition) {
    return array;
  }

  const rightArray = array.splice(pivotPosition + 1);
  const pivot = array.splice(pivotPosition, 1)[0];
  const leftArray = array.splice(0);

  return append(
    quickSort(leftArray),
    pivot,
    quickSort(rightArray),
  )

}

function append(left, pivot, right) {
  return [...left, pivot, ...right];
}

const result = quickSort(numbers);
console.log('result: ', result);