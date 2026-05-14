using InventoryExport.Api.Dtos;

namespace InventoryExport.Api.Pdf;

public sealed record InventoryExportDocument(
    IReadOnlyList<InventoryItemDto> Items,
    DateTimeOffset GeneratedAt,
    InventoryItemFilterDto AppliedFilter);
