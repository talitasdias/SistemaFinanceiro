using BackEnd.DTOs.Pessoas;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController(IPessoaService service) : ControllerBase
{
    private readonly IPessoaService _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var pessoas = await _service.GetAllAsync();
        return Ok(pessoas);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PessoaCreateDto dto)
    {
        var pessoa = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), pessoa);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
