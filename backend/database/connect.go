package database

import (
	"log"

	"time"

	"github.com/romanovictoria/Proyecto-gym-2025-Giardelli-DeLaPe-a-Romano-Funes/clients/actividad"
	"github.com/romanovictoria/Proyecto-gym-2025-Giardelli-DeLaPe-a-Romano-Funes/clients/categoria"
	"github.com/romanovictoria/Proyecto-gym-2025-Giardelli-DeLaPe-a-Romano-Funes/clients/inscripcion"
	"github.com/romanovictoria/Proyecto-gym-2025-Giardelli-DeLaPe-a-Romano-Funes/clients/usuario"
	"github.com/romanovictoria/Proyecto-gym-2025-Giardelli-DeLaPe-a-Romano-Funes/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	DB  *gorm.DB
	err error
)

func init() {
	DB, err = gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Println("Error al conectar a la base de datos:", err)
	} else {
		log.Println("Conexión establecida con la base de datos")
	}

	// Asignamos la conexión a los paquetes de clientes
	usuario.Db = DB
	actividad.Db = DB
	categoria.Db = DB
	inscripcion.Db = DB
}

func StartDbEngine() {
	DB.AutoMigrate(&model.Usuario{})
	DB.AutoMigrate(&model.Actividad{})
	DB.AutoMigrate(&model.Categoria{})
	DB.AutoMigrate(&model.Inscripcion{})
	log.Println("Migración de tablas completada")

	insertarDatosIniciales()
}

func insertarDatosIniciales() {
	// Usuarios
	usuario.InsertarUsuario(model.Usuario{
		Nombre:   "Jorge Sebastian",
		Apellido: "Rodriguez",
		Email:    "jsrodriguez@gmail.com",
		Rol:      "socio",
	})

	usuario.InsertarUsuario(model.Usuario{
		Nombre:   "Jose",
		Apellido: "De la Pena",
		Email:    "josedlp3@gmail.com",
		Rol:      "socio",
	})

	// Categorías
	categoria.InsertarCategoria(model.Categoria{
		Descripcion: "Categoria 1",
	})

	categoria.InsertarCategoria(model.Categoria{
		Descripcion: "Categoria 2",
	})

	// Actividades
	actividad.InsertarActividad(model.Actividad{
		Titulo:      "Musculación",
		Descripcion: "Profesor Nahuel",
		Horario:     time.Date(2025, 5, 21, 19, 0, 0, 0, time.Local), // 21 de mayo de 2025 a las 19:00
		Cupo:        50,
	})
}
