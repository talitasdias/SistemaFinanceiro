using BackEnd.DTOs.Transacoes;
using BackEnd.Enums;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using BackEnd.Services.Interfaces;

namespace BackEnd.Services;

public class TransacaoService : ITransacaoService
{
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;

    public TransacaoService(
        ITransacaoRepository transacaoRepository,
        IPessoaRepository pessoaRepository,
        ICategoriaRepository categoriaRepository)
    {
        _transacaoRepository = transacaoRepository;
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
    }

    public async Task<TransacaoResponseDto> CreateAsync(TransacaoCreateDto dto)
    {
        if (dto.Valor <= 0)
            throw new ArgumentException("O valor da transação deve ser maior que zero.");

        var pessoa = await _pessoaRepository.GetByIdAsync(dto.PessoaId)
            ?? throw new ArgumentException("Pessoa não encontrada.");

        var categoria = await _categoriaRepository.GetByIdAsync(dto.CategoriaId)
            ?? throw new ArgumentException("Categoria não encontrada.");

        // Regra: menor de idade não pode ter receita
        if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
            throw new ArgumentException("Pessoa menor de idade não pode ter receita.");

        // Regra: categoria compatível com o tipo
        if (categoria.Finalidade != Enums.FinalidadeCategoria.Ambas &&
            (int)categoria.Finalidade != (int)dto.Tipo)
        {
            throw new ArgumentException("Categoria incompatível com o tipo da transação.");
        }

        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId,
            CategoriaId = dto.CategoriaId
        };

        await _transacaoRepository.AddAsync(transacao);

        return new TransacaoResponseDto
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Tipo = transacao.Tipo,
            PessoaId = pessoa.Id,
            PessoaNome = pessoa.Nome,
            CategoriaId = categoria.Id,
            CategoriaDescricao = categoria.Descricao
        };
    }

    public async Task<List<TransacaoResponseDto>> GetAllAsync()
    {
        var transacoes = await _transacaoRepository.GetAllAsync();

        return transacoes.Select(t => new TransacaoResponseDto
        {
            Id = t.Id,
            Descricao = t.Descricao,
            Valor = t.Valor,
            Tipo = t.Tipo,
            PessoaId = t.PessoaId,
            PessoaNome = t.Pessoa.Nome,
            CategoriaId = t.CategoriaId,
            CategoriaDescricao = t.Categoria.Descricao
        }).ToList();
    }
}
