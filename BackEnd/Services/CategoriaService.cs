using BackEnd.Common.Pagination;
using BackEnd.DTOs.Categorias;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services;

public class CategoriaService(ICategoriaRepository repository) : ICategoriaService
{
    private readonly ICategoriaRepository _repository = repository;

    public async Task<PagedList<CategoriaResponseDto>> GetAllAsync(PaginationParams pagination)
    {
        var query = _repository.GetAllAsync().OrderBy(p => p.Descricao);

        var pagedCategorias = await PagedList<Categoria>.CreateAsync(
            query,
            pagination.PageNumber,
            pagination.PageSize
        );

        return pagedCategorias.Map(c => new CategoriaResponseDto
        {
            Id = c.Id,
            Descricao = c.Descricao,
            Finalidade = c.Finalidade
        });
    }

    public async Task<CategoriaResponseDto> CreateAsync(CategoriaCreateDto dto)
    {
        var categoria = new Categoria
        {
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        await _repository.AddAsync(categoria);
        await _repository.SaveChangesAsync();

        return new CategoriaResponseDto
        {
            Id = categoria.Id,
            Descricao = categoria.Descricao,
            Finalidade = categoria.Finalidade
        };
    }

    public async Task DeleteAsync(int id)
    {
        var categoria = await _repository.GetByIdAsync(id);

        if (categoria == null)
            throw new Exception("Categoria não encontrada.");

        await _repository.DeleteAsync(categoria);
        await _repository.SaveChangesAsync();
    }
}
