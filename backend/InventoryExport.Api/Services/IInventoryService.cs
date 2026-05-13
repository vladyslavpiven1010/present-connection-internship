using InventoryExport.Api.Dtos;

namespace InventoryExport.Api.Services;

public interface IInventoryService
{
    Task<IReadOnlyList<InventoryItemDto>> GetItemsAsync(
        InventoryItemFilterDto filter,
        bool includeInactive,
        CancellationToken cancellationToken);

    Task<bool> SoftDeleteAsync(Guid id, CancellationToken cancellationToken);
}
