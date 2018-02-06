/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  if ((head === null) || (head.next === null)) return head;
  let node = head.next;
  head.next = swapPairs(head.next.next);
  node.next = head
  return node;
};