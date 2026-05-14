using InventoryExport.Api.Dtos;

namespace InventoryExport.Api.Services;

public interface IUsersService
{
    Task<PaginatedResponse<UserDto>> GetAllAsync(UsersQueryDto query, CancellationToken cancellationToken);
}
