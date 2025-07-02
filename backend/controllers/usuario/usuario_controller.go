package usuarioController

import (
	"Proyecto-gym/dto"
	service "Proyecto-gym/services"
	"Proyecto-gym/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetUsuarios(c *gin.Context) {
	var usuariosDto dto.UsuariosDto
	usuariosDto, err := service.UsuarioService.GetUsuarios()
	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, usuariosDto)
}

// Crear Usuario usando el método Register
func CreateUsuario(c *gin.Context) {
	var request struct {
		Usuario  dto.UsuarioDto `json:"usuario"`
		Password string         `json:"password"`
		Token    string         `json:"token"`
	}

	err := c.BindJSON(&request)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	_, errr := utils.ValidateJWT(request.Token)
	if errr == nil {
		usuarioCreado, er := service.UsuarioService.Register(request.Usuario, request.Password)
		if er != nil {
			c.JSON(er.Status(), er)
			return
		}

		c.JSON(http.StatusCreated, usuarioCreado)
	} else {
		log.Error("Error validating JWT: ", errr.Error())
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o expirado"})
	}
}
