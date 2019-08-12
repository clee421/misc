package util_test

import (
	"nl/util"
	"reflect"
	"strconv"
	"testing"
)

/**
 * Design Decisions
 * Using reflect.DeepEqual is not preferable but for this take home I would like to
 * not use 3rd Party Libraries to remove build complications potentially.
 * https://github.com/google/go-cmp would be a great library to use or a more
 * comprehensive testing suite like https://onsi.github.io/ginkgo/
 */
func TestParseCSV(t *testing.T) {
	expected := [][]string{
		{"0", "col1", "col2", "col3"},
		{"1", "row1col1", "row1col2", "row3col3"},
		{"2", "row2col1", "row2col2", "row2col3"},
		{"3", "row3col1", "row3col2", "row3col3"},
	}

	result := [][]string{}
	util.ParseCSV("./test_data/test.csv", func(line []string, index int) error {
		line = append([]string{strconv.Itoa(index)}, line...)
		result = append(result, line)

		return nil
	})

	if !reflect.DeepEqual(result, expected) {
		t.Error("ParseCSV(\"./test_data/test.csv\")")
		t.Error("Expected", expected)
		t.Error("Result", result)
	}
}
