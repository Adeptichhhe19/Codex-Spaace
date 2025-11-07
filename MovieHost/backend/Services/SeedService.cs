using Microsoft.EntityFrameworkCore;
using MovieHost.Data;
using MovieHost.Models;

namespace MovieHost.Services;

public class SeedService
{
    private readonly AppDbContext _context;
    private readonly ILogger<SeedService> _logger;

    public SeedService(AppDbContext context, ILogger<SeedService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        if (await _context.Movies.AnyAsync(cancellationToken))
        {
            _logger.LogInformation("Seed skipped: movies already exist");
            return;
        }

        var genres = new[]
        {
            new Genre { Name = "Драма" },
            new Genre { Name = "Фантастика" },
            new Genre { Name = "Боевик" },
            new Genre { Name = "Комедия" }
        };

        await _context.Genres.AddRangeAsync(genres, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var movie1 = new Movie
        {
            Id = Guid.NewGuid(),
            Title = "Космический поход",
            Year = 2023,
            Description = "Команда исследователей отправляется на дальнюю планету.",
            PosterUrl = "https://via.placeholder.com/300x450.png?text=Space",
            Country = "США",
            DurationMinutes = 120,
            CreatedAt = DateTime.UtcNow.AddDays(-10)
        };

        var movie2 = new Movie
        {
            Id = Guid.NewGuid(),
            Title = "Город огней",
            Year = 2024,
            Description = "Динамичный боевик о спасении мегаполиса.",
            PosterUrl = "https://via.placeholder.com/300x450.png?text=City",
            Country = "Великобритания",
            DurationMinutes = 110,
            CreatedAt = DateTime.UtcNow.AddDays(-3)
        };

        await _context.Movies.AddRangeAsync(new[] { movie1, movie2 }, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        await _context.MovieGenres.AddRangeAsync(new[]
        {
            new MovieGenre { MovieId = movie1.Id, GenreId = genres[1].Id },
            new MovieGenre { MovieId = movie1.Id, GenreId = genres[0].Id },
            new MovieGenre { MovieId = movie2.Id, GenreId = genres[2].Id }
        }, cancellationToken);

        await _context.MovieSources.AddRangeAsync(new[]
        {
            new MovieSource
            {
                Id = Guid.NewGuid(),
                MovieId = movie1.Id,
                Kind = SourceKind.Hls,
                Label = "1080p HLS",
                Url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
                SortOrder = 1
            },
            new MovieSource
            {
                Id = Guid.NewGuid(),
                MovieId = movie1.Id,
                Kind = SourceKind.Mp4,
                Label = "MP4 720p",
                Url = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                SortOrder = 2
            },
            new MovieSource
            {
                Id = Guid.NewGuid(),
                MovieId = movie2.Id,
                Kind = SourceKind.Hls,
                Label = "Full HD",
                Url = "https://test-streams.mux.dev/test_001/stream.m3u8",
                SortOrder = 1
            },
            new MovieSource
            {
                Id = Guid.NewGuid(),
                MovieId = movie2.Id,
                Kind = SourceKind.Embed,
                Label = "Трейлер YouTube",
                Url = "https://www.youtube.com/embed/dQw4w9WgXcQ",
                SortOrder = 2
            }
        }, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Seed data created");
    }
}
