package main

import (
	"os/exec"
	"strings"
	"testing"
)

func TestMainToReturnErrorOnInvalidPasswords(t *testing.T) {
	subproc := exec.Command("cat ./files/10_million_password_list_top_100000.txt | go run main.go -input=./files/input.txt")
	input := "mypassword\npassword\n"
	subproc.Stdin = strings.NewReader(input)
	output, _ := subproc.Output()

	expectedResult := "Getting invalid password list from STDIN pipe...\nOpening input password list:  ./files/input.txt\nRunning checks on passwords...\n\nError: Too Common -> 12345678\nError: Invalid Charater(s) -> Hello **\nError: Too Short -> asdf\nError: Too Common -> password\nError: Too Long -> 12345678901123456789011234567890112345678901123456789011234567890112345678901"

	if expectedResult != string(output) {
		t.Errorf("Expected %s but got %s", expectedResult, string(output))
	}
	subproc.Wait()
}
