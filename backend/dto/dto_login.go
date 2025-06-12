package dto

type LoginDto struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginResponseDto struct {
	Usuario UsuarioDto `json:"usuario"`
	Token   string     `json:"token"`
}
