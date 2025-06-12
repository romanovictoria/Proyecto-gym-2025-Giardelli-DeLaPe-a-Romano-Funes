package app

import (
	// Controladores

	inscripcionController "Proyecto-gym/controllers/inscripcion"
	usuarioController "Proyecto-gym/controllers/usuario"

	actividadController "Proyecto-gym/controllers/actividad"

	log "github.com/sirupsen/logrus"
)

// MapUrls configura todas las rutas de la aplicación
func MapUrls() {
	// Rutas Inscripcion
	router.GET("/inscripcion/:id", inscripcionController.GetInscripcionById)
	router.POST("/inscripcion", inscripcionController.RegistrarInscripcion)

	// Rutas Actividad
	// Router.GET("/actividad", actividadController.GetActividad)
	router.POST("/actividad", actividadController.ActividadInsert)
	router.GET("/actividad/:id", actividadController.GetActividadById)
	router.PUT("/actividad/:id", actividadController.GetActividadById)
	router.DELETE("/actividad/:id", actividadController.GetActividadById)

	// Rutas Usuario
	router.GET("/usuario", usuarioController.GetUsuario)
	// Router.GET("/usuario/:id", usuarioController.TODO)
	// Router.POST("/users/login", usuarioController.TODO)
	// Router.POST("/users/register", usuarioController.TODO)

	// Rutas Barrio (ejemplo si usas)

	log.Info("Finishing mappings configurations")
}

// RunServer inicia el servidor en el puerto dado
func RunServer(port string) {
	if router == nil {
		log.Fatal("Router no está inicializado. Ejecuta MapUrls primero.")
	}

	err := router.Run(port)
	if err != nil {
		log.Fatal("No se pudo iniciar el servidor: ", err)
	}
}
