const numbers = [99, 44, 6, 2, 1, 5, 63, 87, -283, 4, 0];

function insertionSort(array) {
  const length = array.length;
  if (length <= 1) {
    return array;
  }

  let alreadyPassedValues = 1;
  while(alreadyPassedValues < length) { //Check this

    for(let x = 0; x < alreadyPassedValues; x++) {

      if(array[x] > array[alreadyPassedValues]) {
        const temp = array[x];
        array[x] = array[alreadyPassedValues];
        array[alreadyPassedValues] = temp;
      }
    }
    alreadyPassedValues++;
  }
}

insertionSort(numbers);
console.log(numbers);