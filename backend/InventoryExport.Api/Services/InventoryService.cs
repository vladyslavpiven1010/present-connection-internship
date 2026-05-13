using InventoryExport.Api.Data;
using InventoryExport.Api.Dtos;
using InventoryExport.Api.Entities;
using InventoryExport.Api.Mapping;
using Microsoft.EntityFrameworkCore;

namespace InventoryExport.Api.Services;

public sealed class InventoryService(AppDbContext dbContext) : IInventoryService
{
    public async Task<IReadOnlyList<InventoryItemDto>> GetItemsAsync(
        InventoryItemFilterDto filter,
        bool includeInactive,
        CancellationToken cancellationToken)
    {
        return await ApplyFilter(dbContext.InventoryItems.AsNoTracking(), filter, includeInactive)
            .OrderBy(item => item.Type)
            .ThenBy(item => item.UniqueIdentifier)
            .Select(item => item.ToDto())
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> SoftDeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var item = await dbContext.InventoryItems.FindAsync([id], cancellationToken);

        if (item is null)
        {
            return false;
        }

        item.IsActive = false;
        await dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    public static IQueryable<InventoryItem> ApplyFilter(
        IQueryable<InventoryItem> query,
        InventoryItemFilterDto filter,
        bool includeInactive)
    {
        query = query.Include(item => item.AssignedUser);

        if (!includeInactive)
        {
            query = query.Where(item => item.IsActive);
        }

        if (filter.Type is not null)
        {
            query = query.Where(item => item.Type == filter.Type);
        }

        if (!string.IsNullOrWhiteSpace(filter.Comment))
        {
            var normalizedComment = filter.Comment.Trim().ToLower();
            query = query.Where(item =>
                item.Comment != null &&
                item.Comment.ToLower().Contains(normalizedComment));
        }

        if (filter.UserId is not null)
        {
            query = query.Where(item => item.AssignedUserId == filter.UserId);
        }

        return query;
    }
}
