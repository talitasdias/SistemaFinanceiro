using BackEnd.Models;

namespace BackEnd.Repositories.Interfaces;
public interface ICategoriaRepository
{
    IQueryable<Categoria> GetAllAsync();
    Task<Categoria?> GetByIdAsync(int id);
    Task AddAsync(Categoria categoria);
    Task DeleteAsync(Categoria categoria);
    Task SaveChangesAsync();
}
