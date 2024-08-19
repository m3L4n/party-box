package main

import (
	"backend/handlers"
	"backend/models"
	"backend/seeds"
	"log"

	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	app := fiber.New()

	dsn := "host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable TimeZone=Etc/UTC"
	var err error
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database")
	}

	db.AutoMigrate(&models.Question{})

	seeds.SeedDatabase()

	handlers.SetDatabase(db)

	app.Get("/questions", handlers.GetQuestions)
	app.Get("/questions/:id", handlers.GetQuestion)

	app.Listen(":3000")
}
