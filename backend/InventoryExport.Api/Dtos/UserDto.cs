namespace InventoryExport.Api.Dtos;

public sealed record UserDto(
    Guid Id,
    string FirstName,
    string LastName,
    string UniqueIdentifier);
