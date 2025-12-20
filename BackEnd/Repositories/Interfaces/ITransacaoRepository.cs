using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface ITransacaoRepository
{
    Task AddAsync(Transacao transacao);
    Task<List<Transacao>> GetAllAsync();
}
