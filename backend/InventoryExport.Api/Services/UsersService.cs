using InventoryExport.Api.Data;
using InventoryExport.Api.Dtos;
using InventoryExport.Api.Mapping;
using Microsoft.EntityFrameworkCore;

namespace InventoryExport.Api.Services;

public sealed class UsersService(AppDbContext dbContext) : IUsersService
{
    public async Task<IReadOnlyList<UserDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await dbContext.Users
            .AsNoTracking()
            .OrderBy(user => user.LastName)
            .ThenBy(user => user.FirstName)
            .Select(user => user.ToDto())
            .ToListAsync(cancellationToken);
    }
}
