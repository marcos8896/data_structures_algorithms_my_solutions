const LEFT_DIRECTION = 'left';
const RIGHT_DIRECTION = 'right';

class Node {
  constructor(value){
    this[LEFT_DIRECTION] = null;
    this[RIGHT_DIRECTION] = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }

  insert(value){
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    let holdingPointer;
    let nodeDirection;

    while (currentNode !== null) {
      holdingPointer = currentNode;
      nodeDirection = currentNode.value > value ? LEFT_DIRECTION : RIGHT_DIRECTION;
      currentNode = currentNode[nodeDirection];
    }

    holdingPointer[nodeDirection] = newNode;

  }

  insertInRandomPosition(value) {
    
    if (this.root === null) {
      this.root = new Node(value);
      return this.root;
    }

    let currentNode = this.root;
    let prevNode = currentNode;
    let prevDirection = LEFT_DIRECTION;
    while (currentNode !== null) {
      prevNode = currentNode;
      const random = Math.random();
      if (random > 0.5) {
        prevDirection = LEFT_DIRECTION;
        currentNode = currentNode[LEFT_DIRECTION];
      } else {
        prevDirection = RIGHT_DIRECTION;
        currentNode = currentNode[RIGHT_DIRECTION];
      }
    }
    console.log('prevNode value:', prevNode.value);
    console.log('prevDirection:', prevDirection);
    const node = new Node(value);
    prevNode[prevDirection] = node;
    return node;

  }

  DFSInOrder(currentNode, list = []) {
    if (currentNode.left) {
      this.DFSInOrder(currentNode.left, list);
    }

    list.push(currentNode.value);

    if (currentNode.right) {
      this.DFSInOrder(currentNode.right, list);
    }

    return list;
  }

  DFSReturnedArrayInOrder(array) {
    let count = 0;
    let valid = true;
    while(count < array.length - 1 && valid) {
      if((array[count] > array[count + 1])) {
        valid = false;
      }
      count++;
    }

    return valid;
  }

  isValidBinarySearchTree(root) {
    const inOrderResult = this.DFSInOrder(root);
    return this.DFSReturnedArrayInOrder(inOrderResult);
  }

}

const tree = new BinarySearchTree();
tree.insert(9)
tree.insert(4)
tree.insert(1)
tree.insert(6)
tree.insert(20)
tree.insert(15)
tree.insert(170)
tree.insertInRandomPosition(44);
console.log(tree.isValidBinarySearchTree(tree.root));

//     9
//  4     20
//1  6  15  170




