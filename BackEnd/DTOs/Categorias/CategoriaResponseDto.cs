using BackEnd.Enums;

namespace BackEnd.DTOs.Categorias;

public class CategoriaResponseDto
{
    public int Id { get; set; }
    public string Descricao { get; set; } = null!;
    public FinalidadeCategoria Finalidade { get; set; }
}
