namespace InventoryExport.Api.Entities;

public sealed class InventoryItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public InventoryItemType Type { get; set; }

    public required string UniqueIdentifier { get; set; }

    public string? Comment { get; set; }

    public DateOnly PurchaseDate { get; set; }

    public bool IsActive { get; set; } = true;

    public Guid AssignedUserId { get; set; }

    public AppUser? AssignedUser { get; set; }
}
