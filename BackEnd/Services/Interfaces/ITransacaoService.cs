using BackEnd.DTOs.Transacoes;

namespace BackEnd.Services.Interfaces;

public interface ITransacaoService
{
    Task<TransacaoResponseDto> CreateAsync(TransacaoCreateDto dto);
    Task<List<TransacaoResponseDto>> GetAllAsync();
}
