package csv

import "nl/business"

// ShipRepository holds a list of ship data
type ShipRepository struct {
	data []business.ShipData
}

// TotalDistance calculates the total distance traveled for a csv repository
func (r *ShipRepository) TotalDistance(start int, end int) float64 {
	totalDistance := 0.0

	startIdx, endIdx := r.findIndexRangeByTimestamp(start, end)
	if startIdx == -1 {
		return totalDistance
	}

	for i := startIdx + 1; i <= endIdx; i++ {
		totalDistance += r.data[i-1].DistanceTravelled(r.data[i])
	}

	return totalDistance
}

// TotalFuel calculates the total fuel used for a csv repository
func (r *ShipRepository) TotalFuel(start int, end int) float64 {
	totalFuel := 0.0

	startIdx, endIdx := r.findIndexRangeByTimestamp(start, end)
	if startIdx == -1 {
		return totalFuel
	}

	for i := startIdx + 1; i <= endIdx; i++ {
		totalFuel += r.data[i-1].FuelConsumed(r.data[i])
	}
	return totalFuel
}

// Efficiency calculates the efficiency of the ship for a csv repository
func (r *ShipRepository) Efficiency(start int, end int) float64 {
	totalEfficiency := 0.0

	startIdx, endIdx := r.findIndexRangeByTimestamp(start, end)
	if startIdx == -1 {
		return totalEfficiency
	}

	for i := startIdx + 1; i <= endIdx; i++ {
		totalEfficiency += r.data[i-1].Efficiency(r.data[i])
	}

	return totalEfficiency / float64(endIdx-startIdx)
}

/**
 * Design Decision
 * The data is kept in sorted order by timestamp so that a binary search can be run
 * on the data. findIndexRangeByTimestamp will find the starting index and ending
 * index within the timestamp range.
 *
 * Q: What happens if start is after last timestamp? Is it an error?
 *
 * TODO
 * The binary search for start and end look very similar. Possibly refactor?
 *
 * Returns
 * starting_index int
 * ending_index int
 * -1, -1 is returned if there is no data
 */
func (r *ShipRepository) findIndexRangeByTimestamp(start int, end int) (int, int) {
	if len(r.data) < 1 {
		return -1, -1
	}

	s, e := r.binarySearchStartIndex(start), r.binarySearchEndIndex(end)
	if s == -1 || e == -1 {
		return -1, -1
	}

	return s, e
}

func (r *ShipRepository) binarySearchStartIndex(target int) int {
	if target <= r.data[0].Timestamp {
		return 0
	}
	left, right := 0, len(r.data)-1
	for left <= right {
		m := (left + right) / 2
		if target <= r.data[m].Timestamp && m != 0 && target > r.data[m-1].Timestamp {
			return m
		}

		if target <= r.data[m].Timestamp {
			right = m - 1
		} else {
			left = m + 1
		}
	}

	return -1
}

func (r *ShipRepository) binarySearchEndIndex(target int) int {
	last := len(r.data) - 1
	if target >= r.data[last].Timestamp {
		return last
	}
	left, right := 0, last
	for left <= right {
		m := (left + right) / 2
		if target >= r.data[m].Timestamp && m != last && target < r.data[m+1].Timestamp {
			return m
		}

		if target > r.data[m].Timestamp {
			left = m + 1
		} else {
			right = m - 1
		}
	}

	return -1
}
