using BackEnd.DTOs.Relatorios;

namespace BackEnd.Services.Interfaces;

public interface IRelatorioService
{
    Task<IEnumerable<RelatorioPessoaDto>> RelatorioPorPessoaAsync();
    Task<IEnumerable<RelatorioCategoriaDto>> RelatorioPorCategoriaAsync();
}
