package services

import (
	actividadCliente "Proyecto-gym/clients/actividad"
	categoriaCliente "Proyecto-gym/clients/categoria"
	usuarioClient "Proyecto-gym/clients/usuario"

	"Proyecto-gym/dto"
	"Proyecto-gym/model"
	e "Proyecto-gym/utils"
)

type actividadService struct{}

type actividadServiceInterface interface {
	GetActividadById(id int) (dto.ActividadDto, e.ApiError)
	InsertActividad(actividadDto dto.ActividadDto) (dto.ActividadDto, e.ApiError)
	GetActividades() (dto.ActividadesDto, e.ApiError)
	PutActividadById(id int, reemplazo dto.ActividadDto) (dto.ActividadDto, e.ApiError)
	DeleteActividadById(id int) e.ApiError
}

var (
	ActividadService actividadServiceInterface
)

func init() {
	ActividadService = &actividadService{}
}

func (s *actividadService) GetActividades() (dto.ActividadesDto, e.ApiError) {
	var actividades model.Actividades = actividadCliente.GetActividades()
	var actividadesDto dto.ActividadesDto

	for _, actividad := range actividades {
		var actividadDto dto.ActividadDto

		actividadDto.Id = actividad.Id
		actividadDto.Nombre = actividad.Nombre
		actividadDto.Descripcion = actividad.Descripcion
		actividadDto.CategoriaId = actividad.CategoriaId
		actividadDto.CategoriaDescripcion = actividad.Categoria.Nombre
		actividadDto.Horario = actividad.Horario
		actividadDto.Cupo = actividad.Cupo
		actividadDto.UsuarioId = actividad.UsuarioId
		actividadDto.UsuarioNombre = actividad.Usuario.Nombre

		actividadesDto = append(actividadesDto, actividadDto)
	}

	return actividadesDto, nil
}
func (s *actividadService) DeleteActividadById(id int) e.ApiError {

	if id != 0 {
		var actividad model.Actividad = actividadCliente.GetActividadById(id)
		actividadCliente.DeleteActividadById(actividad)
	} else {
		return e.NewBadRequestApiError("actividad not found")
	}
	return nil
}

func (s *actividadService) GetActividadById(id int) (dto.ActividadDto, e.ApiError) {

	var actividad model.Actividad = actividadCliente.GetActividadById(id)
	var actividadDto dto.ActividadDto

	if actividad.Id == 0 {
		return actividadDto, e.NewBadRequestApiError("actividad not found")
	}

	actividadDto.Nombre = actividad.Nombre
	actividadDto.Id = actividad.Id
	actividadDto.Descripcion = actividad.Descripcion
	actividadDto.Cupo = actividad.Cupo
	actividadDto.CategoriaDescripcion = actividad.Categoria.Nombre
	actividadDto.CategoriaId = actividad.Categoria.Id
	actividadDto.UsuarioNombre = actividad.Usuario.Nombre
	actividadDto.UsuarioId = actividad.Usuario.Id

	return actividadDto, nil
}
func (s *actividadService) PutActividadById(id int, reemplazo dto.ActividadDto) (dto.ActividadDto, e.ApiError) {

	var actividad model.Actividad = actividadCliente.GetActividadById(id)
	var actividadDto dto.ActividadDto

	if actividad.Id == 0 {
		return actividadDto, e.NewBadRequestApiError("actividad not found")
	}
	if reemplazo.Nombre != "" {
		actividad.Nombre = reemplazo.Nombre
	}

	if reemplazo.Descripcion != "" {
		actividad.Descripcion = reemplazo.Descripcion
	}

	if reemplazo.Cupo != 0 {
		actividad.Cupo = reemplazo.Cupo
	}

	if reemplazo.CategoriaId != 0 {
		actividad.CategoriaId = reemplazo.CategoriaId
		actividad.Categoria = categoriaCliente.GetCategoriaById(reemplazo.CategoriaId) // TEST
	}

	if reemplazo.UsuarioId != 0 {
		actividad.UsuarioId = reemplazo.UsuarioId
		actividad.Usuario = usuarioClient.GetUsuarioById(reemplazo.UsuarioId) // TEST
	}

	actividad = actividadCliente.SaveActividad(actividad)

	actividadDto.Nombre = actividad.Nombre
	actividadDto.Id = actividad.Id
	actividadDto.Descripcion = actividad.Descripcion
	actividadDto.Cupo = actividad.Cupo
	actividadDto.CategoriaDescripcion = actividad.Categoria.Nombre
	actividadDto.CategoriaId = actividad.Categoria.Id

	return actividadDto, nil
}

func (s *actividadService) InsertActividad(actividadDto dto.ActividadDto) (dto.ActividadDto, e.ApiError) {

	var actividad model.Actividad

	actividad.Nombre = actividadDto.Nombre
	actividad.Descripcion = actividadDto.Descripcion
	actividad.Cupo = actividadDto.Cupo
	actividad.Horario = actividadDto.Horario

	var categoria model.Categoria = categoriaCliente.GetCategoriaById(actividadDto.CategoriaId)
	actividad.Categoria = categoria
	actividadDto.CategoriaDescripcion = categoria.Nombre
	var usuario model.Usuario = usuarioClient.GetUsuarioById(actividadDto.UsuarioId)
	actividad.Usuario = usuario
	actividadDto.UsuarioNombre = usuario.Nombre

	actividad = actividadCliente.InsertActividad(actividad)

	actividadDto.Id = actividad.Id

	return actividadDto, nil
}
