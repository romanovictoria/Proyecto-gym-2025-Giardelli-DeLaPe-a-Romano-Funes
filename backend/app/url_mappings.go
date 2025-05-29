package app

import (
	// Controladores

	inscripcionController "Proyecto-gym/controllers/inscripcion"
	usuarioController "Proyecto-gym/controllers/usuario"

	actividadController "Proyecto-gym/controllers/actividad"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

// Router es la variable global para manejar rutas y correr el servidor
var Router *gin.Engine

// MapUrls configura todas las rutas de la aplicación
func MapUrls() {
	Router = gin.Default()

	// Rutas Inscripcion
	Router.GET("/inscripcion/:id", inscripcionController.GetInscripcionById)
	Router.POST("/inscripcion", inscripcionController.RegistrarInscripcion)

	// Rutas Actividad
	Router.POST("/actividad", actividadController.ActividadInsert)
	Router.GET("/actividad/:id", actividadController.GetActividadById)

	// Rutas Usuario
	Router.GET("/usuario/:id", usuarioController.GetUsuarioDetalleById)
	Router.GET("/usuario", usuarioController.GetUsuario)

	// Rutas Barrio (ejemplo si usas)

	log.Info("Finishing mappings configurations")
}

// RunServer inicia el servidor en el puerto dado
func RunServer(port string) {
	if Router == nil {
		log.Fatal("Router no está inicializado. Ejecuta MapUrls primero.")
	}

	err := Router.Run(port)
	if err != nil {
		log.Fatal("No se pudo iniciar el servidor: ", err)
	}
}
