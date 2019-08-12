package business

/**
 * Design Decision
 * The purpose of the package business is to consolidate the business logic
 */

// ShipData represents the data of a ship at snapshot of time
type ShipData struct {
	// Timestamp is unix epoch time (seconds since 00:00:00 January 1 1970)
	Timestamp int

	// Speed is speed of ship in ​miles per hour​.
	Speed float64

	// Fuel is consumption rate in ​gallons per minute​
	Fuel float64
}

// DistanceTravelled calculates the distance between two ShipData points
/**
 * Calculations
 * Distance is calculated as: Distance = Velocity x Time
 * In our case velocity is a.Speed mi/hr and time is b.Timestamp - a.Timestamp
 * converted to hours
 *
 * Return
 * miles travelled
 */
func (a ShipData) DistanceTravelled(b ShipData) float64 {
	// Conversion of seconds to hours: 1hr = 60mins = (60 * 60)3600s
	time := float64(b.Timestamp-a.Timestamp) / 3600
	return a.Speed * time
}

// FuelConsumed calculates the fuel used between two ShipData points
/**
 * Calculations
 * Fuel consumption is calculated as: Consumption = Rate x Time
 * In our case rate is a.Fuel gal/min and time is b.Timestamp - a.Timestamp
 * converted to minutes
 *
 * Return
 * gallons consumed
 */
func (a ShipData) FuelConsumed(b ShipData) float64 {
	// Conversion of seconds to minutes: 1hr = 60mins
	time := float64(b.Timestamp-a.Timestamp) / 60
	return a.Fuel * time
}

// Efficiency calculates the "miles per gallon" between two ShipData points
/**
 * Calculations
 * Efficiency is calculated by taking the distance travelled and dividing
 * it by the number of gallons used to travel such distance
 * In our case distance travelled can be calculated by DistanceTravelled
 * and divided by FuelConsumed
 *
 * Returns
 * miles per gallon
 */
func (a ShipData) Efficiency(b ShipData) float64 {
	miles := a.DistanceTravelled(b)
	gallons := a.FuelConsumed(b)

	// This feels very hacky but I am on the assumption that fuel rate can be
	// 0 since the ship can be cruising. If that is not the case then this can
	// be removed and the fix would go into csv.go during time of backfilling data
	if !(gallons > 0) {
		gallons = 1
	}

	return miles / gallons
}
