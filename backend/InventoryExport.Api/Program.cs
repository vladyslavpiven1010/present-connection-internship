using InventoryExport.Api.Data;
using InventoryExport.Api.Pdf;
using InventoryExport.Api.Services;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Infrastructure;

QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("InventoryExportDb"));

builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IInventoryService, InventoryService>();
builder.Services.AddScoped<IExportService, ExportService>();
builder.Services.AddScoped<IInventoryPdfTemplate, ClassicInventoryPdfTemplate>();
builder.Services.AddScoped<IInventoryPdfTemplate, CompactInventoryPdfTemplate>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DatabaseSeeder.Seed(dbContext);
}

app.Run();

public partial class Program
{
}
