package dto

type VerificacionRequest struct {
	Actividad   ActividadDto   `json:"actividad"`
	Usuario     UsuarioDto     `json:"usuario"`
	Inscripcion InscripcionDto `json:"inscripcion"`
	Verificar   bool           `json:"verificar"`
	Token       string         `json:"token"`
}
