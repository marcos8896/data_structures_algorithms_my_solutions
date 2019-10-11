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
    let immediateAncestor = null;
    let ancestorDirection = null;
    let nodeDirection;
    let found = false;

    while (currentNode !== null && !found) {
      holdingPointer = currentNode;

      if (currentNode.value === value) {
        found = true;
      } else {
        nodeDirection = currentNode.value > value ? LEFT_DIRECTION : RIGHT_DIRECTION;
        currentNode = currentNode[nodeDirection];
        immediateAncestor = holdingPointer;
        ancestorDirection = nodeDirection;
      }
      
    }
    //console.log('immediateAncestor: ', immediateAncestor);
    //console.log('ancestorDirection: ', ancestorDirection);

    return found ? { 
      foundNode: holdingPointer,
      ancestor: immediateAncestor,
      ancestorDirection,
    } : null;

    
  }
  
  remove(value) {
    const lookupResult = this.lookup(value);

    // If node to delete was not found
    if(lookupResult === null) {
      return null;
    }

    const {ancestor, ancestorDirection, foundNode: nodeToDelete } = lookupResult;
    const currentNode = nodeToDelete;

    if(currentNode[LEFT_DIRECTION] === null && currentNode[RIGHT_DIRECTION] === null) {
      //Nodes without childen nodes
      
      if(ancestor !== null)
        ancestor[ancestorDirection] = null;
      else
        this.root = null;
    
    } else if(currentNode[RIGHT_DIRECTION] !== null && currentNode[LEFT_DIRECTION] === null) {
      //Node with only right child

      if(ancestor !== null)
        ancestor[ancestorDirection] = currentNode;
      else
        this.root = currentNode[RIGHT_DIRECTION];
    } else {
      //Nodes with RIGHT and LEFT childen nodes
      
      let leftChild = currentNode[LEFT_DIRECTION];

      if(leftChild[RIGHT_DIRECTION] === null) {
        ancestor[ancestorDirection] = leftChild;
        leftChild[RIGHT_DIRECTION] = currentNode[RIGHT_DIRECTION];
        // Maybe also remove nodeToDelete reference to its children?
      } else {

        let previousReplacementNode = leftChild;
        let replacementNode = leftChild[RIGHT_DIRECTION];
        while(replacementNode[RIGHT_DIRECTION] !== null) {
          previousReplacementNode = replacementNode;
          replacementNode = replacementNode[RIGHT_DIRECTION];
        }

        if(replacementNode[LEFT_DIRECTION] !== null) {
          previousReplacementNode[RIGHT_DIRECTION] = replacementNode[LEFT_DIRECTION];
        } else {
          previousReplacementNode[RIGHT_DIRECTION] = null;
        }
        replacementNode[LEFT_DIRECTION] = currentNode[LEFT_DIRECTION];
        replacementNode[RIGHT_DIRECTION] = currentNode[RIGHT_DIRECTION];

        //Only do this if node to delete is not the root
        if(ancestor !== null)
          ancestor[ancestorDirection] = replacementNode;
        else
          this.root = replacementNode;
      }
    }

    return nodeToDelete;
  }

  breadthFirstSearch() {
    const queue = [this.root];
    const allElements = [];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      allElements.push(currentNode.value);
      if(currentNode.left !== null)
        queue.push(currentNode.left)

      if(currentNode.right !== null)
        queue.push(currentNode.right)
  
    }

    return allElements;
  }

  depthFirstSearchRecursive(currentNode) {
    if(!currentNode.left && !currentNode.right) {
      return currentNode.value;
    }

    if(currentNode.left && currentNode.right) {
      return [currentNode.value, ...this.splitTreeDFS(currentNode.left, currentNode.right)];
    }

    if(currentNode.left) {
      return [currentNode.value, this.depthFirstSearchRecursive(currentNode.left)];
    }

    if(currentNode.right) {
      return [currentNode.value, this.depthFirstSearchRecursive(currentNode.right)];
    }
  }

  splitTreeDFS(left, right) {
    let resultLeft = this.depthFirstSearchRecursive(left);
    let resultRight = this.depthFirstSearchRecursive(right);
    return [
      ...(Array.isArray(resultLeft) ? resultLeft : [resultLeft]), 
      ...(Array.isArray(resultRight) ? resultRight : [resultRight]), 
    ];
  }

}

const tree = new BinarySearchTree();
// tree.insert(9)
// tree.insert(5)
// tree.insert(3)
// tree.insert(4)
// tree.insert(6)
// tree.insert(27)
// tree.insert(20)
// tree.insert(16)
// tree.insert(13)
// tree.insert(12)
// tree.insert(15)
// tree.insert(15.1)
// tree.insert(15.05)
// tree.insert(15.07)
// tree.insert(15.06)
// tree.insert(15.06)
// tree.insert(24)
// tree.insert(26)
// tree.insert(25)
// tree.insert(26.1)
// tree.insert(3.9)
// tree.remove(20)
// tree.remove(16)
// tree.remove(15.1)
// tree.remove(12)
// tree.remove(9)

//console.log(tree);
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(15)
tree.insert(1)
tree.insert(171)


console.log(tree.depthFirstSearchRecursive(tree.root));
//console.log(tree.breadthFirstSearchRecursive(tree.root));
//console.log('lookup 1: ', JSON.stringify(tree.lookup(14), null, '  '))

//     9
//  4     20
//1  6  15  170

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}





