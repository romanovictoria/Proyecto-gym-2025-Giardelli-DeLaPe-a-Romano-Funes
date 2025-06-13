package actividad

import (
	"Proyecto-gym/model"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func GetActividades() model.Actividades {
	var actividades model.Actividades
	Db.Order("id").Find(&actividades)

	log.Debug("Actividades: ", actividades)

	return actividades
}

func GetActividadById(id int) model.Actividad {
	var actividad model.Actividad

	Db.Where("id = ?", id).Preload("Categoria").First(&actividad)
	log.Debug("Act: ", actividad)

	return actividad
}

func DeleteActividadById(actividad model.Actividad) {

	Db.Delete(&actividad)

	log.Debug("Actividad Borrada: ", actividad)

}

func SaveActividad(actividad model.Actividad) model.Actividad {
	result := Db.Save(&actividad)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Actividad Saved: ", actividad.Id)
	return actividad
}

func InsertActividad(actividad model.Actividad) model.Actividad {
	result := Db.Create(&actividad)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Actividad Created: ", actividad.Id)
	return actividad
}
