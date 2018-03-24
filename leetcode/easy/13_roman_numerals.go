package main

import "fmt"

func main() {
	// test := "MMMCMXCIX"
	test := "MMMCMXCIX"
	res := romanToInt(test)
	fmt.Printf("The result of %v is %v\n", test, res)
}

func romanToInt(s string) int {
	romanMap := map[string]int{
		"I": 1,
		"V": 5,
		"X": 10,
		"L": 50,
		"C": 100,
		"D": 500,
		"M": 1000,
	}

	total := 0
	for i := len(s) - 1; i >= 0; i-- {
		curr := string(s[i])
		prev := "null"

		// Don't over index
		if i+1 < len(s) {
			prev = string(s[i+1])
		}

		// For instances of IV where the current is less
		// than the previous so we will subtract instead
		if prev != "null" && romanMap[curr] < romanMap[prev] {
			total -= romanMap[curr]
			continue
		}

		total += romanMap[curr]
	}

	return total
}
