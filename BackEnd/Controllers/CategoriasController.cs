using System.Text.Json;
using BackEnd.Common.Pagination;
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
    public async Task<IActionResult> GetAll([FromQuery] PaginationParams pagination)
    {
        var result = await _service.GetAllAsync(pagination);

        Response.Headers["X-Pagination"] =  JsonSerializer.Serialize(new
        {
            result.CurrentPage,
            result.PageSize,
            result.TotalCount,
            result.TotalPages,
            result.HasNext,
            result.HasPrevious
        });

        return Ok(result);
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
