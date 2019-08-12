package main

import (
	"fmt"
	"nl/util"
	"strconv"
)

// ShipData represents the data of a ship at snapshot of time
type ShipData struct {
	// Timestamp is unix epoch time (seconds since 00:00:00 January 1 1970)
	Timestamp int

	// Speed is speed of ship in ​miles per hour​.
	Speed float64

	// Fuel is consumption rate in ​gallons per minute​
	Fuel float64
}

func main() {
	sd := []ShipData{}
	err := util.ParseCSV("ship.csv", func(line []string, idx int) error {
		if idx != 0 {

			ts, err := strconv.ParseInt(line[0], 10, 32)
			if err != nil {
				return err
			}

			s, err := strconv.ParseFloat(line[1], 32)
			if err != nil {
				s = -1
			}

			f, err := strconv.ParseFloat(line[2], 32)
			if err != nil {
				f = -1
			}

			sd = append(sd, ShipData{
				Timestamp: int(ts),
				Speed:     s,
				Fuel:      f,
			})

			fmt.Println(idx, sd[len(sd)-1])
		}

		return nil
	})

	if err != nil {
		fmt.Println("Error processing csv", err)
	}
}
