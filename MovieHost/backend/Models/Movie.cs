using System.ComponentModel.DataAnnotations;

namespace MovieHost.Models;

public class Movie
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(256)]
    public string Title { get; set; } = string.Empty;

    public int Year { get; set; }

    [MaxLength(4096)]
    public string? Description { get; set; }

    [Url]
    public string? PosterUrl { get; set; }

    [MaxLength(128)]
    public string? Country { get; set; }

    public int? DurationMinutes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public long Views { get; set; }

    public int Score { get; set; }

    public double AvgRating { get; set; }

    public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();

    public ICollection<MovieSource> Sources { get; set; } = new List<MovieSource>();

    public ICollection<Vote> Votes { get; set; } = new List<Vote>();
}
