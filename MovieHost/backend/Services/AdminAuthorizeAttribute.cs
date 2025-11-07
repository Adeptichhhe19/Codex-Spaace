using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MovieHost.Services;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class AdminAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var validator = context.HttpContext.RequestServices.GetRequiredService<AdminTokenValidator>();
        if (!context.HttpContext.Request.Headers.TryGetValue("X-Admin-Token", out var token) || !validator.Validate(token))
        {
            context.Result = new UnauthorizedObjectResult(new ProblemDetails
            {
                Title = "Unauthorized",
                Detail = "Invalid or missing admin token",
                Status = StatusCodes.Status401Unauthorized
            });
        }
    }
}
