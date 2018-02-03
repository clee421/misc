/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    if (k <= 1 || head === null) return head
    
    let count = countLL(head)
    if (count < k) return head
    
    let revHead = null
    let revTail = null
    
    for(let i = 0; i < k; i++) {       
        if(revTail === null) {
            revTail = head
            revHead = head
            head = head.next
        } else {
            let temp = head
            head = head.next
            temp.next = revHead
            revHead = temp
        }
    }
    
    revTail.next = reverseKGroup(head, k)
    return revHead
};

var countLL = function(head) {
    let count = 0
    let temp = head
    while(temp !== null) {
        temp = temp.next
        count++
    }
    
    return count
};