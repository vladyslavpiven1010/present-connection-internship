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
                page.Margin(PdfLayoutConstants.Compact.PageMargin);
                page.Size(PageSizes.A4);

                page.Header().Column(column =>
                {
                    column.Item().Text("Inventory Export")
                        .FontSize(PdfLayoutConstants.Compact.HeaderFontSize)
                        .SemiBold()
                        .FontColor(Colors.Blue.Darken3);

                    column.Item().Text($"Generated: {document.GeneratedAt:yyyy-MM-dd HH:mm} UTC")
                        .FontSize(PdfLayoutConstants.Common.BodyFontSize)
                        .FontColor(Colors.Grey.Darken1);
                });

                page.Content().PaddingTop(PdfLayoutConstants.Compact.ContentTopPadding).Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn(PdfLayoutConstants.Compact.TypeColumnWidth);
                        columns.RelativeColumn(PdfLayoutConstants.Compact.IdentifierColumnWidth);
                        columns.RelativeColumn(PdfLayoutConstants.Compact.CommentColumnWidth);
                        columns.RelativeColumn(PdfLayoutConstants.Compact.AssignedUserColumnWidth);
                        columns.RelativeColumn(PdfLayoutConstants.Compact.PurchaseDateColumnWidth);
                    });

                    table.Header(header =>
                    {
                        Header(header.Cell(), "Type");
                        Header(header.Cell(), "Identifier");
                        Header(header.Cell(), "Comment");
                        Header(header.Cell(), "Assigned user");
                        Header(header.Cell(), "Purchase date");
                    });

                    foreach (var item in document.Items)
                    {
                        Cell(table.Cell(), item.Type);
                        Cell(table.Cell(), item.UniqueIdentifier);
                        Cell(table.Cell(), item.Comment ?? "-");
                        Cell(table.Cell(), $"{item.AssignedUserName} ({item.AssignedUserIdentifier})");
                        Cell(table.Cell(), item.PurchaseDate.ToString("yyyy-MM-dd"));
                    }
                });

                page.Footer()
                    .AlignRight()
                    .Text(text =>
                    {
                        text.Span("Compact template - page ");
                        text.CurrentPageNumber();
                        text.Span(" / ");
                        text.TotalPages();
                    });
            });
        }).GeneratePdf();
    }

    private static void Header(IContainer container, string text)
    {
        container
            .Background(Colors.Blue.Darken2)
            .Padding(PdfLayoutConstants.Compact.HeaderPadding)
            .DefaultTextStyle(style => style.FontColor(Colors.White).SemiBold().FontSize(PdfLayoutConstants.Common.BodyFontSize))
            .Text(text);
    }

    private static void Cell(IContainer container, string text)
    {
        container
            .BorderBottom(PdfLayoutConstants.Common.ThinBorder)
            .BorderColor(Colors.Grey.Lighten2)
            .PaddingVertical(PdfLayoutConstants.Compact.CellVerticalPadding)
            .PaddingHorizontal(PdfLayoutConstants.Compact.CellHorizontalPadding)
            .DefaultTextStyle(style => style.FontSize(PdfLayoutConstants.Common.BodyFontSize))
            .Text(text);
    }
}
