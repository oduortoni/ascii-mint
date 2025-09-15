package main

import (
	"fmt"
	"net/http"

	"github.com/oduortoni/ascii-mint/backend/internal/config"
	"github.com/oduortoni/ascii-mint/backend/internal/middleware"
	"github.com/oduortoni/ascii-mint/backend/api"
)

func main() {
	cfg := config.New()
	PORT := fmt.Sprintf(":%d", cfg.Server.Port)
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
	http.HandleFunc("/api/meme/preview", middleware.CORS(cfg)(api.Preview))

	http.ListenAndServe(PORT, nil)
}
