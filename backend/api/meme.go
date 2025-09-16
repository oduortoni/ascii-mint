package api

import (
	"encoding/json"
	"net/http"

	"github.com/oduortoni/ascii-mint/backend/internal/ascii"
	"github.com/oduortoni/ascii-mint/backend/internal/auth"
	"go.mongodb.org/mongo-driver/mongo"
)

func SaveMeme(collection *mongo.Collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		user, ok := auth.GetUserFromContext(r.Context())
		if !ok {
			http.Error(w, "User not found", http.StatusUnauthorized)
			return
		}

		var req struct {
			Content string `json:"content"`
			Frame   string `json:"frame"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}

		rendered := ascii.GenerateMeme(req.Content, req.Frame)
		hash := ascii.ComputeSHA256(rendered)

		meme := ascii.Meme{
			Owner:    user.Email,
			Content:  req.Content,
			Frame:    req.Frame,
			Rendered: rendered,
			Sha256:   hash,
		}

		result, err := ascii.SaveMeme(r.Context(), collection, meme)
		if err != nil {
			http.Error(w, "Failed to save meme", http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"id":       result.InsertedID,
			"rendered": rendered,
			"hash":     hash,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}