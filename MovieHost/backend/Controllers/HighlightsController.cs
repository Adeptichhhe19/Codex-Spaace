using Microsoft.AspNetCore.Mvc;
using MovieHost.DTOs;
using MovieHost.Services;

namespace MovieHost.Controllers;

[ApiController]
[Route("api/highlights")]
public class HighlightsController : ControllerBase
{
    private readonly MovieService _movies;

    public HighlightsController(MovieService movies)
    {
        _movies = movies;
    }

    [HttpGet]
    public async Task<ActionResult<HighlightsDto>> GetHighlightsAsync()
    {
        var items = await _movies.GetHighlightsAsync(HttpContext.RequestAborted);
        return Ok(items);
    }
}
