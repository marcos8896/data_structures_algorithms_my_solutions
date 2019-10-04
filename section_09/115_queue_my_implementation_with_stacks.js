class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}


class Stack {
  constructor () {
    this.top = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  push(value) {
    const node = new Node(value);

    if(this.size === 0) {
      this.top = node;
    } else {
      const holdingPointer = this.top;
      this.top = node;
      this.top.next = holdingPointer;
    }

    this.size++;
  }

  peek() {
    if (this.size === 0) return null;
    return this.top;
  }

  pop() {
    if (this.size === 0) return null;

    const holdingPointer = this.top;
    this.top = this.top.next;
    holdingPointer.next = null;
    this.size--;
    return holdingPointer;
  }
}

class QueueWithStacks {
  constructor() {
    this.firstStack = new Stack();
    this.secondStack = new Stack();
  }

  isEmpty() {
    return this.firstStack.size === 0 && this.secondStack.size === 0;
  }

  push(value) {
    if (this.secondStack.isEmpty()) {
      this.firstStack.push(value)
    } else {
      let currentSecStk = this.secondStack.peek();

      while(currentSecStk !== null) {
        this.secondStack.pop();
        this.firstStack.push(currentSecStk.value);
        currentSecStk = this.secondStack.peek();
      }

      this.firstStack.push(value);
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    if (this.secondStack.isEmpty()) {
      let currentFirstStack = this.firstStack.peek();

      while( currentFirstStack.next !== null ) {
        this.firstStack.pop();
        this.secondStack.push(currentFirstStack.value);
        currentFirstStack = this.firstStack.peek();
      }

      this.firstStack.pop();
      return currentFirstStack;
    } else {
      const currentSecStack = this.secondStack.peek();
      this.secondStack.pop();
      return currentSecStack;
    }

  }

  peek() {
    if (this.isEmpty()) return null;

    if(this.secondStack.isEmpty()) {
      let currentFirstStk = this.firstStack.peek();
      while (currentFirstStk.next !== null) {
        this.firstStack.pop();
        this.secondStack.push(currentFirstStk.value);
        currentFirstStk = this.firstStack.peek()
      }
      this.firstStack.pop();
      this.secondStack.push(currentFirstStk.value);
      return currentFirstStk;
    } else {
      return this.secondStack.peek();
    }
  }

}

const myQueueStack = new QueueWithStacks();
myQueueStack.push(1);
myQueueStack.push(2);
myQueueStack.push(3);
myQueueStack.pop();
myQueueStack.push(4);

//console.log('peek', myQueueStack.peek());
console.log('first', JSON.stringify(myQueueStack.firstStack, null, '  '));
console.log('second', JSON.stringify(myQueueStack.secondStack, null, '  '));




const newStack = new Stack();
newStack.push(2);
newStack.push(3);

