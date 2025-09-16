package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/oduortoni/ascii-mint/backend/internal/ascii"
	"github.com/oduortoni/ascii-mint/backend/internal/auth"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func ListUserMemes(collection *mongo.Collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Only GET allowed", http.StatusMethodNotAllowed)
			return
		}

		user, ok := auth.GetUserFromContext(r.Context())
		if !ok {
			http.Error(w, "User not found", http.StatusUnauthorized)
			return
		}

		cursor, err := collection.Find(r.Context(), bson.M{"owner": user.Email})
		if err != nil {
			http.Error(w, "Failed to fetch memes", http.StatusInternalServerError)
			return
		}
		defer cursor.Close(r.Context())

		var memes []ascii.Meme
		if err = cursor.All(r.Context(), &memes); err != nil {
			http.Error(w, "Failed to decode memes", http.StatusInternalServerError)
			return
		}

		for _, meme := range memes {
			fmt.Println(meme)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"memes": memes,
			"count": len(memes),
		})
	}
}
