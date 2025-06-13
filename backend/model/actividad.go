package model

type Actividad struct {
	Id          int       `gorm:"primaryKey"` // TODO AUTOINCREMENT
	Nombre      string    `gorm:"type:varchar(350);not null"`
	Descripcion string    `gorm:"type:varchar(350);not null"`
	Cupo        int       `gorm:"not null"`
	Horario     int64     `gorm:"not null"`
	Categoria   Categoria `gorm:"foreignkey:CategoriaId"`
	CategoriaId int
	Profesor    Usuario `gorm:"foreignkey:ProfesorId"`
	ProfesorId  int
}

type Actividades []Actividad
