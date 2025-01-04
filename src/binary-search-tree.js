const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require("../extensions/list-tree.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }
  root() {
    return this.tree;
  }

  add(data) {
    this.tree = addNewNode(this.tree, data);

    function addNewNode(node, data) {
      if (node === null) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data > node.data) {
        node.right = addNewNode(node.right, data);
      } else {
        node.left = addNewNode(node.left, data);
      }

      return node;
    }
  }

  has(data) {
    return this.searchNode(this.tree, data) !== null;
  }

  find(data) {
    return this.searchNode(this.tree, data);
  }
  searchNode(node, data) {
    if (node === null) {
      return null;
    }

    if (node.data === data) {
      return node;
    }

    return data < node.data
      ? this.searchNode(node.left, data)
      : this.searchNode(node.right, data);
  }

  remove(data) {
    this.tree = removeNode(this.tree, data);

    function removeNode(node, data) {
      if (node === null) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
      } else {
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }

        node.data = findMinValue(node.right);
        node.right = removeNode(node.right, node.data);
      }

      return node;
    }

    function findMinValue(node) {
      let current = node;
      while (current.left) {
        current = current.left;
      }
      return current.data;
    }
  }

  min() {
    return this.findMinValue(this.tree);
  }

   findMinValue(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    return this.findMaxValue(this.tree);
  }

  findMaxValue(node) {
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
