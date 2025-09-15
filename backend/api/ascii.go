package api

/*
* author: @toni
* date: 2025-09-15
* description: ASCII meme backend entrypoint
 */

import (
	"encoding/json"
	"net/http"

	"github.com/oduortoni/ascii-mint/backend/internal/ascii"

)

func Preview(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ascii.MemeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Default to classic frame
	if _, ok := ascii.Frames[req.Frame]; !ok {
		req.Frame = "classic"
	}

	preview := ascii.GenerateMeme(req.Content, req.Frame)

	resp := ascii.MemeResponse{Preview: preview}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
