using System.ComponentModel.DataAnnotations;

namespace MovieHost.Models;

public class Vote
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid MovieId { get; set; }

    public Movie Movie { get; set; } = default!;

    [Required]
    [Range(-1, 1)]
    public int Value { get; set; }

    [Required]
    [MaxLength(128)]
    public string FingerprintHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
