package services

import (
	actividadCliente "proyecto-gym/clients/actividad"
	inscripcionCliente "proyecto-gym/clients/inscripcion"
	usuarioCliente "proyecto-gym/clients/usuario"
	"proyecto-gym/dto"
	"proyecto-gym/model"
	e "proyecto-gym/utils/errors"
	"time"
)

type inscripcionService struct{}

type inscripcionServiceInterface interface {
	GetInscripcionById(id int) (dto.InscripcionDto, e.ApiError)
	RegistrarInscripcion(inscripcionDto dto.InscripcionDto) (dto.InscripcionDto, e.ApiError)
}

var (
	InscripcionService inscripcionServiceInterface
)

func init() {
	InscripcionService = &inscripcionService{}
}

func (s *inscripcionService) GetInscripcionById(id int) (dto.InscripcionDto, e.ApiError) {

	var inscripcion model.Inscripcion = inscripcionCliente.GetInscripcionById(id)
	var inscripcionDto dto.InscripcionDto

	if inscripcion.Id == 0 {
		return inscripcionDto, e.NewBadRequestApiError("inscripcion not found")
	}

	inscripcionDto.Id = inscripcion.Id
	inscripcionDto.UsuarioNombre = inscripcion.Usuario.Nombre
	inscripcionDto.ActividadNombre = inscripcion.Actividad.Nombre

	return inscripcionDto, nil
}

func (s *inscripcionService) RegistrarInscripcion(inscripcionDto dto.InscripcionDto) (dto.InscripcionDto, e.ApiError) {

	var inscripcion model.Inscripcion

	var usuario model.Usuario = usuarioCliente.GetUsuarioById(inscripcionDto.UsuarioId)
	var actividad model.Actividad = actividadCliente.GetActividadById(inscripcionDto.ActividadId)
	inscripcion.Usuario = usuario
	inscripcion.Actividad = actividad
	inscripcion.UsuarioId = inscripcionDto.UsuarioId
	inscripcion.ActividadId = inscripcionDto.ActividadId

	now := time.Now()
	formatted := now.Format(time.RFC822)

	inscripcion.Fecha = formatted
	inscripcion = inscripcionCliente.RegistrarInscripcion(inscripcion)

	inscripcionDto.Id = inscripcion.Id

	return inscripcionDto, nil
}
