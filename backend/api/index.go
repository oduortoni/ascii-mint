package api

import (
	"fmt"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request) {
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
}