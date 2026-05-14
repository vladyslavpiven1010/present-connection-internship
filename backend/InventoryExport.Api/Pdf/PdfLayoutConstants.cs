namespace InventoryExport.Api.Pdf;

public static class PdfLayoutConstants
{
    public static class Common
    {
        public const int BodyFontSize = 9;
        public const int ThinBorder = 1;
    }

    public static class Classic
    {
        public const int ContentTopPadding = 18;
        public const int CountColumnWidth = 90;
        public const int CountFontSize = 16;
        public const int GroupBottomPadding = 10;
        public const int GroupHeaderPadding = 8;
        public const int ItemVerticalPadding = 7;
        public const int PageMargin = 28;
        public const int TitleFontSize = 20;

        public const float TypeColumnWidth = 1f;
        public const float IdentifierColumnWidth = 1.4f;
        public const float CommentColumnWidth = 2f;
        public const float PurchaseDateColumnWidth = 1f;
    }

    public static class Compact
    {
        public const int CellHorizontalPadding = 4;
        public const int CellVerticalPadding = 6;
        public const int ContentTopPadding = 20;
        public const int HeaderFontSize = 24;
        public const int HeaderPadding = 6;
        public const int PageMargin = 36;

        public const float TypeColumnWidth = 1.1f;
        public const float IdentifierColumnWidth = 1.4f;
        public const float CommentColumnWidth = 1.8f;
        public const float AssignedUserColumnWidth = 1.7f;
        public const float PurchaseDateColumnWidth = 1.2f;
    }
}
