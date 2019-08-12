package postgres

import (
	"database/sql"
	"fmt"
)

// Config are the required info to create a postgres session
type Config struct {
	Host     string
	Port     int
	User     string
	Password string
	DBname   string
}

// NewShipRepository creates a ship repository for data fetching
func NewShipRepository(db *sql.DB) (*ShipRepository, error) {
	return &ShipRepository{db}, nil
}

// CreateConnection returns a postgres database session
func CreateConnection(config Config) (*sql.DB, error) {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		config.Host,
		config.Port,
		config.User,
		config.Password,
		config.DBname,
	)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
