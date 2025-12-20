using BackEnd.DTOs.Pessoas;

namespace BackEnd.Services.Interfaces;

public interface IPessoaService
{
    Task<List<PessoaResponseDto>> GetAllAsync();
    Task<PessoaResponseDto> CreateAsync(PessoaCreateDto dto);
    Task DeleteAsync(int id);
}
