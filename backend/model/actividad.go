package model

type Actividad struct {
	Id          int       `gorm:"primaryKey"`
	Nombre      string    `gorm:"type:varchar(350);not null"`
	Descripcion string    `gorm:"type:varchar(350);not null"`
	Cupo        int       `gorm:"not null"`
	Horario     int64     `gorm:"not null"`
	Categoria   Categoria `gorm:"foreignkey:CategoriaId"`
	CategoriaId int
	Usuario     Usuario `gorm:"foreignkey:UsuarioId"`
	UsuarioId   int
}

type Actividades []Actividad
