namespace MovieHost.Models;

public class MovieGenre
{
    public Guid MovieId { get; set; }
    public Movie Movie { get; set; } = default!;

    public int GenreId { get; set; }
    public Genre Genre { get; set; } = default!;
}
