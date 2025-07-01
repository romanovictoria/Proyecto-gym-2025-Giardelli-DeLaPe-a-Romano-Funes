package dto

type VerificacionRequest struct {
	Actividad ActividadDto `json:"actividad"`
	Usuario   UsuarioDto   `json:"usuario"`
	Verificar bool         `json:"verificar"`
}
