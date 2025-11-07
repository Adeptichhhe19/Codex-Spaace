using System.Collections.Concurrent;
using Microsoft.Extensions.Logging;

namespace MovieHost.Services.Logging;

public class FileLogger : ILogger
{
    private readonly string _path;
    private static readonly object _lock = new();

    public FileLogger(string path)
    {
        _path = path;
    }

    public IDisposable BeginScope<TState>(TState state) => NullScope.Instance;

    public bool IsEnabled(LogLevel logLevel) => logLevel >= LogLevel.Information;

    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        var message = $"{DateTimeOffset.UtcNow:u} [{logLevel}] {formatter(state, exception)}";
        if (exception != null)
        {
            message += Environment.NewLine + exception;
        }

        Directory.CreateDirectory(Path.GetDirectoryName(_path)!);

        lock (_lock)
        {
            File.AppendAllText(_path, message + Environment.NewLine);
        }
    }

    private sealed class NullScope : IDisposable
    {
        public static NullScope Instance { get; } = new();
        public void Dispose()
        {
        }
    }
}

public class FileLoggerProvider : ILoggerProvider
{
    private readonly string _path;
    private readonly ConcurrentDictionary<string, FileLogger> _loggers = new();

    public FileLoggerProvider(string path)
    {
        _path = path;
    }

    public ILogger CreateLogger(string categoryName)
    {
        return _loggers.GetOrAdd(categoryName, _ => new FileLogger(_path));
    }

    public void Dispose()
    {
        _loggers.Clear();
    }
}
