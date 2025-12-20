using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface ITransacaoRepository
{
    Task AddAsync(Transacao transacao);
    IQueryable<Transacao> GetAllAsync();
}
