using InventoryExport.Api.Data;
using InventoryExport.Api.Dtos;
using InventoryExport.Api.Mapping;
using Microsoft.EntityFrameworkCore;

namespace InventoryExport.Api.Services;

public sealed class UsersService(AppDbContext dbContext) : IUsersService
{
    public async Task<PaginatedResponse<UserDto>> GetAllAsync(UsersQueryDto query, CancellationToken cancellationToken)
    {
        var usersQuery = dbContext.Users
            .AsNoTracking()
            .OrderBy(user => user.LastName)
            .ThenBy(user => user.FirstName);

        var totalItems = await usersQuery.CountAsync(cancellationToken);
        var users = await usersQuery
            .Skip(query.Skip)
            .Take(query.PageSize)
            .Select(user => user.ToDto())
            .ToListAsync(cancellationToken);

        return new PaginatedResponse<UserDto>(
            users,
            query.Page,
            query.PageSize,
            totalItems);
    }
}
