namespace InventoryExport.Api.Dtos;

public sealed record InventoryItemDto(
    Guid Id,
    string Type,
    string UniqueIdentifier,
    string? Comment,
    DateOnly PurchaseDate,
    bool IsActive,
    Guid AssignedUserId,
    string AssignedUserName,
    string AssignedUserIdentifier);
