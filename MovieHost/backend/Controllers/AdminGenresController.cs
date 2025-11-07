using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHost.Data;
using MovieHost.Models;
using MovieHost.Services;

namespace MovieHost.Controllers;

[ApiController]
[Route("api/admin/genres")]
[AdminAuthorize]
public class AdminGenresController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminGenresController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id:int}", Name = "GetAdminGenreById")]
    public async Task<ActionResult<Genre>> GetGenreByIdAsync(int id)
    {
        var genre = await _context.Genres.FindAsync(id);
        return genre is null ? NotFound() : Ok(genre);
    }

    [HttpPost]
    public async Task<ActionResult<Genre>> CreateGenreAsync([FromBody] Genre genre)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (await _context.Genres.AnyAsync(g => g.Name == genre.Name))
        {
            return Conflict(new ProblemDetails
            {
                Title = "Genre exists",
                Detail = "Жанр с таким именем уже существует",
                Status = StatusCodes.Status409Conflict
            });
        }

        await _context.Genres.AddAsync(genre);
        await _context.SaveChangesAsync();

        return CreatedAtRoute(
            routeName: "GetAdminGenreById",
            routeValues: new { id = genre.Id },
            value: genre
        );
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteGenreAsync(int id)
    {
        var genre = await _context.Genres.FindAsync(id);
        if (genre is null) return NotFound();

        _context.Genres.Remove(genre);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
