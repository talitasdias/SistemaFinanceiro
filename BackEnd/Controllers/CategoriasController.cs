using BackEnd.DTOs.Categorias;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController(ICategoriaService service) : ControllerBase
{
    private readonly ICategoriaService _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categorias = await _service.GetAllAsync();
        return Ok(categorias);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CategoriaCreateDto dto)
    {
        var categoria = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), categoria);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
