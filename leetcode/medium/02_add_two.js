// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
* @param {ListNode} l1
* @param {ListNode} l2
* @return {ListNode}
*/
var addTwoNumbers = function(l1, l2) {
  let current1 = l1
  let current2 = l2
  
  let solutionHead = new ListNode(null)
  let currentHead = solutionHead
  
  let carry = 0
  while (current1 !== null && current2 !== null) {
      let sum = current1.val + current2.val + carry
      currentHead.next = new ListNode(sum % 10)
      carry = Math.floor(sum / 10)
      currentHead = currentHead.next
      current1 = current1.next
      current2 = current2.next
  }
  
  let remainderNode
  current1 === null ? remainderNode = current2 : remainderNode = current1
  
  while (remainderNode !== null) {
      let sum = remainderNode.val + carry
      currentHead.next = new ListNode(sum % 10)
      carry = Math.floor(sum / 10)
      currentHead = currentHead.next
      remainderNode = remainderNode.next
  }
  
  if (carry === 1) {
      currentHead.next = new ListNode(carry)
      currentHead = currentHead.next
  }
  
  // first node was null
  solutionHead = solutionHead.next
  
  // turn linked list into an array??
  const solutionArr = []
  while (solutionHead != null) {
      solutionArr.push(solutionHead.val)
      solutionHead = solutionHead.next
  }
  return solutionArr
};