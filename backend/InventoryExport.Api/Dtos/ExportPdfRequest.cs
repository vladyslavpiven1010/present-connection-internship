using InventoryExport.Api.Entities;

namespace InventoryExport.Api.Dtos;

public sealed class ExportPdfRequest
{
    public PdfTemplateType Template { get; init; } = PdfTemplateType.Classic;

    public InventoryItemType? Type { get; init; }

    public string? Comment { get; init; }

    public Guid? UserId { get; init; }

    public InventoryItemFilterDto ToFilter() => new()
    {
        Type = Type,
        Comment = Comment,
        UserId = UserId
    };
}
