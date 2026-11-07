package main

import (
	"log"
	"net/http"
	"time"
)

func contactHandle(w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")
	time.Sleep(time.Second * 10)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(name))
}

func main() {
	fs := http.FileServer(http.Dir("./static"))

	mux := http.NewServeMux()
	mux.Handle("/", fs)
	mux.HandleFunc("POST /api/contact", contactHandle)

	srv := &http.Server{
		Addr: ":8080",
		Handler: mux,
	}

	log.Printf("Starting HTTPS file server at https://localhost:8080 (serving ./static)")
	log.Printf("listening on %s", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
