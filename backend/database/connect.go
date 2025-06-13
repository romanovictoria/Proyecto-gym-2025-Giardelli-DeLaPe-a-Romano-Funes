package database

import (
	actividadClient "Proyecto-gym/clients/actividad"
	categoriaClient "Proyecto-gym/clients/categoria"
	inscripcionClient "Proyecto-gym/clients/inscripcion"
	usuarioClient "Proyecto-gym/clients/usuario"
	"Proyecto-gym/model"
	"log"

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
	usuarioClient.Db = DB
	actividadClient.Db = DB
	categoriaClient.Db = DB
	inscripcionClient.Db = DB
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
	newUsuario := model.Usuario{
		Nombre:   "Jorge Sebastian",
		Apellido: "Rodriguez",
		Email:    "jsrodriguez@gmail.com",
		Rol:      false,
	}
	usuarioClient.InsertarUsuario(newUsuario)

	newUsuario1 := model.Usuario{
		Nombre:   "Jose",
		Apellido: "De la Pena",
		Email:    "josedlp3@gmail.com",
		Rol:      false,
	}
	usuarioClient.InsertarUsuario(newUsuario1)

	// Categorías
	newCategoria := model.Categoria{
		Nombre: "Categoria 1",
	}
	categoriaClient.InsertarCategoria(newCategoria)

	newCategoria1 := model.Categoria{
		Nombre: "Categoria 2",
	}
	categoriaClient.InsertarCategoria(newCategoria1)

	// Actividades
	newActividad := model.Actividad{
		Nombre:      "Musculación",
		Descripcion: "Profesor Nahuel",
		Horario:     1749799118, // 21 de mayo de 2025 a las 19:00
		Cupo:        50,
		CategoriaId: 1,
		UsuarioId:   2,
	}
	actividadClient.InsertActividad(newActividad)
}
