using InventoryExport.Api.Dtos;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace InventoryExport.Api.Pdf;

public sealed class ClassicInventoryPdfTemplate : IInventoryPdfTemplate
{
    public PdfTemplateType TemplateType => PdfTemplateType.Classic;

    public byte[] Generate(InventoryExportDocument document)
    {
        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(PdfLayoutConstants.Classic.PageMargin);
                page.Size(PageSizes.A4);
                page.DefaultTextStyle(style => style.FontSize(PdfLayoutConstants.Common.BodyFontSize));

                page.Header().Row(row =>
                {
                    row.RelativeItem().Column(column =>
                    {
                        column.Item().Text("Assigned Inventory")
                            .FontSize(PdfLayoutConstants.Classic.TitleFontSize)
                            .Bold();
                        column.Item().Text("Classic grouped template")
                            .FontColor(Colors.Grey.Darken1);
                    });

                    row.ConstantItem(PdfLayoutConstants.Classic.CountColumnWidth)
                        .AlignRight()
                        .Text($"{document.Items.Count} items")
                        .FontSize(PdfLayoutConstants.Classic.CountFontSize)
                        .Bold()
                        .FontColor(Colors.Green.Darken2);
                });

                page.Content().PaddingTop(PdfLayoutConstants.Classic.ContentTopPadding).Column(column =>
                {
                    var groups = document.Items.GroupBy(item => item.AssignedUserName);

                    foreach (var group in groups)
                    {
                        column.Item()
                            .Background(Colors.Green.Lighten4)
                            .Padding(PdfLayoutConstants.Classic.GroupHeaderPadding)
                            .Text(group.Key)
                            .SemiBold()
                            .FontColor(Colors.Green.Darken3);

                        foreach (var item in group)
                        {
                            column.Item()
                                .BorderBottom(PdfLayoutConstants.Common.ThinBorder)
                                .BorderColor(Colors.Grey.Lighten2)
                                .PaddingVertical(PdfLayoutConstants.Classic.ItemVerticalPadding)
                                .Row(row =>
                                {
                                    row.RelativeItem(PdfLayoutConstants.Classic.TypeColumnWidth).Text(item.Type).SemiBold();
                                    row.RelativeItem(PdfLayoutConstants.Classic.IdentifierColumnWidth).Text(item.UniqueIdentifier);
                                    row.RelativeItem(PdfLayoutConstants.Classic.CommentColumnWidth).Text(item.Comment ?? "-");
                                    row.RelativeItem(PdfLayoutConstants.Classic.PurchaseDateColumnWidth).AlignRight().Text(item.PurchaseDate.ToString("yyyy-MM-dd"));
                                });
                        }

                        column.Item().PaddingBottom(PdfLayoutConstants.Classic.GroupBottomPadding);
                    }
                });

                page.Footer()
                    .AlignCenter()
                    .Text($"Classic template - generated {document.GeneratedAt:yyyy-MM-dd}");
            });
        }).GeneratePdf();
    }
}
