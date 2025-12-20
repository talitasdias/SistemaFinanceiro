using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repositories;

public class TransacaoRepository(AppDbContext context) : ITransacaoRepository
{
    private readonly AppDbContext _context = context;

    public async Task AddAsync(Transacao transacao)
    {
        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();
    }

    public IQueryable<Transacao> GetAllAsync()
    {
        return _context.Transacoes
            .Include(t => t.Categoria)
            .Include(t => t.Pessoa);
    }
}
