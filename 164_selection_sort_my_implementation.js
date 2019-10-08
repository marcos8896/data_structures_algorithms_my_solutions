const items = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort(array) {
  if (array.length <= 1) {
    return array;
  }
  
  let length = array.length;
  let alreadySortedItems = 0;
  
  while(alreadySortedItems < length) {
    let smallestIndex = alreadySortedItems;
    for(let i = alreadySortedItems; i < length - 1; i++) {
      if(array[smallestIndex] > array[i + 1]) {
        smallestIndex = i + 1;
      }
    }

    const temp = array[alreadySortedItems];
    array[alreadySortedItems] = array[smallestIndex];
    array[smallestIndex] = temp;

    alreadySortedItems++;

  }

}
selectionSort(items);
console.log(items);