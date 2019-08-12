package http

import (
	"fmt"
	"net"
	"net/http"
	"nl/ship"
)

// Logger standardization
type Logger interface {
	// Print will log arguments in the manner of fmt.Print.
	Print(v ...interface{})

	// Printf will log arguments are handled in the manner of fmt.Printf.
	Printf(format string, v ...interface{})
}

// Service contains the services required by the server
type Service struct {
	ShipService *ship.Service
}

// Config contains all the required configurations to be passed into server creation
type Config struct {
	Log  Logger
	Port int
}

// Server represents a http server
type Server struct {
	shipService *ship.Service
	listener    net.Listener
	log         Logger
	port        int
}

// ListenAndServe listens on the TCP network and serves handler to handle requests
func (s *Server) ListenAndServe() error {
	ln, err := net.Listen("tcp", fmt.Sprintf(":%d", s.port))
	if err != nil {
		return err
	}

	s.listener = ln

	s.log.Printf("Starting server on port %d...\n", s.port)
	return http.Serve(s.listener, s.CreateMux())
}

// Close stops the listener if it's open
func (s *Server) Close() {
	if s.listener != nil {
		s.listener.Close()
	}
}

// CreateMux sets up api routes and catch all
func (s *Server) CreateMux() *http.ServeMux {
	mux := http.NewServeMux()

	// Routes for handling data calculations
	mux.HandleFunc("/api/total_distance", s.handleTotalDistance)
	mux.HandleFunc("/api/total_fuel", s.handleTotalFuel)
	mux.HandleFunc("/api/efficiency", s.handleEfficiency)

	// Catch all route
	mux.HandleFunc("/", s.catchAll)

	return mux
}

// CreateServer creates a server ready for listening
func CreateServer(service Service, config Config) Server {
	return Server{
		shipService: service.ShipService,
		log:         config.Log,
		port:        config.Port,
	}
}
