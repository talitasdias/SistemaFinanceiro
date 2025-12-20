using BackEnd.Enums;

namespace BackEnd.DTOs.Categorias;

public class CategoriaCreateDto
{
    public string Descricao { get; set; } = null!;
    public FinalidadeCategoria Finalidade { get; set; }
}
