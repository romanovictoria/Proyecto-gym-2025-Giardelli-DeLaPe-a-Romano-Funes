package actividadController

import (
	"Proyecto-gym/dto"
	service "Proyecto-gym/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetActividades(c *gin.Context) {
	var actividadesDto dto.ActividadesDto
	actividadesDto, err := service.ActividadService.GetActividades()
	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, actividadesDto)
}

func GetActividadById(c *gin.Context) {
	log.Debug("Actividad id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var actividadDto dto.ActividadDto

	actividadDto, err := service.ActividadService.GetActividadById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, actividadDto)
}

func ActividadInsert(c *gin.Context) {
	var verificarDto dto.VerificacionRequest
	var actividadDto dto.ActividadDto
	err := c.BindJSON(&verificarDto)

	// Error Parsing json param
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if verificarDto.Verificar {
		actividadDto = verificarDto.Actividad
		actividadDto, er := service.ActividadService.InsertActividad(actividadDto)
		// Error del Insert
		if er != nil {
			c.JSON(er.Status(), er)
			return
		}
		c.JSON(http.StatusCreated, actividadDto)
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "La verificación fue denegada."})
	}
}

func PutActividadById(c *gin.Context) {
	log.Debug("Actividad id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var actividadDto dto.ActividadDto
	err := c.BindJSON(&actividadDto)

	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	actividadDto, er := service.ActividadService.PutActividadById(id, actividadDto)
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusOK, actividadDto)
}

func DeleteActividadById(c *gin.Context) {
	log.Debug("Actividad id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	err := service.ActividadService.DeleteActividadById(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"Alerta": "Actividad eliminada correctamente"})
}
