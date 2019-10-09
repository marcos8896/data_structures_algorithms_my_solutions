const numbers = [1, -65, 0, 41, 112, 2, 44, 6, 99];

function mergeSort (array) {
  
  if (array.length <= 1) {
    return array;
  }

  // Split Array in into right and left
  const halfLength = Math.ceil(array.length / 2);    
  const leftArray = array.splice(0,halfLength);
  const rightArray = array.splice(0);
  
  return merge(
    mergeSort(leftArray),
    mergeSort(rightArray)
  )
}

function merge(left, right){
  
  if(left !== undefined && right !== undefined) {
    
    const mergedArray = [];
    while(left.length !== 0 || right.length !== 0) {

      if (left.length !== 0 && right.length !== 0) {
        mergedArray.push( left[0] < right[0] ? left.splice(0,1)[0] : right.splice(0,1)[0] );
      } else if (left.length > 1) {
        mergedArray.push( left[0] < left[1] ? left.splice(0,1)[0] : left.splice(1,1)[0] );
      } else if (left.length === 1) {
        mergedArray.push( left.splice(0,1)[0] );
      } else if (right.length > 1) {
        mergedArray.push( right[0] < right[1] ? right.splice(0,1)[0] : right.splice(1,1)[0] );
      } else {
        mergedArray.push( right.splice(0,1)[0] );
      }
    }

    return mergedArray;
  }

}

const answer = mergeSort(numbers);
console.log('answer', answer);