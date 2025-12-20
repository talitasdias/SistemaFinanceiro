using BackEnd.Common.Pagination;
using BackEnd.DTOs.Categorias;

namespace BackEnd.Services.Interfaces;

public interface ICategoriaService
{
    Task<PagedList<CategoriaResponseDto>> GetAllAsync(PaginationParams pagination);
    Task<CategoriaResponseDto> CreateAsync(CategoriaCreateDto dto);
    Task DeleteAsync(int id);
}
