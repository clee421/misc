package ship_test

import (
	"nl/ship"
	"testing"
)

const (
	expectedTotalDistance = 1.0
	expectedTotalFuel     = 1.1
	expectedEfficiency    = 1.2
)

type mockRepository struct{}

func (mr *mockRepository) TotalDistance(a int, b int) float64 {
	return expectedTotalDistance
}

func (mr *mockRepository) TotalFuel(a int, b int) float64 {
	return expectedTotalFuel
}

func (mr *mockRepository) Efficiency(a int, b int) float64 {
	return expectedEfficiency
}

func TestNewService(t *testing.T) {
	var result float64

	ss, err := ship.NewService(&mockRepository{})
	if err != nil {
		t.Error("Error creating new ship service")
	}

	result = ss.TotalDistance(0, 1)
	if result != expectedTotalDistance {
		t.Errorf("TotalDistance(0, 1) = %f; Expected %f", result, expectedTotalDistance)
	}

	result = ss.TotalFuel(0, 1)
	if result != expectedTotalFuel {
		t.Errorf("TotalFuel(0, 1) = %f; Expected %f", result, expectedTotalFuel)
	}

	result = ss.Efficiency(0, 1)
	if result != expectedEfficiency {
		t.Errorf("Efficiency(0, 1) = %f; Expected %f", result, expectedEfficiency)
	}
}
