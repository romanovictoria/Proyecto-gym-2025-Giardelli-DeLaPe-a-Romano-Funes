package services

import (
	categoriaCliente "Proyecto-gym/clients/categoria"
	"Proyecto-gym/dto"
	"Proyecto-gym/model"
	e "Proyecto-gym/utils"
)

type categoriaService struct{}

type categoriaServiceInterface interface {
	GetCategoriaById(id int) (dto.CategoriaDto, e.ApiError)
	GetCategorias() ([]dto.CategoriaDto, e.ApiError)
	InsertCategoria(categoriaService dto.CategoriaDto) (dto.CategoriaDto, e.ApiError)
}

var (
	CategoriaService categoriaServiceInterface
)

func init() {
	CategoriaService = &categoriaService{}
}

func (s *categoriaService) GetCategoriaById(id int) (dto.CategoriaDto, e.ApiError) {
	var categoria model.Categoria = categoriaCliente.GetCategoriaById(id)
	var categoriaDto dto.CategoriaDto

	if categoria.Id == 0 {
		return categoriaDto, e.NewBadRequestApiError("categoria not found")
	}

	categoriaDto.Id = categoria.Id
	categoriaDto.Nombre = categoria.Nombre

	return categoriaDto, nil
}

func (s *categoriaService) GetCategorias() ([]dto.CategoriaDto, e.ApiError) {
	categorias := categoriaCliente.GetCategorias()
	var categoriasDto []dto.CategoriaDto

	for _, cat := range categorias {
		categoriasDto = append(categoriasDto, dto.CategoriaDto{
			Id:     cat.Id,
			Nombre: cat.Nombre,
		})
	}

	return categoriasDto, nil
}

func (s *categoriaService) InsertCategoria(categoriaDto dto.CategoriaDto) (dto.CategoriaDto, e.ApiError) {

	var categoria model.Categoria
	categoria.Nombre = categoriaDto.Nombre

	categoria = categoriaCliente.InsertarCategoria(categoria)

	categoriaDto.Id = categoria.Id

	return categoriaDto, nil
}
