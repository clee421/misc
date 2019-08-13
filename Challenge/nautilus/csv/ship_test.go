package csv

import (
	"math"
	"nl/business"
	"testing"
)

type testFormat struct {
	label    string
	start    int
	end      int
	expected float64
}

const (
	roundPrecision            = 100000
	startTime                 = 1561550400
	hourInSecods              = 3600
	expectedTotalDistance     = 35.0
	expectedTotalFuel         = 210.0
	expectedAverageEfficiency = ((10.0 / 30.0) + (20.0 / 60.0) + (15.0 / 30.0)) / 3
)

var commonTests = []testFormat{
	{
		label:    "Start is after data",
		start:    sr.data[len(sr.data)-1].Timestamp + 1,
		end:      sr.data[len(sr.data)-1].Timestamp + 2,
		expected: 0.0,
	},
	{
		label:    "End is before data",
		start:    sr.data[0].Timestamp - 2,
		end:      sr.data[0].Timestamp - 1,
		expected: 0.0,
	},
	{
		label:    "End is before start",
		start:    sr.data[len(sr.data)-2].Timestamp + 1,
		end:      sr.data[1].Timestamp - 1,
		expected: 0.0,
	},
}

var sr = ShipRepository{
	data: []business.ShipData{
		{Timestamp: startTime, Speed: 10.0, Fuel: 0.5},
		{Timestamp: startTime + (1 * hourInSecods), Speed: 20.0, Fuel: 1.0},
		{Timestamp: startTime + (2 * hourInSecods), Speed: 15.0, Fuel: 0.5},
		{Timestamp: startTime + (3 * hourInSecods), Speed: 25.0, Fuel: 1.5},
		{Timestamp: startTime + (4 * hourInSecods), Speed: 10.0, Fuel: 0.75},
	},
}

func TestTotalDistance(t *testing.T) {
	tests := append([]testFormat{
		{
			label:    "Calulates total distance",
			start:    sr.data[1].Timestamp - 1,
			end:      sr.data[len(sr.data)-2].Timestamp + 1,
			expected: expectedTotalDistance,
		},
	}, commonTests...)

	for _, test := range tests {
		result := sr.TotalDistance(test.start, test.end)
		if result != test.expected {
			t.Errorf("%s - TotalDistance = %f; Expected %f", test.label, result, test.expected)
		}
	}
}

func TestTotalFuel(t *testing.T) {
	tests := append([]testFormat{
		{
			label:    "Calulates total fuel",
			start:    sr.data[0].Timestamp - 1,
			end:      sr.data[len(sr.data)-1].Timestamp + 1,
			expected: expectedTotalFuel,
		},
	}, commonTests...)

	for _, test := range tests {
		result := sr.TotalFuel(test.start, test.end)
		if result != test.expected {
			t.Errorf("%s - TotalFuel = %f; Expected %f", test.label, result, test.expected)
		}
	}
}

func TestAverageEfficiency(t *testing.T) {
	tests := append([]testFormat{
		{
			label:    "Calulates total fuel",
			start:    sr.data[0].Timestamp - 1,
			end:      sr.data[len(sr.data)-2].Timestamp + 1,
			expected: expectedAverageEfficiency,
		},
	}, commonTests...)

	for _, test := range tests {
		result := sr.Efficiency(test.start, test.end)

		roundedResult := math.Round(result*roundPrecision) / roundPrecision
		roundedExpected := math.Round(test.expected*roundPrecision) / roundPrecision

		if roundedResult != roundedExpected {
			t.Errorf("%s - AverageEfficiency = %f; Expected %f", test.label, result, test.expected)
		}
	}
}
