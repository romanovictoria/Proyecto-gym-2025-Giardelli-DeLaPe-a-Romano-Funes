package loginController

import (
	"Proyecto-gym/dto"
	"Proyecto-gym/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PostLogin(c *gin.Context) {
	var loginDto dto.LoginDto

	// Validar el JSON de entrada
	if err := c.ShouldBindJSON(&loginDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Llamar al servicio de login
	loginResponse, apiErr := services.UsuarioService.Login(loginDto.Email, loginDto.Password)
	if apiErr != nil {
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	// Retornar usuario y token
	c.JSON(http.StatusOK, loginResponse)
}
