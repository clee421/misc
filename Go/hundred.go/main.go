package main

import "fmt"

func main() {
	// Write a program that outputs all possibilities to put
	// + or - or nothing between the numbers 1, 2, ..., 9
	// (in this order) such that the result is always 100.
	// e.g. 1+2+34-5+67-8+9 = 100

	// The breakdown of this problem is
	// f(1..9) = 100 where
	// 1 + f(2..9) = 100
	// 1 - f(2..9) = 100
	// f(12, 3..9) = 100

	// 1 + f(2..9) = 100 becomes f(2..9) = 99
	// 2 + f(3..9) = 99
	// 2 - f(3..9) = 99
	// f(23, 4..9) = 99

	// 1 - f(2..9) = 100 becomes f(2..9) = -99
	// 2 + f(3..9) = -99
	// 2 - f(3..9) = -99
	// f(23, 4..9) = -99

	// f(12, 3..9) = 100 breaks down to
	// 12 + f(3..9) = 100
	// 12 - f(3..9) = 100
	// f(123, 4..9) = 100

	// etc..

	// BASE CASE
	// f(1) = 9 will return "", false

	const (
		TARGET = 100
		START  = 1
		END    = 9
	)

	findPossibleSolutions(TARGET, 0, START, END)
}

func findPossibleSolutions(target int, digit int, start int, end int) (string, bool) {

	fmt.Println(target)
	fmt.Println(start)
	fmt.Println(end)
}
