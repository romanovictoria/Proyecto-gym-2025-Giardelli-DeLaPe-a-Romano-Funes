package inscripcionController

import (
	"Proyecto-gym/dto"
	service "Proyecto-gym/services"
	"Proyecto-gym/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func RegistrarInscripcion(c *gin.Context) {
	var request dto.VerificacionRequest
	err := c.BindJSON(&request)

	// Error Parsing json param
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	_, errr := utils.ValidateJWT(request.Token)

	if errr == nil {
		inscripcionDto, er := service.InscripcionService.RegistrarInscripcion(request.Inscripcion)
		if er != nil {
			c.JSON(er.Status(), er)
			return
		}
		c.JSON(http.StatusCreated, inscripcionDto)
		return
	}
	log.Error("Error validating JWT: ", errr.Error())
	c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o expirado"})

	// Error del Insert
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

func GetInscripcionesUser(c *gin.Context) {
	log.Debug("Inscripcion id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var inscripcionesDto dto.InscripcionesDto

	inscripcionesDto, err := service.InscripcionService.GetInscripcionesUser(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, inscripcionesDto)
}
