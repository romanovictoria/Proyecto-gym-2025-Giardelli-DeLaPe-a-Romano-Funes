package services

import (
	usuarioCliente "Proyecto-gym/clients/usuario"
	"Proyecto-gym/dto"
	"Proyecto-gym/model"
	"Proyecto-gym/utils"
	e "Proyecto-gym/utils"
)

type usuarioService struct{}

type usuarioServiceInterface interface {
	GetUsuarioById(id int) (dto.UsuarioDto, e.ApiError)
	Login(email string, password string) (dto.LoginResponseDto, e.ApiError)
	Register(userDto dto.UsuarioDto, password string) (dto.UsuarioDto, e.ApiError)
	GetUsuarios() (dto.UsuariosDto, e.ApiError)
}

var (
	UsuarioService usuarioServiceInterface
)

func init() {
	UsuarioService = &usuarioService{}
}

func (s *usuarioService) GetUsuarioById(id int) (dto.UsuarioDto, e.ApiError) {
	var usuario model.Usuario = usuarioCliente.GetUsuarioById(id)
	var usuarioDto dto.UsuarioDto

	if usuario.Id == 0 {
		return usuarioDto, e.NewBadRequestApiError("usuario not found")
	}

	usuarioDto.Id = usuario.Id
	usuarioDto.Nombre = usuario.Nombre
	usuarioDto.Apellido = usuario.Apellido
	usuarioDto.Email = usuario.Email
	usuarioDto.Rol = usuario.Rol

	return usuarioDto, nil
}

func (s *usuarioService) Login(email string, password string) (dto.LoginResponseDto, e.ApiError) {
	var usuario model.Usuario = usuarioCliente.GetUsuarioByEmail(email)
	if usuario.Id == 0 {
		return dto.LoginResponseDto{}, e.NewUnauthorizedApiError("usuario o contraseña incorrectos")
	}

	// Usar bcrypt para verificar la contraseña
	if err := utils.CheckPasswordHash(usuario.Password, password); err != nil {
		return dto.LoginResponseDto{}, e.NewUnauthorizedApiError("usuario o contraseña incorrectos")
	}

	// Generar JWT
	token, err := utils.GenerateJWT(usuario.Email, usuario.Rol)
	if err != nil {
		return dto.LoginResponseDto{}, e.NewInternalServerApiError("error generando token", err)
	}

	// Obtener los datos del usuario
	usuarioDto, apiErr := s.GetUsuarioById(usuario.Id)
	if apiErr != nil {
		return dto.LoginResponseDto{}, apiErr
	}

	// Crear response con usuario y token
	loginResponse := dto.LoginResponseDto{
		Usuario: usuarioDto,
		Token:   token,
	}

	return loginResponse, nil
}

func (s *usuarioService) Register(userDto dto.UsuarioDto, password string) (dto.UsuarioDto, e.ApiError) {
	// Verificar si el email ya existe
	existingUser := usuarioCliente.GetUsuarioByEmail(userDto.Email)
	if existingUser.Id != 0 {
		return dto.UsuarioDto{}, e.NewBadRequestApiError("email ya registrado")
	}

	// Hashear la contraseña con bcrypt
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return dto.UsuarioDto{}, e.NewInternalServerApiError("error hasheando contraseña", err)
	}

	var usuario model.Usuario
	usuario.Nombre = userDto.Nombre
	usuario.Apellido = userDto.Apellido
	usuario.Email = userDto.Email
	usuario.Password = hashedPassword
	usuario.Rol = userDto.Rol

	// CORRECCIÓN: Cambiar InsertUsuario por InsertarUsuario
	usuario = usuarioCliente.InsertarUsuario(usuario)

	userDto.Id = usuario.Id

	return userDto, nil
}

func (s *usuarioService) GetUsuarios() (dto.UsuariosDto, e.ApiError) {
	var usuarios model.Usuarios = usuarioCliente.GetUsuarios()
	var usuariosDto dto.UsuariosDto

	for _, user := range usuarios {
		var usuarioDto dto.UsuarioDto

		usuarioDto.Id = user.Id
		usuarioDto.Nombre = user.Nombre
		usuarioDto.Apellido = user.Apellido
		usuarioDto.Email = user.Email
		usuarioDto.Rol = user.Rol

		usuariosDto = append(usuariosDto, usuarioDto)
	}

	return usuariosDto, nil
}
