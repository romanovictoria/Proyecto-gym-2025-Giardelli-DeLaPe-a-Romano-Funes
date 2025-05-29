package inscripcion

import (
	"Proyecto-gym/model"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func RegistrarInscripcion(inscripcion model.Inscripcion) model.Inscripcion {
	result := Db.Create(&inscripcion)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Inscripcion Registrada: ", inscripcion.Id)
	return inscripcion
}

func GetInscripcionById(id int) model.Inscripcion {
	var inscripcion model.Inscripcion

	Db.Where("id = ?", id).Preload("Usuario").Preload("Actividad").First(&inscripcion)
	log.Debug("Act: ", inscripcion)

	return inscripcion
}
