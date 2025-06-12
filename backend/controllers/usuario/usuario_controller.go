package usuarioController

import (
	"Proyecto-gym/dto"
	service "Proyecto-gym/services"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetUsuario(c *gin.Context) {
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
	}

	err := c.BindJSON(&request)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	usuarioCreado, er := service.UsuarioService.Register(request.Usuario, request.Password)
	if er != nil {
		c.JSON(er.Status(), er)
		return
	}

	c.JSON(http.StatusCreated, usuarioCreado)
}
