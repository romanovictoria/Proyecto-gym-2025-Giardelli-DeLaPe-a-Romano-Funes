package model

import "time"

type Actividad struct {
	Id          int       `gorm:"primaryKey"`
	Nombre      string    `gorm:"type:varchar(350);not null"`
	Descripcion string    `gorm:"type:varchar(350);not null"`
	Cupo        int       `gorm:"not null"`
	Horario     time.Time `gorm:"type:time;not null"`

	Categoria   Categoria `gorm:"foreignkey:CategoriaId"`
	CategoriaId int
}

type Actividades []Actividad
