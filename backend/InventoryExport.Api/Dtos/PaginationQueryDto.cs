using System.ComponentModel.DataAnnotations;
using InventoryExport.Api.Common;

namespace InventoryExport.Api.Dtos;

public class PaginationQueryDto
{
    [Range(1, int.MaxValue)]
    public int Page { get; init; } = 1;

    [Range(1, AppConstants.Pagination.MaxPageSize)]
    public int PageSize { get; init; } = AppConstants.Pagination.DefaultPageSize;

    public int Skip => (Page - 1) * PageSize;
}
