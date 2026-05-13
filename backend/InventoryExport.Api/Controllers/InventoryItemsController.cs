using InventoryExport.Api.Dtos;
using InventoryExport.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryExport.Api.Controllers;

[ApiController]
[Route("api/inventory-items")]
public sealed class InventoryItemsController(IInventoryService inventoryService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] InventoryItemFilterDto filter,
        CancellationToken cancellationToken)
    {
        var items = await inventoryService.GetItemsAsync(
            filter,
            includeInactive: true,
            cancellationToken);

        return Ok(items);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> SoftDelete(Guid id, CancellationToken cancellationToken)
    {
        var wasDeleted = await inventoryService.SoftDeleteAsync(id, cancellationToken);
        return wasDeleted ? NoContent() : NotFound();
    }
}
