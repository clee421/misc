package main

import (
	"errors"
	"flag"
	"fmt"
	"log"
	"nl/csv"
	"nl/postgres"

	_ "github.com/lib/pq"
)

func main() {
	var psqlFlag = flag.Bool("postgres", false, "initialize postgres database")
	flag.Parse()

	if *psqlFlag {
		err := setupPostgresDatabase()
		if err == nil {
			fmt.Println("Successfully set up postgres database and seeded with data")
		} else {
			fmt.Println(err)
		}
	}
}

func setupPostgresDatabase() error {
	// Information taken directly from docker-compose.yaml
	config := postgres.Config{
		Host:     "localhost",
		Port:     5432,
		User:     "nl_ship_psql",
		Password: "password",
		DBname:   "ship_db",
	}
	conn, err := postgres.CreateConnection(config)
	if err != nil {
		log.Fatalf("Error setting up postgres database: %v\n", err)
	}
	defer conn.Close()

	rows := conn.QueryRow(`SELECT EXISTS (
		SELECT 1 FROM   INFORMATION_SCHEMA.TABLES 
		WHERE  table_name = 'ship_records'
		);
	`)
	if err != nil {
		log.Fatalf("Error querying postgres database: %v\n", err)
	}

	var exists bool
	err = rows.Scan(&exists)

	if !exists {
		_, err := conn.Exec(`CREATE TABLE IF NOT EXISTS ship_records (
			id SERIAL PRIMARY KEY,
			timestamp INT NOT NULL,
			speed NUMERIC(16, 8) NOT NULL,
			fuel NUMERIC(16, 8) NOT NULL,
			created_at timestamptz DEFAULT now(),
			updated_at timestamptz DEFAULT now()
		);`)
		if err != nil {
			log.Fatalf("Error querying postgres database: %v\n", err)
		}

		_, err = conn.Exec(`CREATE UNIQUE INDEX timestamp_idx ON ship_records USING btree (timestamp)`)
		if err != nil {
			log.Fatalf("Error creating index on timestamp: %v\n", err)
		}

		shipRecords, err := csv.ParseCsvToShipData("ship.csv")
		if err != nil {
			log.Fatalf("Error getting ship data: %v\n", err)
		}

		for _, sr := range shipRecords {
			_, err = conn.Exec(
				`INSERT INTO ship_records (timestamp, speed, fuel)
				VALUES ($1, $2, $3)`,
				sr.Timestamp,
				sr.Speed,
				sr.Fuel,
			)
			if err != nil {
				log.Fatalf("Error getting ship data %v: %v\n", sr, err)
			}
		}

		return nil
	}

	return errors.New("Postgres database set up not required")
}
