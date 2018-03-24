package main

import (
	"fmt"
)

func main() {
	i := strStr("aaaaa", "bb")
	fmt.Println(i)
}

func strStr(haystack string, needle string) int {
	if needle == "" {
		return 0
	}

	if haystack == "" {
		return -1
	}

	// end condition ensures indexing out of haystack
	endCondition := len(haystack) - len(needle) + 1
	for i := 0; i < endCondition; i++ {

		if haystack[i] == needle[0] {
			r1 := []rune(haystack[i : len(needle)+i])
			r2 := []rune(needle)

			if isSame(r1, r2) {
				return i
			}
		}
	}

	return -1
}

func isSame(r1 []rune, r2 []rune) bool {
	if len(r1) != len(r2) {
		return false
	}

	for i, r := range r1 {
		if r != r2[i] {
			return false
		}
	}

	return true
}
