using InventoryExport.Api.Dtos;
using InventoryExport.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryExport.Api.Controllers;

[ApiController]
[Route("api/export")]
public sealed class ExportController(IExportService exportService) : ControllerBase
{
    [HttpGet("pdf")]
    public async Task<IActionResult> ExportPdf(
        [FromQuery] ExportPdfRequest request,
        CancellationToken cancellationToken)
    {
        var pdfBytes = await exportService.GeneratePdfAsync(request, cancellationToken);
        var fileName = $"inventory-export-{request.Template.ToString().ToLowerInvariant()}.pdf";

        return File(pdfBytes, "application/pdf", fileName);
    }
}
