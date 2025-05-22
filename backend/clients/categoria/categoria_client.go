package categoria

import (
	"ucc-gorm/model"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

func GetCategoriaById(id int) model.Categoria {
	var categoria model.Categoria

	Db.Where("id = ?", id).First(&categoria)
	log.Debug("Barrio: ", categoria)

	return categoria
}

func InsertarCategoria(categoria model.Categoria) model.Categoria {
	result := Db.Create(&categoria)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("Barrio Registrado: ", categoria)
	return categoria
}

func GetCategorias() model.Categorias {
	var categorias model.Categorias
	Db.Order("descripcion").Find(&categorias)

	log.Debug("Barrios: ", categorias)

	return categorias
}
