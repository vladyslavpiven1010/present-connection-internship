using InventoryExport.Api.Dtos;

namespace InventoryExport.Api.Services;

public interface IUsersService
{
    Task<IReadOnlyList<UserDto>> GetAllAsync(CancellationToken cancellationToken);
}
