//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function restoreBinaryTree(inorder, preorder) {
  if (inorder.length === 1) {
      return new Tree(inorder[0])
  }
  
  if (preorder.length < 1) {
      return null
  }
  
  const root = new Tree(preorder[0])
  const rootIndex = inorder.indexOf(preorder[0]);
  
  const inorderLeft = inorder.slice(0, rootIndex)
  const inorderRight = inorder.slice(rootIndex + 1)
  
  const preorderLeft = preorder.slice(1, inorderLeft.length + 1)
  const preorderRight = preorder.slice(inorderLeft.length + 1)
  
  root.left = restoreBinaryTree(inorderLeft, preorderLeft)
  root.right = restoreBinaryTree(inorderRight, preorderRight)
  
  return root
}
