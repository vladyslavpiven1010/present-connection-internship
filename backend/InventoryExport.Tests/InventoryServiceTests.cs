using FluentAssertions;
using FluentAssertions.Execution;
using InventoryExport.Api.Data;
using InventoryExport.Api.Dtos;
using InventoryExport.Api.Entities;
using InventoryExport.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace InventoryExport.Tests;

public sealed class InventoryServiceTests
{
    private const int ExpectedMatchingLaptopCount = 1;
    private const int ExpectedSeededInventoryItemsCount = 5;
    private const int ExpectedTotalPagesForPaginationTest = 3;
    private const int PaginationTestExpectedItemsCount = 2;
    private const int PaginationTestPage = 2;
    private const int PaginationTestPageSize = 2;

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

        using var scope = new AssertionScope();
        result.Items.Should().ContainSingle();
        result.Items[0].UniqueIdentifier.Should().Be("LTP-2024-001");
        result.TotalItems.Should().Be(ExpectedMatchingLaptopCount);
    }

    [Fact]
    public async Task GetItemsAsync_AppliesDatabasePagination()
    {
        await using var dbContext = CreateDbContext();
        DatabaseSeeder.Seed(dbContext);
        var service = new InventoryService(dbContext);

        var result = await service.GetItemsAsync(
            new InventoryItemFilterDto
            {
                Page = PaginationTestPage,
                PageSize = PaginationTestPageSize
            },
            includeInactive: true,
            CancellationToken.None);

        using var scope = new AssertionScope();
        result.Items.Should().HaveCount(PaginationTestExpectedItemsCount);
        result.Page.Should().Be(PaginationTestPage);
        result.PageSize.Should().Be(PaginationTestPageSize);
        result.TotalItems.Should().Be(ExpectedSeededInventoryItemsCount);
        result.TotalPages.Should().Be(ExpectedTotalPagesForPaginationTest);
    }

    [Fact]
    public async Task SoftDeleteAsync_MarksItemInactive()
    {
        await using var dbContext = CreateDbContext();
        DatabaseSeeder.Seed(dbContext);
        var service = new InventoryService(dbContext);
        var item = await dbContext.InventoryItems.FirstAsync(item => item.IsActive);

        var wasDeleted = await service.SoftDeleteAsync(item.Id, CancellationToken.None);

        using var scope = new AssertionScope();
        wasDeleted.Should().BeTrue();
        item.IsActive.Should().BeFalse();
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

        exportItems.Should().OnlyContain(item => item.IsActive);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}
