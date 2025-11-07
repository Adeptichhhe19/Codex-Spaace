using Microsoft.AspNetCore.Mvc;
using MovieHost.Services;

namespace MovieHost.Controllers;

[ApiController]
[Route("api/admin/seed")]
[AdminAuthorize]
public class AdminSeedController : ControllerBase
{
    private readonly SeedService _seed;

    public AdminSeedController(SeedService seed)
    {
        _seed = seed;
    }

    [HttpPost]
    public async Task<IActionResult> SeedAsync()
    {
        await _seed.SeedAsync(HttpContext.RequestAborted);
        return Ok(new { Message = "Seed completed" });
    }
}
