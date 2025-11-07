using Microsoft.Extensions.Configuration;

namespace MovieHost.Services;

public class AdminTokenValidator
{
    private readonly string _token;

    public AdminTokenValidator(IConfiguration configuration)
    {
        _token = configuration.GetValue<string>("Admin:Token") ?? string.Empty;
    }

    public bool Validate(string? provided)
    {
        if (string.IsNullOrWhiteSpace(_token))
        {
            return false;
        }

        return string.Equals(_token, provided, StringComparison.Ordinal);
    }
}
