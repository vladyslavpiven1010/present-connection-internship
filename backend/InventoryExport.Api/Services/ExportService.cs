using InventoryExport.Api.Data;
using InventoryExport.Api.Dtos;
using InventoryExport.Api.Mapping;
using InventoryExport.Api.Pdf;
using Microsoft.EntityFrameworkCore;

namespace InventoryExport.Api.Services;

public sealed class ExportService(
    AppDbContext dbContext,
    IEnumerable<IInventoryPdfTemplate> templates) : IExportService
{
    public async Task<byte[]> GeneratePdfAsync(ExportPdfRequest request, CancellationToken cancellationToken)
    {
        var items = await InventoryService
            .ApplyFilter(dbContext.InventoryItems.AsNoTracking(), request.ToFilter(), includeInactive: false)
            .OrderBy(item => item.AssignedUser!.LastName)
            .ThenBy(item => item.AssignedUser!.FirstName)
            .ThenBy(item => item.Type)
            .Select(item => item.ToDto())
            .ToListAsync(cancellationToken);

        var document = new InventoryExportDocument(
            Items: items,
            GeneratedAt: DateTimeOffset.UtcNow,
            AppliedFilter: request.ToFilter());

        var template = templates.FirstOrDefault(template => template.TemplateType == request.Template)
            ?? throw new InvalidOperationException($"PDF template '{request.Template}' is not registered.");

        return template.Generate(document);
    }
}
