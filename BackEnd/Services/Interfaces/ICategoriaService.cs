using BackEnd.DTOs.Categorias;

namespace BackEnd.Services.Interfaces;

public interface ICategoriaService
{
    Task<List<CategoriaResponseDto>> GetAllAsync();
    Task<CategoriaResponseDto> CreateAsync(CategoriaCreateDto dto);
    Task DeleteAsync(int id);
}
