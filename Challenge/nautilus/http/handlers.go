package http

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
)

/**
 * Design Decision
 * The response types could have been anonymous structs but a well defined
 * response scales more cleanly and makes it easier to refactor
 */

type totalDistanceResponse struct {
	TotalDistance float64 `json:"total_distance"`
}

type totalFuelResponse struct {
	TotalFuel float64 `json:"total_fuel"`
}

type efficiencyResponse struct {
	Efficiency float64 `json:"efficiency"`
}

type errorResponse struct {
	Error string `json:"error"`
}

type dateRangeParams struct {
	start int
	end   int
}

func encode(w http.ResponseWriter, status int, resp interface{}) {
	w.Header().Set("Content-Type", "application/json, charset=utf-8")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(resp)
}

func encodeNotFound(w http.ResponseWriter) {
	encode(w, http.StatusNotFound, errorResponse{"Path not found!"})
}

func encodeBadRequest(w http.ResponseWriter, message string) {
	encode(w, http.StatusBadRequest, errorResponse{message})
}

func validateDateRangeQueryParams(r *http.Request) (*dateRangeParams, error) {
	query := r.URL.Query()

	start, ok := query["start"]
	if !ok {
		return nil, errors.New("start query param is missing")
	}

	s, err := strconv.ParseInt(start[0], 10, 32)
	if err != nil {
		return nil, errors.New("start query param has a bad value")
	}

	end, ok := query["end"]
	if !ok {
		return nil, errors.New("end query param is missing")
	}

	e, err := strconv.ParseInt(end[0], 10, 32)
	if err != nil {
		return nil, errors.New("end query param has a bad value")
	}

	if e < s {
		return nil, errors.New("end cannot be less than start")
	}

	return &dateRangeParams{
		start: int(s),
		end:   int(e),
	}, nil
}

func (s *Server) handleTotalDistance(w http.ResponseWriter, r *http.Request) {
	s.log.Printf("%s: %s", r.Method, r.URL)
	if r.Method == http.MethodGet {
		params, err := validateDateRangeQueryParams(r)
		if err != nil {
			encodeBadRequest(w, fmt.Sprintf("PARAM_ERR: %s", err))
			return
		}

		d := s.shipService.TotalDistance(params.start, params.end)
		encode(w, http.StatusOK, totalDistanceResponse{d})
	} else {
		encodeNotFound(w)
	}
}

func (s *Server) handleTotalFuel(w http.ResponseWriter, r *http.Request) {
	s.log.Printf("%s: %s", r.Method, r.URL)
	if r.Method == http.MethodGet {
		params, err := validateDateRangeQueryParams(r)
		if err != nil {
			encodeBadRequest(w, fmt.Sprintf("PARAM_ERR: %s", err))
			return
		}

		f := s.shipService.TotalFuel(params.start, params.end)
		encode(w, http.StatusOK, totalFuelResponse{f})
	} else {
		encodeNotFound(w)
	}
}

func (s *Server) handleEfficiency(w http.ResponseWriter, r *http.Request) {
	s.log.Printf("%s: %s", r.Method, r.URL)
	if r.Method == http.MethodGet {
		params, err := validateDateRangeQueryParams(r)
		if err != nil {
			encodeBadRequest(w, fmt.Sprintf("PARAM_ERR: %s", err))
			return
		}

		e := s.shipService.Efficiency(params.start, params.end)
		encode(w, http.StatusOK, efficiencyResponse{e})
	} else {
		encodeNotFound(w)
	}
}

func (s *Server) catchAll(w http.ResponseWriter, r *http.Request) {
	s.log.Printf("%s: %s", r.Method, r.URL)
	encodeNotFound(w)
}
