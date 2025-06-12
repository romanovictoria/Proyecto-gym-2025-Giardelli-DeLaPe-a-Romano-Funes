package usuarioController

import (
	// "Proyecto-gym/dto"
	"Proyecto-gym/dto"
	service "Proyecto-gym/services"
	"net/http"

	// "strconv"

	"github.com/gin-gonic/gin"
	// log "github.com/sirupsen/logrus"
)

// func GetUsuarioDetalleById(c *gin.Context) {
// 	log.Debug("Usuario id to load: " + c.Param("id"))
// 	id, err := strconv.Atoi(c.Param("id"))
// 	if err != nil {
// 		log.Error("Invalid user ID")
// 		c.JSON(http.StatusBadRequest, "Invalid user ID")
// 		return
// 	}

// 	usuarioDto, er := service.UsuarioService.GetUsuarioDetalleById(id)
// 	if er != nil {
// 		c.JSON(er.Status(), er)
// 		return
// 	}

// 	c.JSON(http.StatusOK, usuarioDto)
// }

// func PostLogin(c *gin.Context) {
// 	var usuarioDto dto.UsuarioDto
// 	err := c.BindJSON(&usuarioDto)

// 	// Error Parsing json param
// 	if err != nil {
// 		log.Error(err.Error())
// 		c.JSON(http.StatusBadRequest, err.Error())
// 		return
// 	}

// 	actividadDto, er := service.UsuarioService.Login(usuarioDto)
// 	// Error del Insert
// 	if er != nil {
// 		c.JSON(er.Status(), er)
// 		return
// 	}

// 	c.JSON(http.StatusCreated, actividadDto)
// }

func GetUsuario(c *gin.Context) {
	var usuariosDto dto.UsuariosDto
	usuariosDto, err := service.UsuarioService.GetUsuarios()
	if err != nil {
		c.JSON(err.Status(), err)
		return
	}
	c.JSON(http.StatusOK, usuariosDto)
}
