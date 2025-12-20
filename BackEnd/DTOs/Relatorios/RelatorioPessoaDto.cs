namespace BackEnd.DTOs.Relatorios;

public class RelatorioPessoaDto
{
    public int PessoaId { get; set; }
    public string PessoaNome { get; set; } = null!;
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo => TotalReceitas - TotalDespesas;
}
