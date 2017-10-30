package main

import "fmt"

func main() {
	var a *int
	b := 134
	a = &b
	fmt.Println(a)
}
