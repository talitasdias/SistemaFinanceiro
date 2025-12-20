using BackEnd.Enums;

namespace BackEnd.Models;

public class Categoria
{
    public int Id { get; set; }
    public string Descricao { get; set; } = null!;
    public FinalidadeCategoria Finalidade { get; set; }
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}
