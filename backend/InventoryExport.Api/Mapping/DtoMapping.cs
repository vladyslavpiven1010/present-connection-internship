using InventoryExport.Api.Dtos;
using InventoryExport.Api.Entities;

namespace InventoryExport.Api.Mapping;

public static class DtoMapping
{
    public static UserDto ToDto(this AppUser user)
    {
        return new UserDto(
            user.Id,
            user.FirstName,
            user.LastName,
            user.UniqueIdentifier);
    }

    public static InventoryItemDto ToDto(this InventoryItem item)
    {
        var assignedUser = item.AssignedUser;

        return new InventoryItemDto(
            item.Id,
            item.Type.ToString(),
            item.UniqueIdentifier,
            item.Comment,
            item.PurchaseDate,
            item.IsActive,
            item.AssignedUserId,
            assignedUser is null ? "Unassigned" : $"{assignedUser.FirstName} {assignedUser.LastName}",
            assignedUser?.UniqueIdentifier ?? string.Empty);
    }
}
