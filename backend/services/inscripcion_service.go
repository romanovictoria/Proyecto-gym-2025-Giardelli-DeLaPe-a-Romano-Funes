package services

import (
	actividadCliente "Proyecto-gym/clients/actividad"
	inscripcionCliente "Proyecto-gym/clients/inscripcion"
	usuarioCliente "Proyecto-gym/clients/usuario"
	"Proyecto-gym/dto"
	"Proyecto-gym/model"
	e "Proyecto-gym/utils"
	"time"
)

type inscripcionService struct{}

type inscripcionServiceInterface interface {
	GetInscripcionById(id int) (dto.InscripcionDto, e.ApiError)
	RegistrarInscripcion(inscripcionDto dto.InscripcionDto) (dto.InscripcionDto, e.ApiError)
	GetInscripcionesUser(id int) (dto.InscripcionesDto, e.ApiError)
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
	inscripcionDto.UsuarioId = inscripcion.UsuarioId
	inscripcionDto.UsuarioNombre = inscripcion.Usuario.Nombre
	inscripcionDto.ActividadId = inscripcion.Actividad.Id
	inscripcionDto.ActividadNombre = inscripcion.Actividad.Nombre

	return inscripcionDto, nil
}

func (s *inscripcionService) RegistrarInscripcion(inscripcionDto dto.InscripcionDto) (dto.InscripcionDto, e.ApiError) {

	inscripcionesUsuario, err := s.GetInscripcionesUser(inscripcionDto.UsuarioId)
	var usuario model.Usuario = usuarioCliente.GetUsuarioById(inscripcionDto.UsuarioId)
	var actividad model.Actividad = actividadCliente.GetActividadById(inscripcionDto.ActividadId)

	if err != nil {
		return dto.InscripcionDto{}, e.NewInternalServerApiError("Error obteniendo inscripciones del usuario", err)
	}
	if actividad.Cupo <= 0 {
		return dto.InscripcionDto{}, e.NewBadRequestApiError("Cupo insuficiente para Inscripcion")
	}
	for _, inscripcion := range inscripcionesUsuario {
		if inscripcion.ActividadId == inscripcionDto.ActividadId {
			return dto.InscripcionDto{}, e.NewBadRequestApiError("El usuario ya está inscripto en la actividad")
		}
	}
	var inscripcion model.Inscripcion
	inscripcion.Usuario = usuario
	inscripcion.Actividad = actividad
	inscripcion.UsuarioId = inscripcionDto.UsuarioId
	inscripcion.ActividadId = inscripcionDto.ActividadId

	actividad.Cupo -= 1
	var actividadEditada dto.ActividadDto

	actividadEditada.Id = actividad.Id
	actividadEditada.Nombre = actividad.Nombre
	actividadEditada.Descripcion = actividad.Descripcion
	actividadEditada.CategoriaId = actividad.CategoriaId
	actividadEditada.CategoriaDescripcion = actividad.Categoria.Nombre
	actividadEditada.Horario = actividad.Horario
	actividadEditada.Cupo = actividad.Cupo
	actividadEditada.UsuarioId = actividad.UsuarioId
	actividadEditada.UsuarioNombre = actividad.Usuario.Nombre

	ActividadService.PutActividadById(actividad.Id, actividadEditada)
	now := time.Now()
	formatted := now.Format(time.RFC822)
	inscripcion.Fecha = formatted

	inscripcion = inscripcionCliente.RegistrarInscripcion(inscripcion)

	// 5. Completar DTO
	inscripcionDto.ActividadNombre = inscripcion.Actividad.Nombre
	inscripcionDto.UsuarioNombre = inscripcion.Usuario.Nombre
	inscripcionDto.Id = inscripcion.Id

	return inscripcionDto, nil
}

func (s *inscripcionService) GetInscripcionesUser(id int) (dto.InscripcionesDto, e.ApiError) {
	var inscripciones model.Inscripciones = inscripcionCliente.GetInscripcionesUser(id)
	var inscripcionesDto dto.InscripcionesDto

	for _, inscripcion := range inscripciones {
		var inscripcionDto dto.InscripcionDto

		inscripcionDto.Id = inscripcion.Id
		inscripcionDto.UsuarioNombre = inscripcion.Usuario.Nombre
		inscripcionDto.UsuarioId = inscripcion.UsuarioId
		inscripcionDto.ActividadId = inscripcion.ActividadId
		inscripcionDto.ActividadNombre = inscripcion.Actividad.Nombre
		inscripcionDto.Fecha = inscripcion.Fecha

		inscripcionesDto = append(inscripcionesDto, inscripcionDto)
	}

	return inscripcionesDto, nil
}
