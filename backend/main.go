package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/oduortoni/ascii-mint/backend/api"
	"github.com/oduortoni/ascii-mint/backend/internal/auth"
	"github.com/oduortoni/ascii-mint/backend/internal/config"
	"github.com/oduortoni/ascii-mint/backend/internal/middleware"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	cfg := config.New()
	port := fmt.Sprintf(":%d", cfg.Server.Port)
	fmt.Println("Server running on port: ", port)

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(cfg.Database.DSN))
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}
	defer client.Disconnect(context.TODO())

	userCollection := client.Database("asciimint").Collection("users")
	memeCollection := client.Database("asciimint").Collection("memes")
	authService := auth.NewService(userCollection, cfg.Auth.JWTSecret)
	authHandler := api.NewAuthHandler(authService)

	http.HandleFunc("/", api.Index)

	http.HandleFunc("/api/auth/register", middleware.CORS(cfg)(authHandler.Register))
	http.HandleFunc("/api/auth/login", middleware.CORS(cfg)(authHandler.Login))
	http.HandleFunc("/api/meme/preview", middleware.CORS(cfg)(api.Preview))

	http.HandleFunc("/api/meme/save", middleware.CORS(cfg)(authService.AuthMiddleware(api.SaveMeme(memeCollection))))
	http.HandleFunc("/api/meme/list", middleware.CORS(cfg)(authService.AuthMiddleware(api.ListUserMemes(memeCollection))))

	http.ListenAndServe(port, nil)
}
