using BackEnd.Common.Pagination;
using BackEnd.DTOs.Pessoas;

namespace BackEnd.Services.Interfaces;

public interface IPessoaService
{
    Task<PagedList<PessoaResponseDto>> GetAllAsync(PaginationParams pagination);
    Task<PessoaResponseDto> CreateAsync(PessoaCreateDto dto);
    Task DeleteAsync(int id);
}
