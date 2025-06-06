package services

import (
	actividadCliente "Proyecto-gym/clients/actividad"
	categoriaCliente "Proyecto-gym/clients/categoria"

	"Proyecto-gym/dto"
	"Proyecto-gym/model"
	e "Proyecto-gym/utils"
)

type actividadService struct{}

type actividadServiceInterface interface {
	GetActividadById(id int) (dto.ActividadDto, e.ApiError)
	InsertActividad(actividadDto dto.ActividadDto) (dto.ActividadDto, e.ApiError)
}

var (
	ActividadService actividadServiceInterface
)

func init() {
	ActividadService = &actividadService{}
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

	return actividadDto, nil
}

func (s *actividadService) InsertActividad(actividadDto dto.ActividadDto) (dto.ActividadDto, e.ApiError) {

	var actividad model.Actividad
	var categoria model.Categoria
	actividad.Nombre = actividadDto.Nombre
	actividad.Descripcion = actividadDto.Descripcion
	actividad.Cupo = actividadDto.Cupo

	categoria = categoriaCliente.GetCategoriaById(actividadDto.CategoriaId)

	actividad.Categoria = categoria
	actividad.CategoriaId = categoria.Id

	actividad = actividadCliente.InsertActividad(actividad)

	actividadDto.Id = actividad.Id

	return actividadDto, nil
}
