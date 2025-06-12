package app

import (
	// Controladores
	actividadController "Proyecto-gym/controllers/actividad"
	inscripcionController "Proyecto-gym/controllers/inscripcion"
	loginController "Proyecto-gym/controllers/login"
	usuarioController "Proyecto-gym/controllers/usuario"

	log "github.com/sirupsen/logrus"
)

// MapUrls configura todas las rutas de la aplicación
func MapUrls() {
	// Rutas Inscripción
	router.GET("/inscripcion/:id", inscripcionController.GetInscripcionById)
	router.POST("/inscripcion", inscripcionController.RegistrarInscripcion)

	// Rutas Actividad
	router.POST("/actividad", actividadController.ActividadInsert)
	router.GET("/actividad/:id", actividadController.GetActividadById)
	router.PUT("/actividad/:id", actividadController.GetActividadById)
	router.DELETE("/actividad/:id", actividadController.GetActividadById)

	// Rutas Usuario
	router.GET("/usuario", usuarioController.GetUsuario)
	router.POST("/usuario", usuarioController.CreateUsuario) // ✅ Ruta agregada para POST

	// Ruta de Login
	router.POST("/login", loginController.PostLogin)

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
