using BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]
[Route("api/relatorios")]
public class RelatoriosController(IRelatorioService service) : ControllerBase
{
    private readonly IRelatorioService _service = service;

    [HttpGet("pessoas")]
    public async Task<IActionResult> RelatorioPorPessoa()
    {
        var resultado = await _service.RelatorioPorPessoaAsync();
        return Ok(resultado);
    }

    [HttpGet("categorias")]
    public async Task<IActionResult> RelatorioPorCategoria()
    {
        var resultado = await _service.RelatorioPorCategoriaAsync();
        return Ok(resultado);
    }
}
