namespace InventoryExport.Api.Common;

public static class AppConstants
{
    public const string DatabaseName = "InventoryExportDb";
    public const string FrontendCorsPolicyName = "Frontend";
    public const string FrontendOrigin = "http://localhost:5173";

    public static class Pagination
    {
        public const int DefaultPageSize = 10;
        public const int MaxPageSize = 100;
    }

    public static class Validation
    {
        public const int MaxCommentLength = 200;
    }
}
