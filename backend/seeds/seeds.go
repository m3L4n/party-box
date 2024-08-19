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
		{ID: 1, Mode: "A", Language: "fr", Content: "What is the chemical symbol for water?", Answer: "H2O"},
		{ID: 2, Mode: "B", Language: "fr", Content: "Who developed the theory of relativity?"},
		{ID: 3, Mode: "A", Language: "fr", Content: "Who was the first President of the United States?"},
		{ID: 4, Mode: "C", Language: "fr", Content: "What is the capital of France?"},
		{ID: 5, Mode: "B", Language: "en", Content: "What is the capital of France?"},
	}

	for _, question := range questions {
		db.Create(&question)
	}

	log.Println("Database seeded successfully")
}
