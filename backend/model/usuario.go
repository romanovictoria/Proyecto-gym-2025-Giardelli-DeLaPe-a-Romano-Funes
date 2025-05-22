package model

type Usuario struct {
	Id       int    `gorm:"primaryKey"`
	Nombre   string `gorm:"type:varchar(100);not null"`
	Apellido string `gorm:"type:varchar(100);not null"`
	Email    string `gorm:"type:varchar(150);unique;not null"`
	Password string `gorm:"type:varchar(256);not null"` // acá guardás el hash
	Rol      bool   `gorm:"default:false"`              // true = admin, false = socio
}

type Usuarios []Usuario
