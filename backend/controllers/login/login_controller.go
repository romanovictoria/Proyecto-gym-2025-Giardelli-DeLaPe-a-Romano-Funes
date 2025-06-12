package loginController

import (
	"Proyecto-gym/dto"
	services "Proyecto-gym/services"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func PostLogin(c *gin.Context) {
	var loginDto dto.LoginDto
	var loginResponse dto.LoginResponseDto
	err := c.BindJSON(&loginDto)

	// Validar el JSON de entrada
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Llamar al servicio de login
	log.Debug("Llamando a GetUsuarioByEmail con: ", loginDto.Email)
	loginResponse, apiErr := services.UsuarioService.Login(loginDto)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	// Retornar usuario y token
	c.JSON(http.StatusOK, loginResponse)
}
