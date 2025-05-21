package models

import (
	"time"
)

type Usuario struct {
	ID       uint   `gorm:"primaryKey"`
	Nombre   string `gorm:"size:100;not null"`
	Apellido string `gorm:"size:100;not null"`
	Email    string `gorm:"size:100;unique;not null"`
	Password string `gorm:"size:256;not null"`
	Rol      bool   `gorm:"default:false"`
}

type Actividad struct {
	ID           uint      `gorm:"primaryKey"`
	ID_Categoria uint      `gorm:"not null"`
	ID_Usuario   uint      `gorm:"not null"`
	Titulo       string    `gorm:"size:100;not null"`
	Descripcion  string    `gorm:"type:text"`
	Categoria    string    `gorm:"size:50;not null"`
	Horario      time.Time `gorm:"autoCreateTime"`
	Cupo         int       `gorm:"not null"`
}

type Inscripcion struct {
	ID               uint      `gorm:"primaryKey"`
	ID_Usuario       uint      `gorm:"not null"`
	ID_Actividad     uint      `gorm:"not null"`
	FechaInscripcion time.Time `gorm:"autoCreateTime"`
}

type Categoria struct {
	ID     uint   `gorm:"primaryKey"`
	Nombre string `gorm:"size:100;not null"`
}
