using InventoryExport.Api.Dtos;

namespace InventoryExport.Api.Pdf;

public interface IInventoryPdfTemplate
{
    PdfTemplateType TemplateType { get; }

    byte[] Generate(InventoryExportDocument document);
}
