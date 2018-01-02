package main

import (
	"fmt"

	"./pancake"
)

func main() {
	arr := []int{2, 4, 5, 3, 1}
	fmt.Println(arr)

	pancake.Sort(&arr)
	fmt.Println(arr)
}
