using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories;

public class CategoriaRepository(AppDbContext context) : ICategoriaRepository
{
    private readonly AppDbContext _context = context;

    public async Task<List<Categoria>> GetAllAsync()
    {
        return await _context.Categorias.AsNoTracking().ToListAsync();
    }

    public async Task<Categoria?> GetByIdAsync(int id)
    {
        return await _context.Categorias
            .Include(c => c.Transacoes)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task AddAsync(Categoria categoria)
    {
        await _context.Categorias.AddAsync(categoria);
    }

    public async Task DeleteAsync(Categoria categoria)
    {
        _context.Categorias.Remove(categoria);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
