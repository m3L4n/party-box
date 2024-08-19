// backend/seeder.go

package seeds

import (
	"backend/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func SeedDatabase() {
	dsn := "host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable TimeZone=Etc/UTC"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database")
	}

	db.AutoMigrate(&models.Question{})

	db.Exec("DELETE FROM questions")

	questions := []models.Question{
		{ID: 1, Content: "What is the chemical symbol for water?", CorrectAnswer: "H2O"},
		{ID: 2, Content: "Who developed the theory of relativity?", CorrectAnswer: "Albert Einstein"},
		{ID: 3, Content: "Who was the first President of the United States?", CorrectAnswer: "George Washington"},
		{ID: 4, Content: "What is the capital of France?", CorrectAnswer: "Paris"},
		{ID: 5, Content: "What is the capital of France?", CorrectAnswer: "Paris"},
	}

	for _, question := range questions {
		db.Create(&question)
	}

	log.Println("Database seeded successfully")
}
