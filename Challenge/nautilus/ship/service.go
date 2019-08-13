package ship

// Repository denotes the interface the ship service interacts with
type Repository interface {
	TotalDistance(int, int) float64
	TotalFuel(int, int) float64
	Efficiency(int, int) float64
}

// Service holds the required repositories and information to compose ship data
type Service struct {
	repository Repository
}

// NewService creates a new ship service
func NewService(shipRepository Repository) (*Service, error) {
	return &Service{
		repository: shipRepository,
	}, nil
}

// TotalDistance calculates the total distance traveled
func (s *Service) TotalDistance(start int, end int) float64 {
	return s.repository.TotalDistance(start, end)
}

// TotalFuel calculates the total fuel used
func (s *Service) TotalFuel(start int, end int) float64 {
	return s.repository.TotalFuel(start, end)
}

// Efficiency calculates the efficiency of the ship
func (s *Service) Efficiency(start int, end int) float64 {
	return s.repository.Efficiency(start, end)
}
