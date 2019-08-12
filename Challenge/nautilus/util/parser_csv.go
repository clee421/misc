package util

import (
	"bufio"
	"encoding/csv"
	"io"
	"os"
)

// ParseCSV opens a new reader on the filename and applies the handler func on each line of the csv
func ParseCSV(filename string, handler func([]string, int) error) error {
	csvFile, err := os.Open(filename)
	if err != nil {
		return err
	}

	defer csvFile.Close()

	reader := csv.NewReader(bufio.NewReader(csvFile))

	line, err := reader.Read()
	for i := 0; err == nil; i++ {
		err = handler(line, i)
		if err != nil {
			return err
		}

		line, err = reader.Read()
	}

	if err != io.EOF {
		return err
	}

	return nil
}
