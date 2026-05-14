using InventoryExport.Api.Entities;

namespace InventoryExport.Api.Data;

public static class DatabaseSeeder
{
    public static void Seed(AppDbContext dbContext)
    {
        if (dbContext.Users.Any())
        {
            return;
        }

        var users = new[]
        {
            new AppUser
            {
                Id = Guid.Parse("7f216950-7b4d-49f5-871c-a4c6b2f02101"),
                FirstName = "Anna",
                LastName = "Koval",
                UniqueIdentifier = "USR-001"
            },
            new AppUser
            {
                Id = Guid.Parse("7f216950-7b4d-49f5-871c-a4c6b2f02102"),
                FirstName = "Dmytro",
                LastName = "Shevchenko",
                UniqueIdentifier = "USR-002"
            },
            new AppUser
            {
                Id = Guid.Parse("7f216950-7b4d-49f5-871c-a4c6b2f02103"),
                FirstName = "Olena",
                LastName = "Bondar",
                UniqueIdentifier = "USR-003"
            }
        };

        var items = new[]
        {
            new InventoryItem
            {
                Type = InventoryItemType.Laptop,
                UniqueIdentifier = "LTP-2024-001",
                Comment = "Development machine",
                PurchaseDate = new DateOnly(2024, 2, 15),
                AssignedUserId = users[0].Id
            },
            new InventoryItem
            {
                Type = InventoryItemType.Phone,
                UniqueIdentifier = "PHN-2024-018",
                Comment = "Corporate phone",
                PurchaseDate = new DateOnly(2024, 5, 10),
                AssignedUserId = users[0].Id
            },
            new InventoryItem
            {
                Type = InventoryItemType.Tablet,
                UniqueIdentifier = "TBL-2023-044",
                Comment = "Demo device",
                PurchaseDate = new DateOnly(2023, 11, 3),
                AssignedUserId = users[1].Id
            },
            new InventoryItem
            {
                Type = InventoryItemType.SimCard,
                UniqueIdentifier = "SIM-2025-009",
                Comment = "Mobile internet",
                PurchaseDate = new DateOnly(2025, 1, 20),
                AssignedUserId = users[2].Id
            },
            new InventoryItem
            {
                Type = InventoryItemType.Laptop,
                UniqueIdentifier = "LTP-2022-031",
                Comment = "Inactive old laptop",
                PurchaseDate = new DateOnly(2022, 8, 12),
                IsActive = false,
                AssignedUserId = users[2].Id
            }
        };

        dbContext.Users.AddRange(users);
        dbContext.InventoryItems.AddRange(items);
        dbContext.SaveChanges();
    }
}
