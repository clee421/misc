package postgres

import (
	"database/sql"
	"fmt"
	"nl/business"
)

// ShipRepository encapsulates a postgres session
type ShipRepository struct {
	psql *sql.DB
}

// TotalDistance calculates the total distance traveled
func (r *ShipRepository) TotalDistance(start int, end int) float64 {
	totalDistance := 0.0
	rows, err := r.psql.Query(
		`SELECT timestamp, speed, fuel FROM ship_records
		WHERE timestamp >= $1 AND timestamp <= $2
		ORDER BY timestamp ASC`,
		start,
		end,
	)
	if err != nil {
		// TODO: better handling of repository error
		fmt.Println(err)
		return totalDistance
	}

	defer rows.Close()

	var prev, curr *business.ShipData
	for rows.Next() {
		curr = &business.ShipData{}
		err = rows.Scan(&curr.Timestamp, &curr.Speed, &curr.Fuel)
		if err != nil {
			// TODO: Refactor Repository interface to handle error return type also
			fmt.Println(err)
			return 0.0
		}

		if prev != nil && curr != nil {
			totalDistance += prev.DistanceTravelled(*curr)
		}

		prev = curr
		curr = nil
	}

	return totalDistance
}

// TotalFuel calculates the total fuel used
func (r *ShipRepository) TotalFuel(start int, end int) float64 {
	totalFuel := 0.0
	rows, err := r.psql.Query(
		`SELECT timestamp, speed, fuel FROM ship_records
		WHERE timestamp >= $1 AND timestamp <= $2
		ORDER BY timestamp ASC`,
		start,
		end,
	)
	if err != nil {
		// TODO: better handling of repository error
		fmt.Println(err)
		return totalFuel
	}

	defer rows.Close()

	var prev, curr *business.ShipData
	for rows.Next() {
		curr = &business.ShipData{}
		err = rows.Scan(&curr.Timestamp, &curr.Speed, &curr.Fuel)
		if err != nil {
			// TODO: Refactor Repository interface to handle error return type also
			fmt.Println(err)
			return 0.0
		}

		if prev != nil && curr != nil {
			totalFuel += prev.FuelConsumed(*curr)
		}

		prev = curr
		curr = nil
	}

	return totalFuel
}

// Efficiency calculates the efficiency of the ship
func (r *ShipRepository) Efficiency(start int, end int) float64 {
	averageEfficiency := 0.0
	rows, err := r.psql.Query(
		`SELECT timestamp, speed, fuel FROM ship_records
		WHERE timestamp >= $1 AND timestamp <= $2
		ORDER BY timestamp ASC`,
		start,
		end,
	)
	if err != nil {
		// TODO: better handling of repository error
		fmt.Println(err)
		return averageEfficiency
	}

	defer rows.Close()

	count := 0.0
	var prev, curr *business.ShipData
	for rows.Next() {
		curr = &business.ShipData{}
		err = rows.Scan(&curr.Timestamp, &curr.Speed, &curr.Fuel)
		if err != nil {
			// TODO: Refactor Repository interface to handle error return type also
			fmt.Println(err)
			return 0.0
		}

		if prev != nil && curr != nil {
			averageEfficiency += prev.Efficiency(*curr)
		}

		prev = curr
		curr = nil
		count++
	}

	return averageEfficiency / count
}
