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
	router.GET("/usuario/:id/inscripcion", inscripcionController.GetInscripcionesUser) // 	Listo
	router.GET("/inscripcion/:id", inscripcionController.GetInscripcionById)           // 	Listo
	router.POST("/inscripcion", inscripcionController.RegistrarInscripcion)            // 	Listo

	// Rutas Actividad
	router.GET("/actividad", actividadController.GetActividades)       // Listo
	router.POST("/actividad", actividadController.ActividadInsert)     // Listo
	router.GET("/actividad/:id", actividadController.GetActividadById) // Listo
	router.PUT("/actividad/:id", actividadController.PutActividadById)
	router.DELETE("/actividad/:id", actividadController.GetActividadById) // Listo

	// Rutas Usuario
	router.GET("/usuario", usuarioController.GetUsuarios)    // Listo
	router.POST("/usuario", usuarioController.CreateUsuario) // Listo

	// Ruta de Login
	router.POST("/login", loginController.PostLogin) // Listo

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
