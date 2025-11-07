using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieHost.Data;
using MovieHost.DTOs;
using MovieHost.Models;
using MovieHost.Services;

namespace MovieHost.Controllers;

[ApiController]
[Route("api/movies")]
public class MoviesController : ControllerBase
{
    private readonly MovieService _movies;
    private readonly VoteService _votes;
    private readonly AppDbContext _context;
    private readonly ILogger<MoviesController> _logger;

    public MoviesController(MovieService movies, VoteService votes, AppDbContext context, ILogger<MoviesController> logger)
    {
        _movies = movies;
        _votes = votes;
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<MovieSummaryDto>>> GetMoviesAsync([FromQuery] MovieQueryParameters parameters)
    {
        var result = await _movies.GetMoviesAsync(parameters, HttpContext.RequestAborted);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<MovieDetailDto>> GetMovieAsync(Guid id)
    {
        var movie = await _movies.GetMovieDetailAsync(id, HttpContext.RequestAborted);
        if (movie == null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    [HttpPost("{id:guid}/view")]
    public async Task<IActionResult> RegisterViewAsync(Guid id)
    {
        var movie = await _movies.GetMovieAsync(id, HttpContext.RequestAborted);
        if (movie == null)
        {
            return NotFound();
        }

        await _movies.IncrementViewsAsync(movie, HttpContext.RequestAborted);
        return Accepted();
    }

    [HttpPost("{id:guid}/vote")]
    public async Task<IActionResult> VoteAsync(Guid id, [FromBody] VoteRequest request)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var movie = await _movies.GetMovieAsync(id, HttpContext.RequestAborted);
        if (movie == null)
        {
            return NotFound();
        }

        var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        await _votes.RegisterVoteAsync(movie, request.Fingerprint, ip, request.Value, HttpContext.RequestAborted);
        return Ok(new { movie.Score, movie.AvgRating });
    }
}
