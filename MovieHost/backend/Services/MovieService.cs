using Microsoft.EntityFrameworkCore;
using MovieHost.Data;
using MovieHost.DTOs;
using MovieHost.Models;

namespace MovieHost.Services;

public class MovieService
{
    private readonly AppDbContext _context;

    public MovieService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<MovieSummaryDto>> GetMoviesAsync(MovieQueryParameters parameters, CancellationToken cancellationToken = default)
    {
        var query = _context.Movies.AsQueryable();

        if (!string.IsNullOrWhiteSpace(parameters.Q))
        {
            var term = parameters.Q.Trim();
            query = query.Where(m => EF.Functions.Like(m.Title, $"%{term}%"));
        }

        if (parameters.Year.HasValue)
        {
            query = query.Where(m => m.Year == parameters.Year.Value);
        }

        if (parameters.Genre.HasValue)
        {
            query = query.Where(m => m.MovieGenres.Any(g => g.GenreId == parameters.Genre.Value));
        }

        query = parameters.Sort switch
        {
            "rating" => query.OrderByDescending(m => m.AvgRating),
            "date" => query.OrderByDescending(m => m.CreatedAt),
            _ => query.OrderByDescending(m => m.Score)
        };

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .Skip((parameters.Page - 1) * parameters.PageSize)
            .Take(parameters.PageSize)
            .Select(m => new MovieSummaryDto(m.Id, m.Title, m.Year, m.PosterUrl, m.Score, m.AvgRating))
            .ToListAsync(cancellationToken);

        return new PagedResult<MovieSummaryDto>(items, total, parameters.Page, parameters.PageSize);
    }

    public async Task<Movie?> GetMovieAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Movies
            .Include(m => m.Sources)
            .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre)
            .FirstOrDefaultAsync(m => m.Id == id, cancellationToken);
    }

    public async Task<MovieDetailDto?> GetMovieDetailAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var movie = await GetMovieAsync(id, cancellationToken);
        if (movie == null)
        {
            return null;
        }

        return new MovieDetailDto(
            movie.Id,
            movie.Title,
            movie.Year,
            movie.PosterUrl,
            movie.Description,
            movie.Country,
            movie.DurationMinutes,
            movie.Views,
            movie.Score,
            movie.AvgRating,
            movie.MovieGenres.Select(g => g.Genre.Name).ToList(),
            movie.Sources
                .OrderBy(s => s.SortOrder)
                .Select(s => new MovieSourceDto(s.Id, s.Kind, s.Label, s.Url, s.SortOrder))
                .ToList()
        );
    }

    public async Task IncrementViewsAsync(Movie movie, CancellationToken cancellationToken = default)
    {
        movie.Views++;
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<HighlightsDto> GetHighlightsAsync(CancellationToken cancellationToken = default)
    {
        var hits = await _context.Movies
            .OrderByDescending(m => m.Score)
            .Take(6)
            .Select(m => new MovieSummaryDto(m.Id, m.Title, m.Year, m.PosterUrl, m.Score, m.AvgRating))
            .ToListAsync(cancellationToken);

        var newest = await _context.Movies
            .OrderByDescending(m => m.CreatedAt)
            .Take(6)
            .Select(m => new MovieSummaryDto(m.Id, m.Title, m.Year, m.PosterUrl, m.Score, m.AvgRating))
            .ToListAsync(cancellationToken);

        return new HighlightsDto(hits, newest);
    }
}
