using System.ComponentModel.DataAnnotations;
using InventoryExport.Api.Common;
using InventoryExport.Api.Entities;

namespace InventoryExport.Api.Dtos;

public sealed class ExportPdfRequest : IValidatableObject
{
    [Required]
    public PdfTemplateType Template { get; init; } = PdfTemplateType.Classic;

    public InventoryItemType? Type { get; init; }

    [StringLength(AppConstants.Validation.MaxCommentLength)]
    public string? Comment { get; init; }

    public Guid? UserId { get; init; }

    public InventoryItemFilterDto ToFilter() => new()
    {
        Type = Type,
        Comment = Comment,
        UserId = UserId
    };

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (!Enum.IsDefined(Template))
        {
            yield return new ValidationResult(
                "Unknown PDF template.",
                [nameof(Template)]);
        }

        if (Type is not null && !Enum.IsDefined(Type.Value))
        {
            yield return new ValidationResult(
                "Unknown inventory item type.",
                [nameof(Type)]);
        }
    }
}
