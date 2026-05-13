using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace InventoryExport.Api.Pdf;

public sealed class ClassicInventoryPdfTemplate
{
    public byte[] Generate(InventoryExportDocument document)
    {
        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(36);
                page.Size(PageSizes.A4);

                page.Header().Column(column =>
                {
                    column.Item().Text("Inventory Export")
                        .FontSize(24)
                        .SemiBold()
                        .FontColor(Colors.Blue.Darken3);

                    column.Item().Text($"Generated: {document.GeneratedAt:yyyy-MM-dd HH:mm} UTC")
                        .FontSize(9)
                        .FontColor(Colors.Grey.Darken1);
                });

                page.Content().PaddingTop(20).Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn(1.1f);
                        columns.RelativeColumn(1.4f);
                        columns.RelativeColumn(1.8f);
                        columns.RelativeColumn(1.7f);
                        columns.RelativeColumn(1.2f);
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
                        text.Span("Classic template - page ");
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
            .Padding(6)
            .DefaultTextStyle(style => style.FontColor(Colors.White).SemiBold().FontSize(9))
            .Text(text);
    }

    private static void Cell(IContainer container, string text)
    {
        container
            .BorderBottom(1)
            .BorderColor(Colors.Grey.Lighten2)
            .PaddingVertical(6)
            .PaddingHorizontal(4)
            .DefaultTextStyle(style => style.FontSize(9))
            .Text(text);
    }
}
