using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MovieHost.Data;
using MovieHost.Models;

namespace MovieHost.Services;

public class VoteService
{
    private readonly AppDbContext _context;
    private readonly ILogger<VoteService> _logger;

    public VoteService(AppDbContext context, ILogger<VoteService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Vote> RegisterVoteAsync(Movie movie, string fingerprint, string ipAddress, int value, CancellationToken cancellationToken = default)
    {
        var hash = ComputeHash(fingerprint, ipAddress);
        var since = DateTime.UtcNow.AddHours(-24);

        var existing = await _context.Votes
            .Where(v => v.MovieId == movie.Id && v.FingerprintHash == hash && v.CreatedAt >= since)
            .FirstOrDefaultAsync(cancellationToken);

        if (existing != null)
        {
            if (existing.Value == value)
            {
                _logger.LogInformation("Vote ignored for movie {MovieId} with same value", movie.Id);
                return existing;
            }

            existing.Value = value;
            existing.CreatedAt = DateTime.UtcNow;
        }
        else
        {
            existing = new Vote
            {
                Id = Guid.NewGuid(),
                MovieId = movie.Id,
                Value = value,
                FingerprintHash = hash,
                CreatedAt = DateTime.UtcNow
            };
            await _context.Votes.AddAsync(existing, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);

        await UpdateAggregatesAsync(movie, cancellationToken);

        return existing;
    }

    private async Task UpdateAggregatesAsync(Movie movie, CancellationToken cancellationToken)
    {
        var votes = await _context.Votes
            .Where(v => v.MovieId == movie.Id)
            .ToListAsync(cancellationToken);

        var likes = votes.Count(v => v.Value > 0);
        var dislikes = votes.Count(v => v.Value < 0);
        movie.Score = likes - dislikes;
        movie.AvgRating = (likes + dislikes) == 0 ? 0 : Math.Round((double)likes * 5 / (likes + dislikes), 2);

        _context.Movies.Update(movie);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private static string ComputeHash(string fingerprint, string ip)
    {
        var data = Encoding.UTF8.GetBytes($"{fingerprint}:{ip}");
        var hash = SHA256.HashData(data);
        return Convert.ToHexString(hash);
    }
}
