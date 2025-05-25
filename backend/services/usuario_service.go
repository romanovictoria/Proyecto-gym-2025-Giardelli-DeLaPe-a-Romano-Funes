package services

import (
	"crypto/sha256"
	"encoding/hex"
	usuarioCliente "proyecto-gym/clients/usuario"
	"proyecto-gym/dto"
	"proyecto-gym/model"
	e "proyecto-gym/utils/errors"
)

type usuarioService struct{}

type usuarioServiceInterface interface {
	GetUsuarioById(id int) (dto.UsuarioDto, e.ApiError)
	Login(email string, password string) (dto.UsuarioDto, e.ApiError)
	Register(userDto dto.UsuarioDto) (dto.UsuarioDto, e.ApiError)
}

var (
	UsuarioService usuarioServiceInterface
)

func init() {
	UsuarioService = &usuarioService{}
}

func hashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hash[:])
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

func (s *usuarioService) Login(email string, password string) (dto.UsuarioDto, e.ApiError) {
	var usuario model.Usuario = usuarioCliente.GetUsuarioByEmail(email)
	if usuario.Id == 0 {
		return dto.UsuarioDto{}, e.NewUnauthorizedApiError("usuario o contraseña incorrectos")
	}

	hashedPass := hashPassword(password)
	if usuario.Password != hashedPass {
		return dto.UsuarioDto{}, e.NewUnauthorizedApiError("usuario o contraseña incorrectos")
	}

	// Aquí iría la lógica para generar JWT, etc.

	return s.GetUsuarioById(usuario.Id)
}

func (s *usuarioService) Register(userDto dto.UsuarioDto) (dto.UsuarioDto, e.ApiError) {
	// Verificar si el email ya existe
	existingUser := usuarioCliente.GetUsuarioByEmail(userDto.Email)
	if existingUser.Id != 0 {
		return dto.UsuarioDto{}, e.NewBadRequestApiError("email ya registrado")
	}

	var usuario model.Usuario
	usuario.Nombre = userDto.Nombre
	usuario.Apellido = userDto.Apellido
	usuario.Email = userDto.Email
	usuario.Password = hashPassword(userDto.Password) // guardar hash
	usuario.Rol = userDto.Rol

	usuario = usuarioCliente.InsertUsuario(usuario)

	userDto.Id = usuario.Id
	userDto.Password = "" // No devolver la contraseña

	return userDto, nil
}
