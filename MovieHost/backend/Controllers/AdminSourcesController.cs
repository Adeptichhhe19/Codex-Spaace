using Microsoft.AspNetCore.Mvc;
using MovieHost.Data;
using MovieHost.DTOs;
using MovieHost.Models;
using MovieHost.Services;

namespace MovieHost.Controllers;

[ApiController]
[Route("api/admin/sources")]
[AdminAuthorize]
public class AdminSourcesController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminSourcesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateSourceAsync(Guid id, [FromBody] UpdateSourceRequest request)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var source = await _context.MovieSources.FindAsync(id);
        if (source == null)
        {
            return NotFound();
        }

        source.Kind = request.Kind;
        source.Label = request.Label;
        source.Url = request.Url;
        source.SortOrder = request.SortOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteSourceAsync(Guid id)
    {
        var source = await _context.MovieSources.FindAsync(id);
        if (source == null)
        {
            return NotFound();
        }

        _context.MovieSources.Remove(source);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
