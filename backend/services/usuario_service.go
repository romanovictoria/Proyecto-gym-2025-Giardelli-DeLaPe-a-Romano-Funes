package services

import (
	usuarioCliente "Proyecto-gym/clients/usuario"
	"Proyecto-gym/dto"
	"Proyecto-gym/model"
	e "Proyecto-gym/utils"
	"crypto/sha256"
	"encoding/hex"
)

type usuarioService struct{}

type usuarioServiceInterface interface {
	GetUsuarioById(id int) (dto.UsuarioDto, e.ApiError)
	Login(email string, password string) (dto.UsuarioDto, e.ApiError)
	Register(userDto dto.UsuarioDto, password string) (dto.UsuarioDto, e.ApiError)
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

func (s *usuarioService) Register(userDto dto.UsuarioDto, password string) (dto.UsuarioDto, e.ApiError) { // pasar como argumento el dto + la password
	// Verificar si el email ya existe
	existingUser := usuarioCliente.GetUsuarioByEmail(userDto.Email)
	if existingUser.Id != 0 {
		return dto.UsuarioDto{}, e.NewBadRequestApiError("email ya registrado")
	}

	var usuario model.Usuario
	usuario.Nombre = userDto.Nombre
	usuario.Apellido = userDto.Apellido
	usuario.Email = userDto.Email
	usuario.Password = hashPassword(password) // guardar hash
	usuario.Rol = userDto.Rol

	usuario = usuarioCliente.InsertUsuario(usuario)

	userDto.Id = usuario.Id
	//password = "" Comentado ya que no forma parte del dto por ende no se devuelve

	return userDto, nil
}
