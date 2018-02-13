/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let head = null
  let current = null
  
  while(l1 !== null && l2 !== null) {
      let temp
      if (l1.val < l2.val) {
          temp = l1
          l1 = l1.next
      } else {
          temp = l2
          l2 = l2.next
      }
      
      if (head === null) {
          head = new ListNode(temp.val)
          current = head
      } else {
          current.next = new ListNode(temp.val)
          current = current.next
      }
  }
  
  let leftOver = null
  if (l1 !== null || l2 !== null) {
      leftOver = l1 !== null ? l1 : l2
  }
  
  while (leftOver !== null) {
      current.next = new ListNode(leftOver.val)
      current = current.next
      leftOver = leftOver.next
  }
  
  return head
};