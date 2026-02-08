package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"Server/database"
	"Server/routers"

	"github.com/gorilla/handlers"
	"github.com/joho/godotenv"
)

func main() {
	// Load env
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// DB init
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_SSLMODE"),
	)
	database.Init(connStr)

	// Router
	r := routers.GetRoutes()

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{
			"http://localhost:5173", // React
		}),
		handlers.AllowedMethods([]string{
			"GET", "POST", "PUT", "DELETE", "OPTIONS",
		}),
		handlers.AllowedHeaders([]string{
			"Content-Type",
			"Authorization",
		}),
	)

	fmt.Println("Server is running on http://localhost:8080")

	if err := http.ListenAndServe(":8080", corsHandler(r)); err != nil {
		log.Fatal("Server failed:", err)
	}

	if err := database.DB.Close(); err != nil {
		fmt.Println("Failed to close database:", err)
	}
}
