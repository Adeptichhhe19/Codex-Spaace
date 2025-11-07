using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MovieHost.Data
{
    public class DesignTimeFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            // dotnet ef запускается из папки backend => CurrentDirectory указывает на неё
            var basePath = Directory.GetCurrentDirectory();
            var dbPath = Path.Combine(basePath, "app.db");

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite($"Data Source={dbPath}")
                .Options;

            return new AppDbContext(options);
        }
    }
}
