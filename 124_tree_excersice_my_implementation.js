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

  breadthFirstSearchRecursive(queue, list) {
    if (!queue.length) {
      return list;
    }
    const currentNode = queue.shift();
    list.push(currentNode.value);
    
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
    
    return this.breadthFirstSearchRecursive(queue, list);
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

  getImmediateAncestorTwoNodeWithToQueues(first, second) {
    
    const valueToFind = (value, queue) => {
      let currentNode = this.root;
      while (currentNode !== null) {
        queue.push(currentNode.value);
        if (currentNode.value === value) {
          return { node: currentNode, queue };
        } else if (currentNode.value > value) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
      return null;
    }

    const compareQueues = (firstQ, secondQ, firstValue, secondValue) => {
      let previousEqual = firstQ[0];
      
      while(firstQ.length || secondQ.length) {
        if(firstQ[1] === secondQ[1] && firstValue !== firstQ[1] && secondValue !== secondQ[1]) {
          previousEqual = firstQ[1];
          firstQ.shift();
          secondQ.shift();
        } else {
          return previousEqual;
        }
      }

    };

    let firstNodeFound = valueToFind(first.value, []);
    let secondNodeFound = valueToFind(second.value, []);

    return compareQueues(firstNodeFound.queue, secondNodeFound.queue, first.value, second.value);
    
  }

  DFSInorder(currentNode, list) {
    if (currentNode.left) {
      this.DFSInorder(currentNode.left, list);
    }

    list.push(currentNode.value);

    if (currentNode.right) {
      this.DFSInorder(currentNode.right, list);
    }

    return list;

  }

  DFSPreorder(currentNode, list) {
    list.push(currentNode.value);
    
    if (currentNode.left) {
      this.DFSPreorder(currentNode.left, list);
    }

    if (currentNode.right) {
      this.DFSPreorder(currentNode.right, list);
    }

    return list;
  }

  DFSPostorder(currentNode, list) {
    if (currentNode.left) {
      this.DFSPostorder(currentNode.left, list);
    }
    
    if (currentNode.right) {
      this.DFSPostorder(currentNode.right, list);
    }

    list.push(currentNode.value);
    
    return list;
  }

}

const tree = new BinarySearchTree();
tree.insert(10)
tree.insert(7)
tree.insert(4)
tree.insert(3)
tree.insert(5)
tree.insert(4.5)
tree.insert(9)
tree.insert(11)
tree.insert(16)
tree.insert(14)
tree.insert(17)
console.log(tree.getImmediateAncestorTwoNodeWithToQueues(new Node(4.5), new Node(17)));

//console.log(tree.depthFirstSearchRecursive(tree.root));
//console.log(tree.breadthFirstSearchRecursive([tree.root], []));
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





