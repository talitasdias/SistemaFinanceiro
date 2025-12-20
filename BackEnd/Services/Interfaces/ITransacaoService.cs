using BackEnd.Common.Pagination;
using BackEnd.DTOs.Transacoes;

namespace BackEnd.Services.Interfaces;

public interface ITransacaoService
{
    Task<TransacaoResponseDto> CreateAsync(TransacaoCreateDto dto);
    Task<PagedList<TransacaoResponseDto>> GetAllAsync(PaginationParams pagination);
}
