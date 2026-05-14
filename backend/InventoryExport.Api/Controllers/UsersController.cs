using InventoryExport.Api.Dtos;
using InventoryExport.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryExport.Api.Controllers;

[ApiController]
[Route("api/users")]
public sealed class UsersController(IUsersService usersService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] UsersQueryDto query,
        CancellationToken cancellationToken)
    {
        var users = await usersService.GetAllAsync(query, cancellationToken);
        return Ok(users);
    }
}
