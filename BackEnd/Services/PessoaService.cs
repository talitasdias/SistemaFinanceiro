using BackEnd.Common.Pagination;
using BackEnd.DTOs.Pessoas;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services;

public class PessoaService(IPessoaRepository repository) : IPessoaService
{
    private readonly IPessoaRepository _repository = repository;
    public async Task<PagedList<PessoaResponseDto>> GetAllAsync(PaginationParams pagination)
    {
        var query = _repository.GetAllAsync().OrderBy(p => p.Nome);

        var pagedPessoas = await PagedList<Pessoa>.CreateAsync(
            query,
            pagination.PageNumber,
            pagination.PageSize
        );

        return pagedPessoas.Map(p => new PessoaResponseDto
        {
            Id = p.Id,
            Nome = p.Nome,
            Idade = p.Idade
        });
    }

    public async Task<PessoaResponseDto> CreateAsync(PessoaCreateDto dto)
    {
        var pessoa = new Pessoa
        {
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        await _repository.AddAsync(pessoa);
        await _repository.SaveChangesAsync();

        return new PessoaResponseDto
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade
        };
    }

    public async Task DeleteAsync(int id)
    {
        var pessoa = await _repository.GetByIdAsync(id);

        if (pessoa == null)
            throw new Exception("Pessoa não encontrada.");

        await _repository.DeleteAsync(pessoa);
        await _repository.SaveChangesAsync();
    }
}
