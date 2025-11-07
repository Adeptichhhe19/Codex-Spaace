using System.ComponentModel.DataAnnotations;

namespace MovieHost.Models;

public enum SourceKind
{
    Hls = 0,
    Mp4 = 1,
    Embed = 2
}

public class MovieSource
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid MovieId { get; set; }

    public Movie Movie { get; set; } = default!;

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
