package dto

type ActividadDto struct {
	Nombre               string `json:"nombre"`
	Descripcion          string `json:"descripcion"`
	Id                   int    `json:"id"`
	CategoriaId          int    `json:"categoria_id"`
	CategoriaDescripcion string `json:"categoria_descripcion"`
	Cupo                 int    `json:"cupo"`
}

type ActividadesDto []ActividadDto
