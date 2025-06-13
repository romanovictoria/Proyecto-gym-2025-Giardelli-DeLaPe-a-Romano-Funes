package dto

type LoginResponseDto struct {
	Usuario UsuarioDto `json:"usuario"`
	Token   string     `json:"token"`
}
