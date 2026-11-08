package main

import (
	"fmt"
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

type notFoundInterceptorWriter struct {
	rw              http.ResponseWriter // set to nil to signal a 404 has been intercepted
	h               http.Header         // set to nil to signal headers have been emitted
	notFoundHandler http.Handler
	r               *http.Request
}

func (rw *notFoundInterceptorWriter) Header() http.Header {
	if rw.h == nil && rw.rw != nil {
		return rw.rw.Header()
	}
	return rw.h
}

func (rw *notFoundInterceptorWriter) WriteHeader(status int) {
	if status == http.StatusNotFound {
		rw.notFoundHandler.ServeHTTP(rw.rw, rw.r)
		rw.rw = nil
	} else {
		for k, vs := range rw.h {
			for _, v := range vs {
				rw.rw.Header().Add(k, v)
			}
		}
		rw.rw.WriteHeader(status)
	}
	rw.h = nil
}

func (rw *notFoundInterceptorWriter) Write(b []byte) (int, error) {
	if rw.rw != nil {
		return rw.rw.Write(b)
	}
	return len(b), nil
}

func StaticSiteHandler(h, notFoundHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Handling Request: %s %s\n", r.Method, r.URL)
		w = &notFoundInterceptorWriter{
			rw:              w,
			h:               make(http.Header),
			notFoundHandler: notFoundHandler,
			r:               r,
		}
		h.ServeHTTP(w, r)
	})
}

func notFoundHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Handling 404 for %s %s: ", r.Method, r.URL)
	if r.URL.Path == "/not-found" {
		fmt.Print("non-HTMX request\n")
		http.ServeFile(w, r, "./static/404.html")
		return
	}

	if r.Header.Get("HX-Request") == "" {
		fmt.Print("non-HTMX request\n")
		http.Redirect(w, r, "/not-found", http.StatusFound)
		return
	}

	fmt.Print("HTMX request\n")
	w.Header().Add("HX-Replace-Url", "/not-found")
	http.ServeFile(w, r, "./static/404.html")
}

func main() {
	fs := http.FileServer(http.Dir("./static"))

	mux := http.NewServeMux()
	mux.Handle("/", StaticSiteHandler(fs, http.HandlerFunc(notFoundHandler)))
	mux.HandleFunc("POST /api/contact", contactHandle)

	srv := &http.Server{
		Addr: ":8080",
		Handler: mux,
	}

	log.Printf("Starting HTTPS file server at https://localhost:8080 (serving ./static)")
	log.Printf("listening on %s", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
