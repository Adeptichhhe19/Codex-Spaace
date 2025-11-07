using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MovieHost.Data;

#nullable disable

namespace MovieHost.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.0");

            modelBuilder.Entity("MovieHost.Models.Genre", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("INTEGER");

                b.Property<string>("Name")
                    .IsRequired()
                    .HasMaxLength(64)
                    .HasColumnType("TEXT");

                b.HasKey("Id");

                b.HasIndex("Name")
                    .IsUnique();

                b.ToTable("Genres");
            });

            modelBuilder.Entity("MovieHost.Models.Movie", b =>
            {
                b.Property<Guid>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("TEXT");

                b.Property<double>("AvgRating")
                    .HasColumnType("REAL");

                b.Property<string>("Country")
                    .HasMaxLength(128)
                    .HasColumnType("TEXT");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("TEXT");

                b.Property<string>("Description")
                    .HasMaxLength(4096)
                    .HasColumnType("TEXT");

                b.Property<int?>("DurationMinutes")
                    .HasColumnType("INTEGER");

                b.Property<string>("PosterUrl")
                    .HasColumnType("TEXT");

                b.Property<int>("Score")
                    .HasColumnType("INTEGER");

                b.Property<string>("Title")
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnType("TEXT");

                b.Property<int>("Year")
                    .HasColumnType("INTEGER");

                b.Property<long>("Views")
                    .HasColumnType("INTEGER");

                b.HasKey("Id");

                b.ToTable("Movies");
            });

            modelBuilder.Entity("MovieHost.Models.MovieGenre", b =>
            {
                b.Property<Guid>("MovieId")
                    .HasColumnType("TEXT");

                b.Property<int>("GenreId")
                    .HasColumnType("INTEGER");

                b.HasKey("MovieId", "GenreId");

                b.HasIndex("GenreId");

                b.ToTable("MovieGenres");
            });

            modelBuilder.Entity("MovieHost.Models.MovieSource", b =>
            {
                b.Property<Guid>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("TEXT");

                b.Property<int>("Kind")
                    .HasColumnType("INTEGER");

                b.Property<string>("Label")
                    .IsRequired()
                    .HasMaxLength(64)
                    .HasColumnType("TEXT");

                b.Property<Guid>("MovieId")
                    .HasColumnType("TEXT");

                b.Property<int>("SortOrder")
                    .HasColumnType("INTEGER");

                b.Property<string>("Url")
                    .IsRequired()
                    .HasMaxLength(1024)
                    .HasColumnType("TEXT");

                b.HasKey("Id");

                b.HasIndex("MovieId");

                b.ToTable("MovieSources");
            });

            modelBuilder.Entity("MovieHost.Models.Vote", b =>
            {
                b.Property<Guid>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("TEXT");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("TEXT");

                b.Property<string>("FingerprintHash")
                    .IsRequired()
                    .HasMaxLength(128)
                    .HasColumnType("TEXT");

                b.Property<Guid>("MovieId")
                    .HasColumnType("TEXT");

                b.Property<int>("Value")
                    .HasColumnType("INTEGER");

                b.HasKey("Id");

                b.HasIndex("MovieId", "FingerprintHash");

                b.ToTable("Votes");
            });

            modelBuilder.Entity("MovieHost.Models.MovieGenre", b =>
            {
                b.HasOne("MovieHost.Models.Genre", "Genre")
                    .WithMany("MovieGenres")
                    .HasForeignKey("GenreId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("MovieHost.Models.Movie", "Movie")
                    .WithMany("MovieGenres")
                    .HasForeignKey("MovieId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Genre");

                b.Navigation("Movie");
            });

            modelBuilder.Entity("MovieHost.Models.MovieSource", b =>
            {
                b.HasOne("MovieHost.Models.Movie", "Movie")
                    .WithMany("Sources")
                    .HasForeignKey("MovieId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Movie");
            });

            modelBuilder.Entity("MovieHost.Models.Vote", b =>
            {
                b.HasOne("MovieHost.Models.Movie", "Movie")
                    .WithMany("Votes")
                    .HasForeignKey("MovieId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Movie");
            });

            modelBuilder.Entity("MovieHost.Models.Genre", b =>
            {
                b.Navigation("MovieGenres");
            });

            modelBuilder.Entity("MovieHost.Models.Movie", b =>
            {
                b.Navigation("MovieGenres");

                b.Navigation("Sources");

                b.Navigation("Votes");
            });
#pragma warning restore 612, 618
        }
    }
}
