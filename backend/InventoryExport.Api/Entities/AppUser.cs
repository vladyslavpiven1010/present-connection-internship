namespace InventoryExport.Api.Entities;

public sealed class AppUser
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string UniqueIdentifier { get; set; }

    public List<InventoryItem> InventoryItems { get; set; } = [];
}
