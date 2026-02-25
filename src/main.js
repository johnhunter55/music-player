import "./style.css";

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListWithTail {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Print each node's data in the LL
  printList() {
    // start by printing the head node's data
    // need to keep track of the node with a variable so that I can reassign it to its 'next' node
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }

  find(data) {
    // given data, find and return the node with matching data, else null
    let current = this.head;
    while (current !== null) {
      // is current.data === data ? return it : reset current
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  append(data) {
    // First create a node object with given data
    const newNode = new Node(data);

    // Check if the LL is empty
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    // DRY version:
    // if (this.head === null) {
    //   // Set head AND tail = newNode
    //   this.head = newNode
    // }

    // if (this.tail !== null) {
    //   this.tail.next = newNode
    // }

    // this.tail = newNode
  }
}
