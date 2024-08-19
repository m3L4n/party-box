// backend/handlers/questions.go

package handlers

import (
	"backend/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

var db *gorm.DB

func SetDatabase(database *gorm.DB) {
	db = database
}

func GetQuestions(c *fiber.Ctx) error {
	var questions []models.Question
	if err := db.Find(&questions).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to retrieve questions",
		})
	}
	return c.JSON(questions)
}

func GetQuestion(c *fiber.Ctx) error {
	id := c.Params("id")
	var question models.Question
	if err := db.First(&question, "id = ?", id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "Question not found",
		})
	}
	return c.JSON(question)
}
