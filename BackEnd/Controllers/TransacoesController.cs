using System.Text.Json;
using BackEnd.Common.Pagination;
using BackEnd.DTOs.Transacoes;
using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]
[Route("api/transacoes")]
public class TransacoesController : ControllerBase
{
    private readonly ITransacaoService _service;

    public TransacoesController(ITransacaoService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TransacaoCreateDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromBody] PaginationParams pagination)
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
}
