package inscripcionController

import (
	"net/http"
	"strconv"
	"ucc-gorm/dto"
	service "ucc-gorm/services"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func RegistrarInscripcion(c *gin.Context) {

	var inscripcionDto dto.InscripcionDto
	err := c.BindJSON(&inscripcionDto)

	// Error Parsing json param
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	inscripcionDto, er := service.InscripcionService.RegistrarInscripcion(inscripcionDto)
	// Error del Insert
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, inscripcionDto)
}

func GetInscripcionById(c *gin.Context) {
	log.Debug("Inscripcion id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var inscripcionDto dto.InscripcionDto

	inscripcionDto, err := service.InscripcionService.GetInscripcionById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, inscripcionDto)
}
