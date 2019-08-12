package csv

import (
	"nl/business"
	"reflect"
	"testing"
)

var expected = []business.ShipData{
	{1561522200, 10.0, 5.0},
	{1561543200, 20.0, 5.0},
	{1561546800, 20.0, 5.0},
	{1561550400, 20.0, 5.0},
	{1561687200, 20.0, 5.0},
	{1561690800, 20.0, 5.0},
	{1561694400, 20.0, 5.0},
	{1561795200, 20.0, 5.0},
	{1561798800, 20.0, 5.0},
	{1561802400, 20.0, 5.0},
	{1561806000, 20.0, 5.0},
	{1561816800, 20.0, 5.0},
	{1561860000, 20.0, 5.0},
	{1561863600, 20.0, 5.0},
	{1561867200, 20.0, 5.0},
	{1561870800, 20.0, 5.0},
	{1561874400, 20.0, 5.0},
}

func TestNewShipRepository(t *testing.T) {
	filename := "./test_data/test.csv"
	shipRepository, err := NewShipRepository(filename)
	if err != nil {
		t.Errorf("Error opening %s; %s", filename, err)
	}

	result := shipRepository.data
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("ParsNewShipRepositoryeCSV(\"%s\")\n", filename)
		t.Error("Expected", expected)
		t.Error("Result", result)
	}
}

func TestParseCsvToShipData(t *testing.T) {
	filename := "./test_data/test.csv"
	result, err := ParseCsvToShipData(filename)
	if err != nil {
		t.Errorf("Error opening %s; %s", filename, err)
	}

	if !reflect.DeepEqual(result, expected) {
		t.Errorf("ParseCsvToShipData(\"%s\")\n", filename)
		t.Error("Expected", expected)
		t.Error("Result", result)
	}
}
