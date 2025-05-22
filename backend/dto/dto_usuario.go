package dto

type UsuarioDto struct {
	Id       int    `json:"id"`
	Nombre   string `json:"nombre"`
	Apellido string `json:"apellido"`
	Email    string `json:"email"`
	Rol      bool   `json:"rol"` // true = admin, false = socio
}

type UsuariosDto []UsuarioDto
