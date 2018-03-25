package main

import "fmt"

func main() {
	// arr := []int{16, 17, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 15}
	arr := []int{5, 1, 3}
	i := search(arr, 5)
	fmt.Println(i)
}

func search(nums []int, target int) int {
	s, e := 0, len(nums)-1
	for s <= e {
		mid := (s + e) / 2
		if nums[mid] == target {
			return mid
		}

		if nums[mid] < nums[s] && target > nums[e] {
			e = mid - 1
		} else if nums[mid] > nums[e] && target < nums[s] {
			s = mid + 1
		} else if target > nums[mid] {
			s = mid + 1
		} else if target < nums[mid] {
			e = mid - 1
		}
	}

	return -1
}
