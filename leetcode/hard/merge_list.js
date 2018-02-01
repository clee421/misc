/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  let head = null
  let current = null
  let index = null
  let done = false
  
  while (!done) {
      done = true
      for (let i = 0; i < lists.length; i++) {
          if (lists[i] === null) continue

          if (index === null || lists[i].val < lists[index].val) {
              index = i
          }
      }
      
      if (index !== null) {
          if (head === null) {
              head = new ListNode(lists[index].val)
              current = head
          } else {
              current.next = new ListNode(lists[index].val)
              current = current.next
          }
          lists[index] = lists[index].next
          index = null
          done = false
      }
  }
  return head
};