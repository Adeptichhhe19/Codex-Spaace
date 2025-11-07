using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using MovieHost.Data;
using MovieHost.Services;
using MovieHost.Services.Logging;

var builder = WebApplication.CreateBuilder(args);

// Конфиг
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

// Логирование
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddProvider(new FileLoggerProvider(Path.Combine(AppContext.BaseDirectory, "Logs", "app.log")));

// MVC + JSON (чинит циклы сериализации)
builder.Services.AddControllers()
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        o.JsonSerializerOptions.WriteIndented = true;
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
    if (File.Exists(xmlPath)) options.IncludeXmlComments(xmlPath);
});

// БД
var dbPath = Path.Combine(builder.Environment.ContentRootPath, "app.db");
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite($"Data Source={dbPath}"));

// Сервисы
builder.Services.AddScoped<MovieService>();
builder.Services.AddScoped<VoteService>();
builder.Services.AddScoped<SeedService>();
builder.Services.AddScoped<AdminTokenValidator>();

// CORS
builder.Services.AddCors(o =>
{
    o.AddPolicy("frontend", p =>
    {
        var origin = builder.Configuration.GetValue<string>("FrontendOrigin") ?? "http://localhost:5173";
        p.WithOrigins(origin).AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Миграции
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // оставляем только в дев-режиме
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("frontend");
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
