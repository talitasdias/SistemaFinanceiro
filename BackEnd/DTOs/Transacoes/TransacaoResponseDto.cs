using BackEnd.Enums;

namespace BackEnd.DTOs.Transacoes;

public class TransacaoResponseDto
{
    public int Id { get; set; }
    public string Descricao { get; set; } = null!;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }

    public int CategoriaId { get; set; }
    public string CategoriaDescricao { get; set; } = null!;

    public int PessoaId { get; set; }
    public string PessoaNome { get; set; } = null!;
}
