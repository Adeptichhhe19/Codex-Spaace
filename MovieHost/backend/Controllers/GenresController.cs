using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHost.Data;
using MovieHost.Models;

namespace MovieHost.Controllers;

[ApiController]
[Route("api/genres")]
public class GenresController : ControllerBase
{
    private readonly AppDbContext _context;

    public GenresController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Genre>>> GetGenresAsync()
    {
        var genres = await _context.Genres
            .OrderBy(g => g.Name)
            .ToListAsync(HttpContext.RequestAborted);
        return Ok(genres);
    }
}
