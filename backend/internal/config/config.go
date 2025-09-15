package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	Server   ServerConfig
	Database DatabaseConfig
	Auth     AuthConfig
	CORS     CORSConfig
}

type ServerConfig struct {
	Port int
	Host string
}

type DatabaseConfig struct {
	DSN string
}

type AuthConfig struct {
	JWTSecret       string
	TokenCookieName string
}

type CORSConfig struct {
	AllowedOrigins string
}

func New() *AppConfig {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found. Relying on OS environment variables.")
	}

	return &AppConfig{
		Server: ServerConfig{
			Port: getEnvAsInt("PORT", 9000),
			Host: getEnv("HOST", "0.0.0.0"),
		},
		Database: DatabaseConfig{
			DSN: getEnv("DATABASE_DSN", "database.sqlite"),
		},
		Auth: AuthConfig{
			JWTSecret:       getEnv("JWT_SECRET", "an very long crazy secret init"),
			TokenCookieName: "access_token",
		},
		CORS: CORSConfig{
			AllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "*"),
		},
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	valueStr := getEnv(key, "")
	if value, err := strconv.Atoi(valueStr); err == nil {
		return value
	}
	return defaultValue
}
