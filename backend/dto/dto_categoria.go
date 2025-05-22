package dto

type CategoriaDto struct {
	Id     int    `json:"id"`
	Nombre string `json:"nombre"`
}

type CategoriasDto []CategoriaDto
