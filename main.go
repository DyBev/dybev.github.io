package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./static"))

	mux := http.NewServeMux()
	mux.Handle("/", fs)

	srv := &http.Server{
		Addr: ":8080",
		Handler: mux,
	}

	log.Printf("Starting HTTPS file server at https://localhost:8080 (serving ./static)")
	log.Printf("listening on %s", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
