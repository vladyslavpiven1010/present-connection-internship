using System.ComponentModel.DataAnnotations;
using InventoryExport.Api.Common;
using InventoryExport.Api.Entities;

namespace InventoryExport.Api.Dtos;

public sealed class InventoryItemFilterDto : PaginationQueryDto, IValidatableObject
{
    public InventoryItemType? Type { get; init; }

    [StringLength(AppConstants.Validation.MaxCommentLength)]
    public string? Comment { get; init; }

    public Guid? UserId { get; init; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Type is not null && !Enum.IsDefined(Type.Value))
        {
            yield return new ValidationResult(
                "Unknown inventory item type.",
                [nameof(Type)]);
        }
    }
}
