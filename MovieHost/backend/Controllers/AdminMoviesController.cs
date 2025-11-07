using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHost.Data;
using MovieHost.DTOs;
using MovieHost.Models;
using MovieHost.Services;

namespace MovieHost.Controllers;

[ApiController]
[Route("api/admin/movies")]
[AdminAuthorize]
public class AdminMoviesController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminMoviesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id:guid}", Name = "GetAdminMovieById")]
    public async Task<ActionResult<Movie>> GetMovieAdminAsync(Guid id)
    {
        var movie = await _context.Movies
            .Include(m => m.MovieGenres)
            .ThenInclude(mg => mg.Genre)
            .Include(m => m.Sources)
            .FirstOrDefaultAsync(m => m.Id == id);

        return movie is null ? NotFound() : Ok(movie);
    }

    [HttpPost]
    public async Task<ActionResult<Movie>> CreateMovieAsync([FromBody] CreateMovieRequest request)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var movie = new Movie
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Year = request.Year,
            Description = request.Description,
            PosterUrl = request.PosterUrl,
            Country = request.Country,
            DurationMinutes = request.DurationMinutes,
            CreatedAt = DateTime.UtcNow
        };

        await SetGenresAsync(movie, request.Genres);
        await _context.Movies.AddAsync(movie);
        await _context.SaveChangesAsync();

        return CreatedAtRoute("GetAdminMovieById", new { id = movie.Id }, movie);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateMovieAsync(Guid id, [FromBody] UpdateMovieRequest request)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var movie = await _context.Movies
            .Include(m => m.MovieGenres)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (movie is null) return NotFound();

        movie.Title = request.Title;
        movie.Year = request.Year;
        movie.Description = request.Description;
        movie.PosterUrl = request.PosterUrl;
        movie.Country = request.Country;
        movie.DurationMinutes = request.DurationMinutes;

        await SetGenresAsync(movie, request.Genres);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteMovieAsync(Guid id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie is null) return NotFound();

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("{id:guid}/sources")]
    public async Task<ActionResult<MovieSource>> AddSourceAsync(Guid id, [FromBody] CreateSourceRequest request)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var movie = await _context.Movies.FindAsync(id);
        if (movie is null) return NotFound();

        var source = new MovieSource
        {
            Id = Guid.NewGuid(),
            MovieId = id,
            Kind = request.Kind,
            Label = request.Label,
            Url = request.Url,
            SortOrder = request.SortOrder
        };

        await _context.MovieSources.AddAsync(source);
        await _context.SaveChangesAsync();

        return CreatedAtRoute("GetAdminMovieById", new { id }, source);
    }

    private async Task SetGenresAsync(Movie movie, IEnumerable<int> genreIds)
    {
        var ids = genreIds.Distinct().ToList();
        _context.MovieGenres.RemoveRange(movie.MovieGenres);
        movie.MovieGenres.Clear();

        var genres = await _context.Genres.Where(g => ids.Contains(g.Id)).ToListAsync();
        foreach (var genre in genres)
        {
            movie.MovieGenres.Add(new MovieGenre { MovieId = movie.Id, GenreId = genre.Id });
        }
    }
}
