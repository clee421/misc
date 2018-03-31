package main

import "fmt"

func main() {
	max := 100
	// arrive := []int{1, 2, 9, 4, 5}
	// exit := []int{4, 5, 12, 9, 12}
	arrive := oneArrayFunc(100)
	exit := oneArrayFunc(100)

	res := getMaxIntervval(max, arrive, exit)
	fmt.Println(res)
}

func getMaxIntervval(max int, arrive []int, exit []int) int {
	intervalMap := make(map[int]int)

	for i := 0; i < max; i++ {
		for j := arrive[i]; j <= exit[i]; j++ {
			intervalMap[j]++
		}
	}

	fmt.Println(intervalMap)

	bestTime := 25
	bestCount := -1
	for time, count := range intervalMap {
		if (count > bestCount) || (count == bestCount && time < bestTime) {
			bestTime = time
			bestCount = count
		}
	}

	return bestTime
}

func oneArrayFunc(n int) []int {
	arr := make([]int, n)
	for i := range arr {
		arr[i] = 1
	}

	return arr
}
