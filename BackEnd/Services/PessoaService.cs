using BackEnd.DTOs.Pessoas;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services;

public class PessoaService(IPessoaRepository repository) : IPessoaService
{
    private readonly IPessoaRepository _repository = repository;
    public async Task<List<PessoaResponseDto>> GetAllAsync()
    {
        var pessoas = await _repository.GetAllAsync();

        return pessoas.Select(p => new PessoaResponseDto
        {
            Id = p.Id,
            Nome = p.Nome,
            Idade = p.Idade
        }).ToList();
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
