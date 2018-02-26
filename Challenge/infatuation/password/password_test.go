package password

import (
	"errors"
	"fmt"
	"testing"
)

func TestValidToReturnFalseOnMinPassword(t *testing.T) {
	empty := make([]string, 0)
	result, err := Valid("pass", &empty)
	expectedResult := false
	expectedError := errors.New("Error: Too Short -> pass")

	if result != expectedResult && err != expectedError {
		t.Fatalf("Expected %s but got %s", expectedError, err)
		return
	}

	t.Log("Valid checks for minimum length")
}

func TestValidToReturnFalseOnMaxPassword(t *testing.T) {
	empty := make([]string, 0)
	longPassword := "12345678901123456789011234asd890112345678901123456789011#$%567890112345678901"

	result, err := Valid(longPassword, &empty)
	expectedResult := false
	expectedError := fmt.Errorf("Error: Too Long -> %v", longPassword)

	if result != expectedResult && err != expectedError {
		t.Fatalf("Expected %s but got %s", expectedError, err)
	}

	t.Log("Valid checks for maximum length")
}

func TestValidToReturnFalseOnInvalidASCII(t *testing.T) {
	empty := make([]string, 0)

	result, err := Valid("Hello 世界", &empty)
	expectedResult := false
	expectedError := errors.New("Error: Invalid Charater(s) -> Hello **")

	if result != expectedResult && err != expectedError {
		t.Fatalf("Expected %s but got %s", expectedError, err)
	}

	t.Log("Valid allows only ASCII")
}

func TestValidToReturnFalseOnCommonPassword(t *testing.T) {
	// This has to be sorted
	list := []string{"mypassword", "password"}

	result, err := Valid("password", &list)
	expectedResult := false
	expectedError := errors.New("Error: Too Common -> password")

	if result != expectedResult && err != expectedError {
		t.Fatalf("Expected %s but got %s", expectedError, err)
	}

	t.Log("Valid checks against a common password list")
}

func TestValidToReturnTrueOnValidPassword(t *testing.T) {
	// This has to be sorted
	list := []string{"mypassword", "password"}

	result, err := Valid("secret_password", &list)
	expectedResult := true
	var expectedError error

	if result != expectedResult && err != expectedError {
		t.Fatalf("Expected %s but got %s", expectedError, err)
	}

	t.Log("Valid password")
}
