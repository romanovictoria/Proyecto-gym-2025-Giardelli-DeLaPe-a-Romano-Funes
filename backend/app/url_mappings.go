package app

import (
	// Controladores
	actividadController "Proyecto-gym/controllers/actividad"
	categoriaController "Proyecto-gym/controllers/categoria"
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
	router.GET("/home", actividadController.GetActividades)             // Listo
	router.POST("/home", actividadController.ActividadInsert)           // Listo
	router.GET("/home/:id", actividadController.GetActividadById)       // Listo
	router.PUT("/home/:id", actividadController.PutActividadById)       // Listo
	router.DELETE("/home/:id", actividadController.DeleteActividadById) // Listo

	// Rutas Usuario
	router.GET("/usuario", usuarioController.GetUsuarios)    // Listo
	router.POST("/usuario", usuarioController.CreateUsuario) // Listo

	// Rutas Categoria
	router.GET("/categoria", categoriaController.GetCategorias)

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
