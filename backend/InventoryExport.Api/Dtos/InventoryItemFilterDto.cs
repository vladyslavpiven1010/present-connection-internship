using InventoryExport.Api.Entities;

namespace InventoryExport.Api.Dtos;

public sealed class InventoryItemFilterDto
{
    public InventoryItemType? Type { get; init; }

    public string? Comment { get; init; }

    public Guid? UserId { get; init; }
}
