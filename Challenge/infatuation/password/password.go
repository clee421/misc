package password

import (
	"errors"
	"fmt"
	"sort"
)

const (
	minPasswordLength = 8
	maxPasswordLength = 64
)

// Valid checks the validity of a given password
// @params invalidList MUST BE SORTED!
func Valid(pass string, invalidList *[]string) (bool, error) {
	// Checks minimum password length
	if len(pass) < minPasswordLength {
		errorStr := fmt.Sprintf("Error: Too Short -> %v", pass)
		return false, errors.New(errorStr)
	}

	// Checks maximum password length
	if len(pass) > maxPasswordLength {
		errorStr := fmt.Sprintf("Error: Too Long -> %v", pass)
		return false, errors.New(errorStr)
	}

	// ASCII List https://ascii.cl/
	// Checks for valid ASCII
	if s, ok := checkASCII(pass); !ok {
		errorStr := fmt.Sprintf("Error: Invalid Charater(s) -> %v", s)
		return false, errors.New(errorStr)
	}

	// Checks against commons passwords
	// This check should stay last as it is the most expensive check
	if common := checkCommonPassword(pass, invalidList); common {
		errorStr := fmt.Sprintf("Error: Too Common -> %v", pass)
		return false, errors.New(errorStr)
	}

	return true, nil
}

func checkASCII(str string) (string, bool) {
	ok := true

	// Check every rune if it's a valid ASCII
	// Valid ASCII are from 0 to 127
	// If rune is invalid then set rune to 42(*)
	runeStr := []rune(str)
	for i, r := range runeStr {
		if r > 127 {
			// If we've had to change a char then the string
			// is not a valid ASCII string anymore
			ok = false
			runeStr[i] = 42
		}
	}

	return string(runeStr), ok
}

func checkCommonPassword(str string, sorted *[]string) bool {
	sortedArr := *sorted

	// i will be the index of where it's to be inserted if
	// the str is not found
	i := sort.SearchStrings(sortedArr, str)
	return i < len(sortedArr) && sortedArr[i] == str
}
