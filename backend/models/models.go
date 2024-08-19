// backend/models/models.go

package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// type Category struct {
// 	ID   uint   `gorm:"primaryKey"`
// 	Name string `gorm:"type:text"`
// }

type Question struct {
	ID       uint   `gorm:"primaryKey"`
	Mode     string `gorm:"type:text"`
	Language string `gorm:"type:text"`
	Content  string `gorm:"type:text"`
	Answer   string `gorm:"type:text"`
}

// type Player struct {
// 	ID    uint   `gorm:"primaryKey"`
// 	Name  string `gorm:"type:text"`
// 	Color string `gorm:"type:text"`
// }

// type Opinion struct {
// 	ID         uint `gorm:"primaryKey"`
// 	QuestionID uint
// 	Question   Question `gorm:"foreignKey:QuestionID"`
// 	PlayerID   uint
// 	Player     Player `gorm:"foreignKey:PlayerID"`
// 	Opinion    string `gorm:"type:text"`
// }

func main() {
	dsn := "host=localhost user=youruser password=yourpassword dbname=yourdb port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrations
	db.AutoMigrate(&Question{})
	// db.AutoMigrate(&Category{}, &Question{}, &Player{}, &Opinion{})
}
