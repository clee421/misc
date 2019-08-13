package http_test

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"math"
	"net/http"
	"net/http/httptest"
	"nl/csv"
	nl_http "nl/http"
	"nl/ship"
	"testing"
)

const (
	roundPrecision = 100000
)

func TestServer(t *testing.T) {
	shipRepository, err := csv.NewShipRepository("./test_data/test.csv")
	if err != nil {
		t.Fatalf("Could not create test repository %v\n", err)
	}

	shipService, err := ship.NewService(shipRepository)
	if err != nil {
		t.Fatalf("Could not create test service %v\n", err)
	}

	service := nl_http.Service{
		ShipService: shipService,
	}

	var b bytes.Buffer
	logger := log.New(io.Writer(&b), "[NL-TESTING]: ", log.Ldate)

	config := nl_http.Config{
		Log:  logger,
		Port: 8000,
	}

	server := nl_http.CreateServer(service, config)

	testServer := httptest.NewServer(server.CreateMux())
	defer testServer.Close()

	tests := []struct {
		label    string
		url      string
		key      string
		expected float64
	}{
		{
			label:    "Total Distance",
			url:      "/api/total_distance?start=1561529399&end=1561558201",
			key:      "total_distance",
			expected: 160.0,
		},
		{
			label:    "Total Fuel",
			url:      "/api/total_fuel?start=1561529399&end=1561558201",
			key:      "total_fuel",
			expected: 2400.0,
		},
		{
			label:    "Average Efficiency",
			url:      "/api/efficiency?start=1561529399&end=1561558201",
			key:      "efficiency",
			expected: 0.066667,
		},
	}

	for _, test := range tests {
		url := testServer.URL + test.url
		resp, err := http.Get(url)
		if err != nil {
			t.Fatal(err)
		}

		if resp.StatusCode != 200 {
			t.Fatalf("Received non-200 response: %d\n", resp.StatusCode)
		}

		var body interface{}
		err = json.NewDecoder(resp.Body).Decode(&body)
		if err != nil {
			t.Fatal(err)
		}

		result := body.(map[string]interface{})

		roundedResult := math.Round(result[test.key].(float64)*roundPrecision) / roundPrecision
		roundedExpected := math.Round(test.expected*roundPrecision) / roundPrecision

		if roundedResult != roundedExpected {
			t.Errorf("%s; GET: %s = %f; Expected %f", test.label, test.url, roundedResult, roundedExpected)
		}
	}

	errorTests := []struct {
		label        string
		url          string
		key          string
		expected     string
		expectedCode int
	}{
		{
			label:        "End before start",
			url:          "/api/efficiency?start=1561558201&end=1561529399",
			key:          "error",
			expected:     "PARAM_ERR: end cannot be less than start",
			expectedCode: 400,
		},
	}

	for _, et := range errorTests {
		url := testServer.URL + et.url
		resp, err := http.Get(url)
		if err != nil {
			t.Fatal(err)
		}

		if resp.StatusCode != et.expectedCode {
			t.Fatalf("Received non-%dresponse: %d\n", et.expectedCode, resp.StatusCode)
		}

		var body interface{}
		err = json.NewDecoder(resp.Body).Decode(&body)
		if err != nil {
			t.Fatal(err)
		}

		result := body.(map[string]interface{})

		if result[et.key] != et.expected {
			t.Errorf("%s; GET: %s = %s; Expected %s", et.label, et.url, result[et.key], et.expected)
		}
	}
}
