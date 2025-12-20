using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;

public interface IPessoaRepository
{
    IQueryable<Pessoa> GetAllAsync();
    Task<Pessoa?> GetByIdAsync(int id);
    Task AddAsync(Pessoa pessoa);
    Task DeleteAsync(Pessoa pessoa);
    Task SaveChangesAsync();
}
