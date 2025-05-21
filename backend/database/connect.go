package database

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/romanovictoria/Proyecto-gym-2025-Giardelli-DeLaPe-a-Romano-Funes/models"
)

var DB *gorm.DB

func Connect() {
	dsn := "root:45080746j@tcp(localhost:3306)/gimnasio2025?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error al conectar a la base de datos:", err)
	}

	err = db.AutoMigrate(&models.Usuario{}, &models.Actividad{}, &models.Inscripcion{}, &models.Categoria{})
	if err != nil {
		log.Fatal("Error al migrar tablas:", err)
	}

	DB = db
}
