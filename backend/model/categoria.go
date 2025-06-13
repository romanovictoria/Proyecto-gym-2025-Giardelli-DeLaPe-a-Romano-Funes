package model

type Categoria struct {
	Id     int    `gorm:"primaryKey"`
	Nombre string `gorm:"type:varchar(350);not null"`
}

type Categorias []Categoria
