package csv

import (
	"fmt"
	"nl/business"
	"nl/util"
	"sort"
	"strconv"
)

// NewShipRepository creates a ship repository for data fetching
func NewShipRepository(filename string) (*ShipRepository, error) {
	sd, err := ParseCsvToShipData(filename)
	if err != nil {
		return nil, err
	}

	return &ShipRepository{data: sd}, nil
}

// ParseCsvToShipData creates an array of ship data applying business logic
func ParseCsvToShipData(filename string) ([]business.ShipData, error) {
	sd := []business.ShipData{}
	sorted := true
	speedBadRead, fuelBadRead := false, false
	err := util.ParseCSV(filename, func(line []string, idx int) error {
		if idx != 0 {

			// Parse timestamp
			ts, err := strconv.ParseInt(line[0], 10, 32)
			if err != nil {
				return err
			}

			// Parse speed
			s, err := strconv.ParseFloat(line[1], 32)
			if err != nil {
				s = -1
				speedBadRead = true
			}

			// Parse fuel
			f, err := strconv.ParseFloat(line[2], 32)
			if err != nil {
				f = -1
				fuelBadRead = true
			}

			sd = append(sd, business.ShipData{
				Timestamp: int(ts),
				Speed:     s,
				Fuel:      f,
			})

			// If we finally have a valid value we can begin backfilling
			if speedBadRead && s != -1 {
				backfillSpeed(sd)
				speedBadRead = false
			}

			if fuelBadRead && f != -1 {
				backfillFuel(sd)
				fuelBadRead = false
			}

			// The timestamps have to be in sorted order in order for the binary search
			// to be run
			if len(sd) > 1 {
				last := len(sd) - 1
				if sd[last].Timestamp < sd[last-1].Timestamp {
					sorted = false
				}
			}
		}

		/**
		 * Design Decision
		 * In order for the binary search to work the generated data has to be sorted. I don't believe
		 * that sorting will be required since the data should be in chronological order but a bit of
		 * defence here isn't harmful
		 */
		if !sorted {
			fmt.Println("Sorting has happened")
			sort.Slice(sd, func(i int, j int) bool {
				return sd[i].Timestamp < sd[j].Timestamp
			})
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	/**
	 * Design Decision
	 * The code here is a bit careless as it assumes that you won't be indexing into an array
	 * smaller than size 2. Technically the backfill will be called if we start appending
	 * again with new values but there's not enough information.
	 *
	 * Considerations
	 * Can fuel consumption be zero? I can imagine that it is possible so it has been left in
	 * Can speed be zero? It doesn't look to be possible unless the ship is at dock
	 */
	if sd[len(sd)-1].Speed == -1 {
		sd[len(sd)-1].Speed = sd[len(sd)-2].Speed
	}

	if sd[len(sd)-1].Fuel == -1 {
		sd[len(sd)-1].Fuel = sd[len(sd)-2].Fuel
	}

	return sd, nil
}

/**
 * Design Decision
 * backfillSpeed & backfillFuel are both very similar code used for backfilling values
 * It's been left here as WET code because it should be an easy refactor and private
 * functions are not tested
 */

func backfillSpeed(sd []business.ShipData) {
	lastValue := sd[len(sd)-1].Speed
	indexOfFirstBackfill := len(sd) - 2

	// Find starting index where backfill is required
	for indexOfFirstBackfill > 0 {
		if sd[indexOfFirstBackfill].Speed != -1 {
			break
		}
		indexOfFirstBackfill--
	}

	// If we've made it to the first index and it is still not valid then it will take the last valid value
	if indexOfFirstBackfill == 0 && sd[indexOfFirstBackfill].Speed == -1 {
		sd[indexOfFirstBackfill].Speed = lastValue
	}

	// Assign the first valid value and increment
	currentValue := sd[indexOfFirstBackfill].Speed
	indexOfFirstBackfill++

	// We don't go past the last value because it's known to be good
	for i := indexOfFirstBackfill; i < len(sd)-1; i++ {
		sd[i].Speed = (currentValue + lastValue) / 2
		currentValue = sd[i].Speed
	}
}

func backfillFuel(sd []business.ShipData) {
	lastValue := sd[len(sd)-1].Fuel
	indexOfFirstBackfill := len(sd) - 2

	for indexOfFirstBackfill > 0 {
		if sd[indexOfFirstBackfill].Fuel != -1 {
			break
		}
		indexOfFirstBackfill--
	}

	if indexOfFirstBackfill == 0 && sd[indexOfFirstBackfill].Fuel == -1 {
		sd[indexOfFirstBackfill].Fuel = lastValue
	}

	currentValue := sd[indexOfFirstBackfill].Fuel
	indexOfFirstBackfill++

	for i := indexOfFirstBackfill; i < len(sd)-1; i++ {
		sd[i].Fuel = (currentValue + lastValue) / 2
		currentValue = sd[i].Fuel
	}
}
