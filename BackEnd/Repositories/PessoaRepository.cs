using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories;

public class PessoaRepository(AppDbContext context) : IPessoaRepository
{
    private readonly AppDbContext _context = context;
    public async Task<List<Pessoa>> GetAllAsync()
    {
        return await _context.Pessoas.AsNoTracking().ToListAsync();
    }

     public async Task<Pessoa?> GetByIdAsync(int id)
    {
        return await _context.Pessoas
            .Include(p => p.Transacoes)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddAsync(Pessoa pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);
    }

    public async Task DeleteAsync(Pessoa pessoa)
    {
        _context.Pessoas.Remove(pessoa);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
