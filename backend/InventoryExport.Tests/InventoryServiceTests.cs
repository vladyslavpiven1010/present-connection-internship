using InventoryExport.Api.Data;
using InventoryExport.Api.Dtos;
using InventoryExport.Api.Entities;
using InventoryExport.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace InventoryExport.Tests;

public sealed class InventoryServiceTests
{
    [Fact]
    public async Task GetItemsAsync_FiltersByTypeAndComment()
    {
        await using var dbContext = CreateDbContext();
        DatabaseSeeder.Seed(dbContext);
        var service = new InventoryService(dbContext);

        var result = await service.GetItemsAsync(
            new InventoryItemFilterDto
            {
                Type = InventoryItemType.Laptop,
                Comment = "development"
            },
            includeInactive: true,
            CancellationToken.None);

        Assert.Single(result);
        Assert.Equal("LTP-2024-001", result[0].UniqueIdentifier);
    }

    [Fact]
    public async Task SoftDeleteAsync_MarksItemInactive()
    {
        await using var dbContext = CreateDbContext();
        DatabaseSeeder.Seed(dbContext);
        var service = new InventoryService(dbContext);
        var item = await dbContext.InventoryItems.FirstAsync(item => item.IsActive);

        var wasDeleted = await service.SoftDeleteAsync(item.Id, CancellationToken.None);

        Assert.True(wasDeleted);
        Assert.False(item.IsActive);
    }

    [Fact]
    public void ApplyFilter_ExcludesInactiveItemsForExport()
    {
        using var dbContext = CreateDbContext();
        DatabaseSeeder.Seed(dbContext);

        var exportItems = InventoryService
            .ApplyFilter(
                dbContext.InventoryItems.AsQueryable(),
                new InventoryItemFilterDto(),
                includeInactive: false)
            .ToList();

        Assert.DoesNotContain(exportItems, item => !item.IsActive);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}
