using InventoryExport.Api.Dtos;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace InventoryExport.Api.Pdf;

public sealed class CompactInventoryPdfTemplate : IInventoryPdfTemplate
{
    public PdfTemplateType TemplateType => PdfTemplateType.Compact;

    public byte[] Generate(InventoryExportDocument document)
    {
        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(28);
                page.Size(PageSizes.A4);
                page.DefaultTextStyle(style => style.FontSize(9));

                page.Header().Row(row =>
                {
                    row.RelativeItem().Column(column =>
                    {
                        column.Item().Text("Assigned Inventory")
                            .FontSize(20)
                            .Bold();
                        column.Item().Text("Compact grouped template")
                            .FontColor(Colors.Grey.Darken1);
                    });

                    row.ConstantItem(90)
                        .AlignRight()
                        .Text($"{document.Items.Count} items")
                        .FontSize(16)
                        .Bold()
                        .FontColor(Colors.Green.Darken2);
                });

                page.Content().PaddingTop(18).Column(column =>
                {
                    var groups = document.Items.GroupBy(item => item.AssignedUserName);

                    foreach (var group in groups)
                    {
                        column.Item()
                            .Background(Colors.Green.Lighten4)
                            .Padding(8)
                            .Text(group.Key)
                            .SemiBold()
                            .FontColor(Colors.Green.Darken3);

                        foreach (var item in group)
                        {
                            column.Item()
                                .BorderBottom(1)
                                .BorderColor(Colors.Grey.Lighten2)
                                .PaddingVertical(7)
                                .Row(row =>
                                {
                                    row.RelativeItem(1).Text(item.Type).SemiBold();
                                    row.RelativeItem(1.4f).Text(item.UniqueIdentifier);
                                    row.RelativeItem(2).Text(item.Comment ?? "-");
                                    row.RelativeItem(1).AlignRight().Text(item.PurchaseDate.ToString("yyyy-MM-dd"));
                                });
                        }

                        column.Item().PaddingBottom(10);
                    }
                });

                page.Footer()
                    .AlignCenter()
                    .Text($"Compact template - generated {document.GeneratedAt:yyyy-MM-dd}");
            });
        }).GeneratePdf();
    }
}
