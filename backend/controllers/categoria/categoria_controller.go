package categoriaController

import (
	"net/http"
	"strconv"
	"ucc-gorm/dto"
	service "ucc-gorm/services"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetCategoriaById(c *gin.Context) {
	log.Debug("Categoria id to load: " + c.Param("id"))
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Error("Invalid categoria ID")
		c.JSON(http.StatusBadRequest, "Invalid categoria ID")
		return
	}

	categoriaDto, err := service.CategoriaService.GetCategoriaById(id)
	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, categoriaDto)
}

func CategoriaInsert(c *gin.Context) {
	var categoriaDto dto.CategoriaDto
	err := c.BindJSON(&categoriaDto)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	categoriaDto, er := service.CategoriaService.InsertCategoria(categoriaDto)
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, categoriaDto)
}
