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
  lookup(value){
    //Code here
    if (this.root === null) {
      return null;
    }

    let currentNode = this.root;
    let holdingPointer;
    let nodeDirection;
    let found = false;

    while (currentNode !== null && !found) {
      holdingPointer = currentNode;

      if (currentNode.value === value) {
        found = true;
      } else {
        nodeDirection = currentNode.value > value ? LEFT_DIRECTION : RIGHT_DIRECTION;
        currentNode = currentNode[nodeDirection];
      }

    }

    return found ? holdingPointer : null;

    
  }
  // remove
}

const tree = new BinarySearchTree();
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(15)
tree.insert(1)
console.log(JSON.stringify(traverse(tree.root), null, '  '))
console.log('lookup 1: ', JSON.stringify(tree.lookup(14), null, '  '))

//     9
//  4     20
//1  6  15  170

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}





