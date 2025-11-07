using Microsoft.EntityFrameworkCore;
using MovieHost.Models;

namespace MovieHost.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Movie> Movies => Set<Movie>();
    public DbSet<Genre> Genres => Set<Genre>();
    public DbSet<MovieGenre> MovieGenres => Set<MovieGenre>();
    public DbSet<MovieSource> MovieSources => Set<MovieSource>();
    public DbSet<Vote> Votes => Set<Vote>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasMany(m => m.Sources)
                .WithOne(s => s.Movie)
                .HasForeignKey(s => s.MovieId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(m => m.Votes)
                .WithOne(v => v.Movie)
                .HasForeignKey(v => v.MovieId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<MovieGenre>(entity =>
        {
            entity.HasKey(mg => new { mg.MovieId, mg.GenreId });
            entity.HasOne(mg => mg.Movie)
                .WithMany(m => m.MovieGenres)
                .HasForeignKey(mg => mg.MovieId);
            entity.HasOne(mg => mg.Genre)
                .WithMany(g => g.MovieGenres)
                .HasForeignKey(mg => mg.GenreId);
        });

        modelBuilder.Entity<Genre>(entity =>
        {
            entity.HasIndex(g => g.Name).IsUnique();
        });

        modelBuilder.Entity<Vote>(entity =>
        {
            entity.HasIndex(v => new { v.MovieId, v.FingerprintHash });
        });
    }
}
