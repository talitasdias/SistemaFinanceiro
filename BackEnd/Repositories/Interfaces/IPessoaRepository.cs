using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IPessoaRepository
{
    Task<List<Pessoa>> GetAllAsync();
    Task<Pessoa?> GetByIdAsync(int id);
    Task AddAsync(Pessoa pessoa);
    Task DeleteAsync(Pessoa pessoa);
    Task SaveChangesAsync();
}
