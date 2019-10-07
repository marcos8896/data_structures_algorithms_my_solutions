const arrayToSort = [42, 23, 54, 1, -23, 5, 99];

function bubbleSort(array) {
  let alreadySortedElements = 0;
  while(alreadySortedElements !== array.length) {
    let prevCounter = 0;
    let currentCounter = 1;
    
    while(currentCounter < array.length - alreadySortedElements) {
      if(array[prevCounter] > array[currentCounter]) {
        const temp = array[prevCounter];
        array[prevCounter] = array[currentCounter];
        array[currentCounter] = temp;
      }

      currentCounter++;
      prevCounter++;
    }

    alreadySortedElements++;
  }
}
bubbleSort(arrayToSort);
console.log(arrayToSort);