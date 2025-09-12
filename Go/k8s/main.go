package main

import (
	"fmt"
	"math/rand"
	"time"
)

type Input struct {
	JobID int
}

type Result struct {
	JobID int
	Code  int
}

var codeToStatus = map[int]string{
	0: "SUCCESS",
	1: "FAILED",
	2: "UNKNOWN",
}

// If you truly want only 0..1, change Intn(3) -> Intn(2).
func createResult() int {
	return rand.Intn(3) // 0,1,2
}

func doSomething(in Input) Result {
	fmt.Printf("start %d\n", in.JobID)
	time.Sleep(500 * time.Millisecond) // simulate work
	code := createResult()
	fmt.Printf("done  %d -> %s\n", in.JobID, codeToStatus[code])
	return Result{JobID: in.JobID, Code: code}
}

func worker(jobs <-chan Input, results chan<- Result) {
	for in := range jobs {
		results <- doSomething(in)
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())

	const (
		totalJobs = 10
		workers   = 3 // limit concurrency to 3 at a time
	)

	jobs := make(chan Input)
	results := make(chan Result, totalJobs) // buffer so workers never block on last sends

	// start workers
	for w := 0; w < workers; w++ {
		go worker(jobs, results)
	}

	// feed jobs
	go func() {
		for i := 1; i <= totalJobs; i++ {
			jobs <- Input{JobID: i}
		}
		close(jobs) // we're the only sender, so we close it
	}()

	// collect results (don’t close results: multiple producers)
	for i := 0; i < totalJobs; i++ {
		res := <-results
		fmt.Printf("collected result: job %d => %s (%d)\n",
			res.JobID, codeToStatus[res.Code], res.Code)
	}

	fmt.Println("all done")
}
