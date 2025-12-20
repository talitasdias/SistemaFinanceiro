using BackEnd.Enums;

namespace BackEnd.DTOs.Transacoes;

public class TransacaoCreateDto
{
    public string Descricao { get; set; } = null!;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public int CategoriaId { get; set; }
    public int PessoaId { get; set; }
}
