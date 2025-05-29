package usuarioController

import (
	service "Proyecto-gym/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetUsuarioDetalleById(c *gin.Context) {
	log.Debug("Usuario id to load: " + c.Param("id"))
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Error("Invalid user ID")
		c.JSON(http.StatusBadRequest, "Invalid user ID")
		return
	}

	usuarioDto, err := service.UsuarioService.GetUsuarioDetalleById(id)
	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, usuarioDto)
}

func GetUsuario(c *gin.Context) {
	usuariosDto, err := service.UsuarioService.GetUsuarios()
	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, usuariosDto)
}
