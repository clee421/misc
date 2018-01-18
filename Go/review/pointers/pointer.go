package main

import "fmt"

type user struct {
	Name string
}

// Output:
// Leo
// Leo

// func modify(u *user) {
// 	u = &user{"Frank"}
// }

// func main() {
// 	u := &user{"Leo"}
// 	fmt.Println(u.Name)
// 	modify(u)
// 	fmt.Println(u.Name)
// }

// Go pass by reference
// ***********************

// Output:
// Leo
// Frank

func modify(u **user) {
	*u = &user{"Frank"}
}

func main() {
	u := &user{"Leo"}
	fmt.Println(u.Name)
	modify(&u)
	fmt.Println(u.Name)
}
