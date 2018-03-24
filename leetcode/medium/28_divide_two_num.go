// Divide two integers without using multiplication, division and mod operator.
//
// If it is overflow, return MAX_INT.
//
​
package main
​
import (
	"fmt"
	"math"
)
​
func divide(dividend int, divisor int) int {
	if dividend == 0 {
		return 0
	}
​
	if divisor == 0 {
		return math.MaxInt32
	}
​
	sign := checkSign(dividend, divisor)
​
	udividend, udivisor := abs(dividend), abs(divisor)
​
	q := 0
​
	for udividend >= udivisor {
		bitsDiff := countbits(udividend) - countbits(udivisor)
​
		if udividend < udivisor<<bitsDiff {
			bitsDiff--
		}
​
		udividend -= udivisor << bitsDiff
		q += 1 << bitsDiff
	}
​
	return handleOverflow(q, sign)
}
​
func checkSign(dividend int, divisor int) bool {
	return (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0)
}
​
func abs(num int) uint {
	if num < 0 {
		return uint(-num)
	}
	return uint(num)
}
​
func countbits(num uint) uint {
	var count uint = 0
	for num > 1 {
		count++
		num >>= 1
	}
	return count
}
​
func handleOverflow(result int, sign bool) int {
	if !sign {
		result = -result
	}
​
	if result > math.MaxInt32 {
		result = math.MaxInt32
	}
​
	if result < math.MinInt32 {
		result = math.MinInt32
	}
​
	return result
}
​
func main() {
	fmt.Println(divide(-1, 1))
	fmt.Println(divide(-6, 2))
}

// package main

// import (
// 	"fmt"
// )

// func main() {
// 	res := divide(55, 5)
// 	fmt.Println(res)
// }

// func divide(dividend int, divisor int) int {
// 	if divisor == 0 {
// 		return 2147483647
// 	}

// 	if divisor == 1 {
// 		return handleOverflow(dividend)
// 	}

// 	if divisor == -1 {
// 		return handleOverflow(-dividend)
// 	}

// 	neg := false
// 	if (dividend < 0) != (divisor < 0) {
// 		neg = true
// 	}

// 	dividend = abs(dividend)
// 	divisor = abs(divisor)

// 	q := 0
// 	for dividend >= divisor {
// 		dividend -= divisor
// 		q++
// 	}

// 	if neg {
// 		q = -q
// 	}

// 	return handleOverflow(q)
// }

// func abs(n int) int {
// 	if n < 0 {
// 		return -n
// 	}

// 	return n
// }

// func handleOverflow(q int) int {
// 	if q > 2147483647 {
// 		return 2147483647
// 	}

// 	if q <= -2147483648 {
// 		return -2147483648 	
// 	}

// 	return q
// }

// 55 / 5						5 >> 1 ~ 2
// 55 >> 1 ~ 27
// 27 >> 1 ~ 13
// 13 >> 1 ~ 6
// 6 >> 1 ~ 3
// 3 >> 1 ~ 1
