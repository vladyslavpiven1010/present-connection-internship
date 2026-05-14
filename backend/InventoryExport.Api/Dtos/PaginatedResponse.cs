using InventoryExport.Api.Common;

namespace InventoryExport.Api.Dtos;

public sealed record PaginatedResponse<T>(
    IReadOnlyList<T> Items,
    int Page,
    int PageSize,
    int TotalItems)
{
    public int TotalPages => Math.Max(
        1,
        (int)Math.Ceiling((double)TotalItems / PageSize));
}
