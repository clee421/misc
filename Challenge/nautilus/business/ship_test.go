package business_test

import (
	"nl/business"
	"testing"
)

const (
	startTime                 = 1561550400
	hourInSecods              = 3600
	expectedDistanceTravelled = 50.0
	expectedFuelConsumed      = 60.0
	expectedEfficiency        = expectedDistanceTravelled / expectedFuelConsumed
)

var a = business.ShipData{
	Timestamp: startTime,
	Speed:     50.0,
	Fuel:      1.0,
}

var b = business.ShipData{
	Timestamp: a.Timestamp + hourInSecods,
	Speed:     60.0,
	Fuel:      1.0,
}

func TestDistanceTravelled(t *testing.T) {
	result := a.DistanceTravelled(b)
	if result != expectedDistanceTravelled {
		t.Errorf("DistanceTravelled = %f; Expected %f", result, expectedDistanceTravelled)
	}
}

func TestFuelConsumed(t *testing.T) {
	result := a.FuelConsumed(b)
	if result != expectedFuelConsumed {
		t.Errorf("FuelConsumed = %f; Expected %f", result, expectedFuelConsumed)
	}
}

func TestEfficiency(t *testing.T) {
	result := a.Efficiency(b)
	if result != expectedEfficiency {
		t.Errorf("Efficiency = %f; Expected %f", result, expectedEfficiency)
	}
}
