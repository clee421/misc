package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"os"
	"sort"

	"github.com/aaclee/infatuation/password"
)

func main() {

	// Declaring flags
	// Usage: go run main.go -invalid_list=another_file.txt -input=this_file.txt
	var (
		invalidFile = flag.String("invalid_list", "./files/common_password.txt", "Input file for invalid passwords")
		inputeFile  = flag.String("input", "./files/input.txt", "List of passwords to check")
	)

	flag.Parse()

	// Get the correct data input
	// From STDIN pipe or from file
	dataInput := getDataInput(*invalidFile)

	// Gett the sorted common passwords list from
	// the data input
	invalidList := getCommonPasswords(dataInput)

	// Open input password list
	fmt.Println("Opening input password list: ", *inputeFile)
	inputFile, err := os.Open(*inputeFile)
	if err != nil {
		log.Fatal(err)
	}

	// Load passwords to be checked
	// no need to save them to memory
	fmt.Printf("Running checks on passwords...\n\n")
	scanner := bufio.NewScanner(inputFile)
	for scanner.Scan() {
		p := scanner.Text()

		ok, err := password.Valid(p, &invalidList)
		if !ok {
			fmt.Println(err)
		}
	}
}

func getDataInput(filename string) *os.File {
	// Check if there is STDIN, if not then we'll use the flag
	fi, _ := os.Stdin.Stat()

	// If there is data from the pipe use the pipe data
	// otherwise use from flag
	if (fi.Mode() & os.ModeCharDevice) == 0 {
		// Getting data from pipe
		fmt.Println("Getting invalid password list from STDIN pipe...")
		return os.Stdin
	}

	// Open invalid password list
	fmt.Println("Opening invalid password list: ", filename)
	invalidFile, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	return invalidFile
}

func getCommonPasswords(input *os.File) []string {
	// Array to store list of valid passwords
	commonPasswords := make([]string, 0)

	scanner := bufio.NewScanner(input)
	for scanner.Scan() {
		p := scanner.Text()

		commonPasswords = append(commonPasswords, p)
	}

	// Sort array of strings
	sort.Strings(commonPasswords)

	return commonPasswords
}
