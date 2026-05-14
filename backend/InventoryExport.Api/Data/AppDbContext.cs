using InventoryExport.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace InventoryExport.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users => Set<AppUser>();

    public DbSet<InventoryItem> InventoryItems => Set<InventoryItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>()
            .HasIndex(user => user.UniqueIdentifier)
            .IsUnique();

        modelBuilder.Entity<InventoryItem>()
            .HasIndex(item => item.UniqueIdentifier)
            .IsUnique();

        modelBuilder.Entity<InventoryItem>()
            .HasOne(item => item.AssignedUser)
            .WithMany(user => user.InventoryItems)
            .HasForeignKey(item => item.AssignedUserId);
    }
}
