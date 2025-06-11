// package database

// import (
// 	"log"

// 	"time"

// 	"Proyecto-gym/clients/actividad"
// 	"Proyecto-gym/clients/categoria"
// 	"Proyecto-gym/clients/inscripcion"
// 	"Proyecto-gym/clients/usuario"
// 	"Proyecto-gym/model"

// 	"gorm.io/driver/mysql"
// 	"gorm.io/gorm"
// 	"gorm.io/gorm/logger"
// )

// var (
// 	DB  *gorm.DB
// 	err error
// )

// func init() {
// 	DB, err = gorm.Open(mysql.Open("file::memory:?cache=shared"), &gorm.Config{
// 		Logger: logger.Default.LogMode(logger.Info),
// 	})

// 	if err != nil {
// 		log.Println("Error al conectar a la base de datos:", err)
// 	} else {
// 		log.Println("Conexión establecida con la base de datos")
// 	}

// 	// Asignamos la conexión a los paquetes de clientes
// 	usuario.Db = DB
// 	actividad.Db = DB
// 	categoria.Db = DB
// 	inscripcion.Db = DB
// }

// func StartDbEngine() {
// 	DB.AutoMigrate(&model.Usuario{})
// 	DB.AutoMigrate(&model.Actividad{})
// 	DB.AutoMigrate(&model.Categoria{})
// 	DB.AutoMigrate(&model.Inscripcion{})
// 	log.Println("Migración de tablas completada")

// 	insertarDatosIniciales()
// }

// func insertarDatosIniciales() {
// 	// Usuarios
// 	usuario.InsertarUsuario(model.Usuario{
// 		Nombre:   "Jorge Sebastian",
// 		Apellido: "Rodriguez",
// 		Email:    "jsrodriguez@gmail.com",
// 		Rol:      false,
// 	})

// 	usuario.InsertarUsuario(model.Usuario{
// 		Nombre:   "Jose",
// 		Apellido: "De la Pena",
// 		Email:    "josedlp3@gmail.com",
// 		Rol:      false,
// 	})

// 	// Categorías
// 	categoria.InsertarCategoria(model.Categoria{
// 		Nombre: "Categoria 1",
// 	})

// 	categoria.InsertarCategoria(model.Categoria{
// 		Nombre: "Categoria 2",
// 	})

// 	// Actividades
// 	actividad.InsertActividad(model.Actividad{
// 		Nombre:      "Musculación",
// 		Descripcion: "Profesor Nahuel",
// 		Horario:     time.Date(2025, 5, 21, 19, 0, 0, 0, time.Local), // 21 de mayo de 2025 a las 19:00
// 		Cupo:        50,
// 	})
// }

package database

import (
	"fmt"
	"log"
	"os" // Necesario para os.Getenv

	"github.com/joho/godotenv" // Asegúrate de tener el paquete godotenv instalado
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitDB() (*gorm.DB, error) {
	// Cargar las variables de entorno desde el archivo .env
	err := godotenv.Load()
	if err != nil {
		return nil, fmt.Errorf("error cargando el archivo .env: %v", err)
	}

	// Obtener las variables de entorno
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		os.Getenv("DB_USER"),     // Usuario de la base de datos
		os.Getenv("DB_PASSWORD"), // Contraseña de la base de datos
		os.Getenv("DB_HOST"),     // Dirección del servidor de la base de datos
		os.Getenv("DB_PORT"),     // Puerto de la base de datos
		os.Getenv("DB_NAME"))     // Nombre de la base de datos

	// Abrir la conexión a la base de datos
	DB, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
		return nil, fmt.Errorf("error al conectar a la base de datos: %v", err)
	}

	log.Println("Conexión a la base de datos exitosa")
	return DB, nil
}
