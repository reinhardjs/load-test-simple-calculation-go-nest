package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"
)

func main() {
	http.HandleFunc("/", helloHandler1)

	fmt.Println("Server is listening on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func helloHandler1(w http.ResponseWriter, r *http.Request) {
	var count int = 0
	for i := 1; i <= 5000; i++ {
		for j := 1; j <= 5000; j++ {
			count += i + j
		}
	}
	fmt.Fprintf(w, strconv.Itoa(count))
}

func helloHandler2(w http.ResponseWriter, r *http.Request) {
	var wg sync.WaitGroup
	var count int

	numGoroutines := 10
	chunkSize := 5000 / numGoroutines

	wg.Add(numGoroutines)
	for i := 0; i < numGoroutines; i++ {
		go func() {
			defer wg.Done()
			localCount := 0
			for j := 1; j <= chunkSize; j++ {
				for k := 1; k <= chunkSize; k++ {
					localCount += j + k
				}
			}
			count += localCount
		}()
	}

	wg.Wait()

	fmt.Fprintf(w, strconv.Itoa(count))
}
