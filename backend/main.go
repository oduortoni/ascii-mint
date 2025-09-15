package main

import (
	"fmt"
	"net/http"

	"github.com/oduortoni/ascii-mint/backend/internal/shared"
)

func main() {
	port := shared.Port(9000)
	PORT := fmt.Sprintf(":%d", port)
	fmt.Println("Server running on port: ", PORT)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		page := `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>ASCII Mint</title>
			</head>
			<body>
				<h1>ASCII Mint</h1>
			</body>
			</html>
		`
		fmt.Fprintf(w, "%s", page)
	})

	http.ListenAndServe(PORT, nil)
}
