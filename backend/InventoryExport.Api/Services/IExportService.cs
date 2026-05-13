using InventoryExport.Api.Dtos;

namespace InventoryExport.Api.Services;

public interface IExportService
{
    Task<byte[]> GeneratePdfAsync(ExportPdfRequest request, CancellationToken cancellationToken);
}
