class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(){
    this.firstInsert = null;
    this.lastInsert = null;
    this.length = 0;
  }
  peek() {
    return this.firstInsert;
  }
  enqueue(value){
    const newNode = new Node(value);
    if (this.length === 0) {
      this.firstInsert = newNode;
      this.lastInsert = newNode;
    } else {
      this.lastInsert.next = newNode;
      this.lastInsert = newNode;
    }
    this.length++;
    return this;
  }
  dequeue(){
    if (!this.firstInsert) {
      return null;
    }
    if (this.firstInsert === this.lastInsert) {
      this.lastInsert = null;
    }
    const holdingPointer = this.firstInsert;
    this.firstInsert = this.firstInsert.next;
    holdingPointer.next = null;
    this.length--;
    return this;
  }

  printQueue() {
    const array = [];
    let currentElement = this.firstInsert;
    while(currentElement !== null) {
      array.push(currentElement.value);
      currentElement = currentElement.next;
    }

    let queue = '';
    array.forEach(value => queue =`${queue} ${value} --> `);
    console.log(queue);
  }
  //isEmpty;
}

const myQueue = new Queue();
myQueue.peek();
myQueue.enqueue('Joy');
myQueue.enqueue('Matt');
myQueue.enqueue('Pavel');
myQueue.peek();
myQueue.printQueue();
