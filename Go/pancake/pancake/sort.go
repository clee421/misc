package pancake

// Sort inefficiently sorts the array by flipping only
func Sort(arr *[]int) {
	for last := len(*arr) - 1; last > 0; last-- {
		index := largestByIndex(arr, last)

		if index == last {
			continue
		}

		if index != 0 {
			flip(arr, index+1)
		}

		flip(arr, last+1)
	}
}

func flip(arr *[]int, k int) {
	if arr == nil || len(*arr) < 2 {
		return
	}

	if k > len(*arr) {
		k = len(*arr)
	}

	a := *arr
	for i := 0; i < k/2; i++ {
		a[i], a[k-1-i] = a[k-1-i], a[i]
	}
}

func largestByIndex(arr *[]int, last int) int {
	a := *arr

	var li int
	lv := a[0]

	for i := 0; i <= last; i++ {
		if a[i] > lv {
			lv = a[i]
			li = i
		}
	}

	return li
}
