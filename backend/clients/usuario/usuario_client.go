package usuario

import (
	"ucc-gorm/model"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func InsertarUsuario(usuario model.Usuario) model.Usuario {
	result := Db.Create(&usuario)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Usuario Created: ", usuario.Id)
	return usuario
}

func GetUsuarioById(id int) model.Usuario {
	var usuario model.Usuario

	Db.Where("id = ?", id).First(&usuario)
	log.Debug("Usuario: ", usuario)

	return usuario
}
