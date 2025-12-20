using BackEnd.Data;
using BackEnd.DTOs.Relatorios;
using BackEnd.Enums;
using BackEnd.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services;

public class RelatorioService(AppDbContext context) : IRelatorioService
{
    private readonly AppDbContext _context = context;

    // ===============================
    // RELATÓRIO POR PESSOA
    // ===============================
    public async Task<IEnumerable<RelatorioPessoaDto>> RelatorioPorPessoaAsync()
    {
        var relatorio = await _context.Pessoas
            .Select(p => new RelatorioPessoaDto
            {
                PessoaId = p.Id,
                PessoaNome = p.Nome,

                TotalReceitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0,

                TotalDespesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0
            })
            .ToListAsync();

        return relatorio;
    }

    // ===============================
    // RELATÓRIO POR CATEGORIA
    // ===============================
    public async Task<IEnumerable<RelatorioCategoriaDto>> RelatorioPorCategoriaAsync()
    {
        var relatorio = await _context.Categorias
            .Select(c => new RelatorioCategoriaDto
            {
                CategoriaId = c.Id,
                CategoriaDescricao = c.Descricao,
                Finalidade = c.Finalidade.ToString(),

                TotalReceitas = c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0,

                TotalDespesas = c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0
            })
            .ToListAsync();

        return relatorio;
    }

}

