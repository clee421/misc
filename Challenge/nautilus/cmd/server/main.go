package main

import (
	"database/sql"
	"flag"
	"log"
	"nl/csv"
	"nl/http"
	"nl/postgres"
	"nl/ship"
	"os"

	_ "github.com/lib/pq"
)

type repository struct {
	ship ship.Repository
}

func main() {
	// Define flags passed in from CLI
	var db = flag.String("db", "csv", "database type to use")
	flag.Parse()

	// Get repositories
	repository, conn := getRepositories(*db)
	if conn != nil {
		defer conn.Close()
	}

	// Create a shipping service what will interface with the handlers
	shipService, err := ship.NewService(repository.ship)
	if err != nil {
		log.Fatalf("Could not create ship service %v", err)
	}

	// Service struct is created to consolidate all the services required by the server
	service := http.Service{
		ShipService: shipService,
	}

	// Setting up logger
	logger := log.New(os.Stdout, "[NL-SERVER]: ", log.Ldate+log.Ltime+log.LUTC)

	// Create server configs
	config := http.Config{
		Log:  logger,
		Port: 8000,
	}

	// Create server
	server := http.CreateServer(service, config)

	// Listen and Serve
	err = server.ListenAndServe()
	if err != nil {
		log.Fatalf("Server could not start on port: %d\n", config.Port)
	}
}

func getRepositories(dbFlag string) (repository, *sql.DB) {
	if dbFlag == "postgres" {
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
			log.Fatalf("Error creating postgres connection: %v\n", err)
		}

		// Create a shipping repository that can be used by the ship service
		shipPsqlRepository, err := postgres.NewShipRepository(conn)
		if err != nil {
			log.Fatalf("Could not create ship repository %v", err)
		}

		return struct{ ship ship.Repository }{
			ship: shipPsqlRepository,
		}, conn
	}

	// Create a shipping repository that can be used by the ship service
	shipCsvRepository, err := csv.NewShipRepository("ship.csv")
	if err != nil {
		log.Fatalf("Could not create ship repository %v", err)
	}

	return struct{ ship ship.Repository }{
		ship: shipCsvRepository,
	}, nil
}
