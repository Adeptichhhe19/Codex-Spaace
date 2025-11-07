using System.ComponentModel.DataAnnotations;
using MovieHost.Models;

namespace MovieHost.DTOs;

public record MovieSummaryDto(
    Guid Id,
    string Title,
    int Year,
    string? PosterUrl,
    int Score,
    double AvgRating
);

public record MovieDetailDto(
    Guid Id,
    string Title,
    int Year,
    string? PosterUrl,
    string? Description,
    string? Country,
    int? DurationMinutes,
    long Views,
    int Score,
    double AvgRating,
    IReadOnlyCollection<string> Genres,
    IReadOnlyCollection<MovieSourceDto> Sources
);

public record MovieSourceDto(
    Guid Id,
    SourceKind Kind,
    string Label,
    string Url,
    int SortOrder
);

public class MovieQueryParameters
{
    public string? Q { get; set; }
    public int? Year { get; set; }
    public int? Genre { get; set; }
    public string? Sort { get; set; }
    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;
    [Range(1, 100)]
    public int PageSize { get; set; } = 12;
}

public class CreateMovieRequest
{
    [Required]
    [MaxLength(256)]
    public string Title { get; set; } = string.Empty;

    [Range(1900, 2100)]
    public int Year { get; set; }

    [MaxLength(4096)]
    public string? Description { get; set; }

    [Url]
    public string? PosterUrl { get; set; }

    [MaxLength(128)]
    public string? Country { get; set; }

    [Range(1, 1000)]
    public int? DurationMinutes { get; set; }

    public List<int> Genres { get; set; } = new();
}

public class UpdateMovieRequest : CreateMovieRequest
{
}

public class CreateSourceRequest
{
    [Required]
    public SourceKind Kind { get; set; }

    [Required]
    [MaxLength(64)]
    public string Label { get; set; } = string.Empty;

    [Required]
    [MaxLength(1024)]
    public string Url { get; set; } = string.Empty;

    public int SortOrder { get; set; }
}

public class UpdateSourceRequest : CreateSourceRequest
{
}

public class VoteRequest
{
    [Required]
    [RegularExpression(@"^[A-Za-z0-9_-]{8,128}$")]
    public string Fingerprint { get; set; } = string.Empty;

    [Required]
    [Range(-1, 1)]
    public int Value { get; set; }
}

public record PagedResult<T>(IReadOnlyCollection<T> Items, int Total, int Page, int PageSize);

public record HighlightsDto(
    IReadOnlyCollection<MovieSummaryDto> Hits,
    IReadOnlyCollection<MovieSummaryDto> Newest
);
