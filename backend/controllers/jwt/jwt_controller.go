package controllers

import (
	"Proyecto-gym/database"
	"Proyecto-gym/model"
	"Proyecto-gym/utils"
	errors "Proyecto-gym/utils/errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginHandler(c *gin.Context) {
	var loginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		apiErr := errors.NewBadRequestApiError("Datos inválidos")
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	var usuario model.Usuario
	if err := database.DB.Where("email = ?", loginRequest.Email).First(&usuario).Error; err != nil {
		apiErr := errors.NewUnauthorizedApiError("Usuario no encontrado")
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	if err := utils.CheckPasswordHash(usuario.Password, loginRequest.Password); err != nil {
		apiErr := errors.NewUnauthorizedApiError("Credenciales incorrectas")
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	token, err := utils.GenerateJWT(usuario.Email, usuario.Rol)
	if err != nil {
		apiErr := errors.NewInternalServerApiError("No se pudo generar el token", err)
		c.JSON(apiErr.Status(), apiErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}
