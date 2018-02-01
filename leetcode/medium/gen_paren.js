func generateParenthesis(n int) []string {
  var result []string
  createParen(&result, "", 0, 0, n)
  return result
}

func createParen(list *[]string, s string, open, close, max int) {
  if len(s) >= 2 * max {
    *list = append(*list, s)
    return
  }
  
  if open < max {
    createParen(list, s + "(", open + 1, close, max)
  }
  if close < open {
    createParen(list, s + ")", open, close + 1, max)
  }
}
