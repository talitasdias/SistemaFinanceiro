namespace BackEnd.DTOs.Relatorios;

public class RelatorioCategoriaDto
{
    public int CategoriaId { get; set; }
    public string CategoriaDescricao { get; set; } = null!;
    public string Finalidade { get; set; } = null!;
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo => TotalReceitas - TotalDespesas;
}

