package dto

type ActividadDto struct {
	Nombre               string `json:"nombre"`
	Descripcion          string `json:"descripcion"`
	Id                   int    `json:"id"`
	CategoriaId          int    `json:"categoria_id"`
	CategoriaDescripcion string `json:"categoria_descripcion"`
	UsuarioId            int    `json:"usuario_id"`
	UsuarioNombre        string `json:"usuario_nombre"`
	Cupo                 int    `json:"cupo"`
	Horario              int64  `json:"horario"`
}

// Falta horario TODO

type ActividadesDto []ActividadDto
